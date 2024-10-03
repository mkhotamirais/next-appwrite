"use client";

import { account } from "@/appwrite/config";
import LoaderMoon from "@/components/loader-moon";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useAuth();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    // cara 1
    // const getUser = async () => {
    //   try {
    //     const user = await account.get();
    //     setUser(user);
    //   } catch (error) {
    //     console.error("Failed to fetch user", error);
    //     setUser(null);
    //   } finally {
    //     setPending(false);
    //   }
    // };
    // getUser()

    // cara2
    account
      .get()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      })
      .finally(() => {
        setPending(false);
      });
  }, [setUser]);

  if (pending) return <LoaderMoon />;

  if (user) {
    redirect("/");
  }

  return <>{children}</>;
}
