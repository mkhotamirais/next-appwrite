"use client";

import React from "react";
import { MoonLoader } from "react-spinners";

export default function LoaderMoon() {
  return (
    <div className="flex w-full justify-center py-4">
      <MoonLoader color="hsl(var(--primary))" size={40} />
    </div>
  );
}
