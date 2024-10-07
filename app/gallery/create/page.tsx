"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { bucketId, collGalleryId, databases, dbShopId, storage } from "@/appwrite/config";
import { ID } from "appwrite";

const GallerySchema = z.object({
  name: z.string().min(1, "Title is required"),
  image: z.instanceof(File, { message: "File is required" }).optional(),
  //   image: z.string().url("Invalid Url").optional(),
});

type GalleryType = z.infer<typeof GallerySchema>;

export default function CreateGalleryForm() {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<GalleryType>({
    resolver: zodResolver(GallerySchema),
    defaultValues: { name: "", image: undefined },
  });

  const onSubmit = async (values: GalleryType) => {
    const { name, image } = values;

    if (!image) {
      toast.error("Image is required");
      return;
    }

    setPending(true);

    await storage
      .createFile(bucketId, ID.unique(), image)
      .then((res) => {
        databases.createDocument(dbShopId, collGalleryId, ID.unique(), { name, imageId: res.$id }).then((res) => {
          toast.success("Image uploaded successfully");
          router.push("/gallery");
          router.refresh();
          form.reset({ name: "", image: undefined });
        });
      })
      .catch((err) => {
        console.log(err);
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
          name="name"
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  disabled={pending}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const fileUrl = URL.createObjectURL(file);
                      //   setPreview(URL.createObjectURL(file));
                      setPreview(fileUrl);
                      field.onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Avatar className="rounded-md w-32 h-32 relative">
          {preview && (
            <Button
              type="button"
              disabled={pending}
              size="icon"
              className="absolute m-2"
              onClick={() => {
                setPreview(undefined);
                form.setValue("image", undefined);
              }}
            >
              <Trash className="size-4" />
            </Button>
          )}
          <AvatarImage src={preview || ""} className="rounded-md object-contain bg-gray-200" />
          <AvatarFallback className="rounded-md">bu</AvatarFallback>
        </Avatar>
        <Button disabled={pending} type="submit">
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
