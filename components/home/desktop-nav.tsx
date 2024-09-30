"use client";

import { navMenu } from "@/lib/nav-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNav() {
  const pathname = usePathname();
  const path1 = pathname.split("/")[1];
  return (
    <div className="hidden md:flex">
      {navMenu.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className={`hover:text-primary transition px-3 ${
            path1 === item.href.split("/")[1] ? "text-primary font-semibold" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
