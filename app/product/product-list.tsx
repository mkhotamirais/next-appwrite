"use client";

import { client, collProductsId, databases, dbShopId } from "@/appwrite/config";
import LoaderMoon from "@/components/loader-moon";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductDelDialog from "./product-del-dialog";
import { Product } from "./types";
import { Query } from "appwrite";

export default function ProductList() {
  const [pending, setPending] = useState(false);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      await databases
        .listDocuments(dbShopId, collProductsId, [Query.orderDesc("$createdAt"), Query.limit(5)])
        .then((res) => {
          setData(res?.documents as Product[]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setPending(false));
    };
    fetchData();

    const unsubscribe = client.subscribe(`databases.${dbShopId}.collections.${collProductsId}.documents`, (res) => {
      if (res.events.includes("databases.*.collections.*.documents.*.create")) {
        // console.log("a message was created");
        setData((prev) => [res.payload, ...prev] as Product[]);
      }
      if (res.events.includes("databases.*.collections.*.documents.*.delete")) {
        // console.log("a message was deleted");
        setData((prev) => prev.filter((item) => item.$id !== (res?.payload as Product).$id));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (pending) return <LoaderMoon />;

  return (
    <div className="grid grid-cols-6 gap-2">
      {data?.map((item) => (
        <div key={item.$id} className="border rounded p-2">
          <div>{item.name}</div>
          <div>
            <Button asChild size={"icon"}>
              <Link href={`/product/update/${item.$id}`}>
                <Edit className="size-4" />
              </Link>
            </Button>
            <ProductDelDialog item={item} />
          </div>
        </div>
      ))}
    </div>
  );
}
