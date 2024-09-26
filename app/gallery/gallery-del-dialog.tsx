"use client";

import { bucketId, storage } from "@/appwrite/config";
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
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function GalleryDelDialog({ id }: { id: string }) {
  const [pending, setPending] = useState(false);

  const onDel = async () => {
    setPending(true);
    await storage
      .deleteFile(bucketId, id)
      .then(() => {
        toast.success(`Delete image success`);
        document.getElementById(`dialog-close-${id}`)?.click();
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
        <Button variant={"destructive"} size={"icon"}>
          <Trash className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
          <div className="flex gap-2">
            <Button disabled={pending} variant={"destructive"} onClick={onDel}>
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
