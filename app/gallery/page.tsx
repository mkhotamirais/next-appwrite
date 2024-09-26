"use client";

import { bucketId, endpoint, storage, projectId } from "@/appwrite/config";
import { useEffect, useState } from "react";
import { Bucket } from "./types";
import Image from "next/image";

export default function GalleryPage() {
  const [data, setData] = useState<Bucket[]>([]);
  useEffect(() => {
    const getBucket = async () => {
      await storage.listFiles(bucketId).then((res) => {
        console.log(res.files);
        setData(res.files as Bucket[]);
      });
    };
    getBucket();
  }, []);
  return (
    <div>
      {data.map((item, i) => (
        <div key={i}>
          <Image
            src={`${endpoint}/storage/buckets/${bucketId}/files/${item.$id}/view?project=${projectId}`}
            // src={`https://cloud.appwrite.io/v1/storage/buckets/66f58eb1002ac57b54e2/files/66f58f30003bd2361e26`}
            alt={item.name}
            width={200}
            height={200}
          />
        </div>
      ))}
    </div>
  );
}
