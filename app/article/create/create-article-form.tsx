"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collArticlesId, databases, dbShopId } from "@/appwrite/config";
import { ID } from "appwrite";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type CreateArticleType = z.infer<typeof CreateArticleSchema>;

export default function CreateArticleForm() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<CreateArticleType>({
    resolver: zodResolver(CreateArticleSchema),
    defaultValues: { title: "", content: "" },
  });

  const onSubmit = async (values: CreateArticleType) => {
    setPending(true);
    await databases
      .createDocument(dbShopId, collArticlesId, ID.unique(), values)
      .then(() => {
        toast.success("Article created successfully");
        router.push("/article");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message || "Create article failed");
      })
      .finally(() => setPending(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input disabled={pending} placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input disabled={pending} placeholder="Content" {...field} />
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
  );
}
