"use client";

import { account } from "@/appwrite/config";
import { useAuth } from "@/hooks/use-auth";
import React, { useEffect, useState } from "react";

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    account
      .get()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  }, [setUser]);

  if (!isMounted) return null;

  return <>{children}</>;
}
