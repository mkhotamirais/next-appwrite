"use client";

import React from "react";
import { SiNextdotjs, SiAppwrite, SiTypescript, SiTailwindcss, SiShadcnui, SiFramer } from "react-icons/si";

const iconsLogo = [
  { title: "Next.js", icon: SiNextdotjs },
  { title: "Appwrite", icon: SiAppwrite },
  { title: "Typescript", icon: SiTypescript },
  { title: "Shadcn UI", icon: SiShadcnui },
  { title: "Tailwindcss", icon: SiTailwindcss },
  { title: "Framer", icon: SiFramer },
];

export default function HomeTools() {
  return (
    <div className="flex gap-8 flex-wrap justify-center pt-8">
      {iconsLogo.map((item, i) => (
        <div title={item.title} key={i} className={item.title === "Appwrite" ? "text-primary" : ""}>
          {React.createElement(item.icon, { size: 32 })}
        </div>
      ))}
    </div>
  );
}
