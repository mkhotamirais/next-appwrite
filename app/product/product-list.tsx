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
        .listDocuments(dbShopId, collProductsId, [Query.orderDesc("$createdAt")])
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
      {data?.map((item) => (
        <div key={item.$id} className="relative group border rounded p-3">
          <h3 className="text-primary font-semibold text-xl capitalize">{item.name}</h3>
          <div className="absolute p-2 top-0 right-0 scale-0 group-hover:scale-100 transition flex gap-1">
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
