"use client";

import { bucketId, collGalleryId, databases, dbShopId, storage } from "@/appwrite/config";
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
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Gallery } from "./types";

export default function GalleryDelDialog({ item }: { item: Gallery }) {
  const [pending, setPending] = useState(false);

  const onDel = async () => {
    setPending(true);
    await storage
      .deleteFile(bucketId, item.imageId)
      .then(() => {
        databases.deleteDocument(dbShopId, collGalleryId, item.$id);
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
        <Button variant={"destructive"} size={"icon"}>
          <Trash className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>
            Delete <span className="text-primary italic">{item?.name}</span>, Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
          <div className="flex gap-2">
            <Button disabled={pending} variant={"destructive"} onClick={onDel}>
              {pending && <Loader2 className="size-4 mr-2 animate-spin" />}
              Delete
            </Button>
            <DialogClose asChild>
              <Button disabled={pending}>Cancel</Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
