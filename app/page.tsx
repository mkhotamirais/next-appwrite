"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

export default function HomePage() {
  const { user } = useAuth();
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col gap-6 items-center justify-center">
      <div className="text-3xl">Welcome {user?.email}</div>
      <Button asChild size="lg">
        <Link href="/product">View Products</Link>
      </Button>
    </div>
  );
}
