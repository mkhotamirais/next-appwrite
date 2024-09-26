"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { collProductsId, databases, dbShopId } from "@/appwrite/config";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ID } from "appwrite";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type CreateProductType = z.infer<typeof CreateProductSchema>;

export default function CreateProductForm() {
  const { user } = useAuth();
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<CreateProductType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (values: CreateProductType) => {
    const data = { ...values, email: user?.email };
    setPending(true);
    await databases
      .createDocument(dbShopId, collProductsId, ID.unique(), data)
      .then((res) => {
        toast.success(`Create ${res?.name} success!`);
        router.push("/product");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Create product failed!`);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending} type="submit">
            {pending && <Loader2 className="size-4 mr-2 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
