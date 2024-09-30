"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./header";
import Link from "next/link";
import { navMenu } from "@/lib/nav-menu";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();
  const path1 = pathname.split("/")[1];

  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SheetDescription className="hidden">This action cannot be undone</SheetDescription>
            <div className="flex flex-col py-4">
              {navMenu.map((item, i) => (
                <Link
                  href={item.href}
                  key={i}
                  className={`${
                    path1 === item.href.split("/")[1] ? "text-primary font-semibold" : ""
                  } hover:text-primary text-sm py-2`}
                >
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
