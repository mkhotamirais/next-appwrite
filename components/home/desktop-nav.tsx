"use client";

import Link from "next/link";
import { navMenu } from "./nav-menu";

export default function DesktopNav() {
  return (
    <div className="hidden md:flex gap-4">
      {navMenu.map((item, i) => (
        <Link key={i} href={item.href}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
