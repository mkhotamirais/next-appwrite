"use client";

import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (user) {
    redirect("/");
  }

  return <>{children}</>;
}
