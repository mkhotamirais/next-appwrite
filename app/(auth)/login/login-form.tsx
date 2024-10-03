"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { account } from "@/appwrite/config";
import { useState } from "react";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginType = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });
  const onSubmit = async (values: LoginType) => {
    setPending(true);
    const { email, password } = values;
    await account
      .createEmailPasswordSession(email, password)
      .then(() => {
        toast.success("Login successful");
        router.push("/");
        router.refresh();
      })
      .catch((err) => {
        toast.error(err.message);
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
        <Button disabled={pending} type="submit" className="w-full">
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
}
