"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { account } from "@/appwrite/config";
import { useState } from "react";

export function Header() {
  const { user, setUser } = useAuth();
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    setPending(true);
    await account
      .deleteSession("current")
      .then(() => {
        setUser();
        toast.success("Logged out successfully");
        router.push("/login");
        router.refresh();
      })
      .catch(() => {
        toast.error("Logged out failed");
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <header className="h-16 border-b">
      <div className="container px-4 mx-auto flex items-center justify-between h-full">
        <Link href="/">Logo</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        {!user ? (
          <div className="flex gap-2">
            <Button asChild variant="link">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
            <ModeToggle />
          </div>
        ) : (
          <Button disabled={pending} onClick={onLogout}>
            {pending ? "loading.." : "Logout"}
          </Button>
        )}
      </div>
    </header>
  );
}
