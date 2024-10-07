import { Button } from "@/components/ui/button";
import Link from "next/link";
import GalleryList from "./gallery-list";

export default function GalleryNamePage() {
  return (
    <div className="my-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-primary font-semibold text-lg mb-2">Gallery List</h1>
        <Button asChild>
          <Link href="/gallery/create">Add New</Link>
        </Button>
      </div>
      <GalleryList />
    </div>
  );
}
