"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./header";
import { ModeToggle } from "../mode-toggle";
import { navMenu } from "./nav-menu";
import Link from "next/link";

export default function MobileNav() {
  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle className="flex justify-between">
              <Logo />
              <ModeToggle />
            </SheetTitle>
            <SheetDescription className="hidden">
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </SheetDescription>
            <div className="flex flex-col gap-2 py-4">
              {navMenu.map((item, i) => (
                <Link href={item.href} key={i} className="hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
