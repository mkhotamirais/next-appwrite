"use client";

import { client, collArticlesId, databases, dbShopId } from "@/appwrite/config";
import LoaderMoon from "@/components/loader-moon";
import { Button } from "@/components/ui/button";
import { Query } from "appwrite";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Article } from "./types";
import { Edit } from "lucide-react";
import ArticleDelDialog from "./article-del-dialog";

export default function ArticlePage() {
  const [data, setData] = useState<Article[]>([]);
  const [pendingPage, setPendingPage] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setPendingPage(true);
      await databases
        .listDocuments(dbShopId, collArticlesId, [Query.orderDesc("$createdAt")])
        .then((res) => {
          setData(res.documents as Article[]);
        })
        .catch((err) => console.log(err))
        .finally(() => setPendingPage(false));
    };
    getData();

    const unsubscribe = client.subscribe(`databases.${dbShopId}.collections.${collArticlesId}.documents`, (res) => {
      if (res.events.includes("databases.*.collections.*.documents.*.delete")) {
        console.log("a message was deleted");
        setData((prev) => prev.filter((item) => item.$id !== (res?.payload as Article).$id));
      }
      console.log("halo");
    });
    return () => unsubscribe();
  }, []);

  if (pendingPage) return <LoaderMoon />;

  return (
    <div className="my-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-semibold text-primary">Article List</h1>
        <Button asChild>
          <Link href="/article/create">Add New</Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {data.map((item, i) => (
          <div key={i} className="relative group border rounded-lg p-4">
            <h3 className="capitalize text-primary mb-2 font-semibold">{item.title}</h3>
            <p className="text-sm">{item.content}</p>
            <div className="absolute p-2 top-0 right-0 scale-0 group-hover:scale-100 transition flex gap-1">
              <Button asChild size={"icon"}>
                <Link href={`/article/update/${item.$id}`}>
                  <Edit className="size-4" />
                </Link>
              </Button>
              <ArticleDelDialog item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
