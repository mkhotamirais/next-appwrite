"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { account } from "@/appwrite/config";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 h-16 border-b">
      <div className="container px-4 mx-auto flex items-center justify-between h-full">
        <div>
          <Logo />
        </div>
        <nav className="flex items-center gap-4 text-sm">
          {/* <div className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/product">Product</Link>
          </div> */}
          {!user ? (
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          ) : (
            <Button variant={"secondary"} disabled={pending} onClick={onLogout}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Logout
            </Button>
          )}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}

export const Logo = () => {
  return (
    <Link href="/" className="text-lg font-semibold">
      NEXT<span className="text-primary">APPWRITE</span>
    </Link>
  );
};
