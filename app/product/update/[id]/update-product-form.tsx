"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { collProductsId, databases, dbShopId } from "@/appwrite/config";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import LoaderMoon from "@/components/loader-moon";

const UpdateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type UpdateProductType = z.infer<typeof UpdateProductSchema>;

export default function UpdateProductForm() {
  const { user } = useAuth();
  const [pendingPage, setPendingPage] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const form = useForm<UpdateProductType>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    const fetchData = async () => {
      setPendingPage(true);
      await databases
        .getDocument(dbShopId, collProductsId, id as string)
        .then((res) => {
          form.reset({ name: res?.name });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setPendingPage(false));
    };
    if (user) {
      fetchData();
    }
  }, [user, form, id]);

  const onSubmit = async (values: UpdateProductType) => {
    // const data = { ...values, email: user?.email };
    setPending(true);
    await databases
      .updateDocument(dbShopId, collProductsId, id as string, values)
      .then((res) => {
        toast.success(`Update ${res?.name} success!`);
        router.push("/product");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Update product failed!`);
      })
      .finally(() => {
        setPending(false);
      });
  };

  if (pendingPage) return <LoaderMoon />;

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
