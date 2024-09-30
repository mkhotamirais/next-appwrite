"use client";

import HomeTools from "@/components/home-tools";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col gap-6 items-center justify-center">
      <h1 className="text-3xl font-semibold text-center">
        Welcome <br /> <span className="font-bold text-primary break-all">{user?.email}</span>
      </h1>
      <p className="text-center">
        This website utilizes <span className="font-bold text-primary">appwrite</span> features, including database and
        storage and hosted by Vercel hosting.
      </p>
      <Button asChild size="lg">
        <Link href="/product">View Product</Link>
      </Button>
      <HomeTools />
    </div>
  );
}
