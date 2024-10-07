"use client";

import { client, bucketId, collGalleryId, databases, dbShopId, endpoint, projectId } from "@/appwrite/config";
import LoaderMoon from "@/components/loader-moon";
import { useEffect, useState } from "react";
import { Gallery } from "./types";
import Image from "next/image";
import GalleryNameDelDialog from "./gallery-del-dialog";

export default function GalleryList() {
  const [data, setData] = useState<Gallery[]>([]);
  const [pendingData, setPendingData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setPendingData(true);
      await databases
        .listDocuments(dbShopId, collGalleryId)
        .then((res) => {
          setData(res.documents as Gallery[]);
        })
        .catch((err) => console.log(err))
        .finally(() => setPendingData(false));
    };
    getData();

    const unsubscribe = client.subscribe(`databases.${dbShopId}.collections.${collGalleryId}.documents`, (res) => {
      if (res.events.includes("databases.*.collections.*.documents.*.delete")) {
        console.log("a message was deleted");
        setData((prev) => prev.filter((item) => item.$id !== (res?.payload as Gallery).$id));
      }
    });
    return () => unsubscribe();
  }, []);

  if (pendingData) return <LoaderMoon />;

  if (data?.length === 0) return <div>No Data</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {data.map((item, i) => (
        <div key={i} className="group relative">
          <Image
            src={`${endpoint}/storage/buckets/${bucketId}/files/${item.imageId}/view?project=${projectId}`}
            alt={item.name || "image alt"}
            width={200}
            height={200}
            className="object-cover object-center h-40 w-full"
            priority
          />
          <h3 className="text-center text-primary capitalize font-semibold mt-2">{item.name}</h3>
          <div>
            <GalleryNameDelDialog item={item} />
          </div>
        </div>
      ))}
    </div>
  );
}
