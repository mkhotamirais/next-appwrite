"use client";

import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const { user } = useAuth();
  return <div>HomePage {user?.email}</div>;
}
