"use client";

import Showcase from "@/app/(home)/sections/generic-input";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <>
      <div className="container max-w-5xl py-40 flex justify-between">
        <main className="w-full flex min-h-screen flex-col items-center justify-between scroll-smooth">
          <Showcase />
        </main>
        </div>
    </>
  );
}
