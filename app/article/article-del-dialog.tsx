"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { collArticlesId, databases, dbShopId } from "@/appwrite/config";
import { useState } from "react";
import { toast } from "sonner";
import { Article } from "./types";

export default function ArticleDelDialog({ item }: { item: Article }) {
  const [pending, setPending] = useState(false);

  const onDelete = async () => {
    setPending(true);
    await databases
      .deleteDocument(dbShopId, collArticlesId, item?.$id)
      .then(() => {
        toast.success(`Delete ${item.title} success`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Delete product failed`);
      })
      .finally(() => {
        setPending(false);
        document.getElementById(`dialog-close-${item.$id}`)?.click();
      });
  };

  return (
    <Dialog key={item.$id}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"destructive"}>
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>
            Delete <span className="text-primary italic">{item.title}</span>, Are you sure?
          </DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
          <div className="flex gap-2">
            <Button disabled={pending} onClick={onDelete} variant={"destructive"}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
            <DialogClose asChild>
              <Button disabled={pending} variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
