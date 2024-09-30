"use client";

import { FaEnvelope } from "react-icons/fa6";
import { SiGithub, SiLinkedin } from "react-icons/si";
const socialsMenu = [
  { href: "https://github.com/mkhotamirais", icon: SiGithub },
  { href: "https://www.linkedin.com/in/mkhotami-rais", icon: SiLinkedin },
  { href: "mailto:tami01.job@gmail.com", icon: FaEnvelope },
];
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          <small className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="https://tamionweb.my.id" className="text-primary hover:underline">
              Tamionweb
            </Link>
          </small>
          <div className="flex gap-4 sm:gap-5 items-center justify-center">
            {socialsMenu.map((item, i) => (
              <a key={i} title={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
                <item.icon className="size-5 text-primary" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
