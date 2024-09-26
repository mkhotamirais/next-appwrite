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
import { Product } from "./types";
import { collProductsId, databases, dbShopId } from "@/appwrite/config";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDelDialog({ item }: { item: Product }) {
  const [pending, setPending] = useState(false);

  const onDelete = async () => {
    setPending(true);
    await databases
      .deleteDocument(dbShopId, collProductsId, item?.$id)
      .then(() => {
        toast.success(`Delete ${item.name} success`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Delete product failed`);
      })
      .finally(() => setPending(false));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"destructive"}>
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>
            Delete <span className="text-primary italic">{item.name}</span>, Are you sure?
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
