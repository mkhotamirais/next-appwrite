import React from "react";
import ProductList from "./product-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg text-primary">Product List</h1>
        <Button asChild>
          <Link href="/product/create">Add New</Link>
        </Button>
      </div>
      <div>
        <ProductList />
      </div>
    </div>
  );
}
