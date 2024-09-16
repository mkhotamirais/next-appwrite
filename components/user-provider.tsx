"use client";

import { useAuth } from "@/hooks/use-auth";
import React, { useEffect, useState } from "react";

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setUser();
  }, [setUser]);

  if (!isMounted) return null;
  return <>{children}</>;
}
