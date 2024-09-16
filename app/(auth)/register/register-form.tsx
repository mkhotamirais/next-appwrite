"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { account } from "@/appwrite/config";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    confPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "Passwords do not match",
    path: ["confPassword"],
  });

type RegisterType = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", confPassword: "" },
  });
  const onSubmit = async (values: RegisterType) => {
    setPending(true);
    const { email, password } = values;
    await account
      .create("unique()", email, password)
      .then(() => {
        toast.success("Account created successfully");
        router.push("/login");
      })
      .catch(() => {
        toast.error("Register failed");
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={pending} type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input disabled={pending} type="password" placeholder="********" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input disabled={pending} type="password" placeholder="********" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={pending} type="submit" className="w-full">
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
}
