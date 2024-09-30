"use client";

import Link from "next/link";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import AuthBtn from "./auth-btn";
import { ModeToggle } from "../theme/mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 h-16 border-b">
      <div className="container flex items-center justify-between h-full">
        <div className="flex gap-2 items-center">
          <MobileNav />
          <Logo />
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <DesktopNav />
          <AuthBtn />
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
