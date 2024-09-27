"use client";

import { bucketId, endpoint, storage, projectId, client } from "@/appwrite/config";
import { FormEvent, useEffect, useState } from "react";
import { Bucket } from "./types";
import Image from "next/image";
import { Query } from "appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import GalleryDelDialog from "./gallery-del-dialog";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import IsLoginAlert from "@/components/is-login-alert";
import LoaderMoon from "@/components/loader-moon";

export default function GalleryPage() {
  const { user } = useAuth();
  const [data, setData] = useState<Bucket[]>([]);
  const [preview, setPreview] = useState("");
  const [pending, setPending] = useState(false);
  const [pendingPage, setPendingPage] = useState(false);

  useEffect(() => {
    const getBucket = async () => {
      setPendingPage(true);
      await storage
        .listFiles(bucketId, [Query.orderDesc("$createdAt")])
        .then((res) => {
          setData(res.files as Bucket[]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPendingPage(false);
        });
    };
    getBucket();

    const unsubscribe = client.subscribe("files", (res) => {
      if (res.events.includes("buckets.*.files.*.create")) {
        setData((prev) => [res.payload, ...prev] as Bucket[]);
      }
      if (res.events.includes("buckets.*.files.*.delete")) {
        setData((prev) => prev.filter((item) => item.$id !== (res?.payload as Bucket).$id));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const image = formData.get("image") as File | null;

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    try {
      setPending(true);
      await storage.createFile(bucketId, "unique()", image);
      const updatedFiles = await storage.listFiles(bucketId, [Query.orderDesc("$createdAt")]);
      setData(updatedFiles.files as Bucket[]);
      setPreview("");
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Error uploading the file:", err);
    } finally {
      setPending(false);
    }
  };

  if (!user) {
    return <IsLoginAlert />;
  }

  if (pendingPage) {
    return <LoaderMoon />;
  }

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2">
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            name="image"
            id="image"
            type="file"
            className="w-full"
            onChange={(e) => {
              const img = e.target.files?.[0];
              if (img) {
                const imgUrl = URL.createObjectURL(img);
                setPreview(imgUrl);
              }
            }}
          />
          <Button disabled={pending || !preview} type="submit">
            {pending && <Loader2 className="animate-spin size-4 mr-2" />}
            {/* <Loader2 className="animate-spin size-4 mr-2" /> */}
            Upload
          </Button>
        </form>
      </div>

      {preview && (
        <div className="relative size-40 border p-1 rounded mb-2">
          <Image
            src={preview}
            alt="image preview"
            width={200}
            height={200}
            className="object-cover object-center size-full"
          />
          <div className="absolute top-0 right-0">
            <Button size="icon" className="m-2" onClick={() => setPreview("")}>
              <Trash className="size-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {data.map((item, i) => (
          <div key={i} className="relative border p-1 h-40">
            <Image
              src={`${endpoint}/storage/buckets/${bucketId}/files/${item.$id}/view?project=${projectId}`}
              alt={item.name}
              width={200}
              height={200}
              priority
              className="object-center object-cover size-full"
            />
            <div className="absolute top-0 right-0 z-10 m-2">
              <GalleryDelDialog id={item.$id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
