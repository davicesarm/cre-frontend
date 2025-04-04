"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center py-4 mt-8 w-full gap-4 text-center">
      <Image
        onClick={() => {
          window.location.href = "/";
        }}
        className="hover:cursor-pointer"
        src="/ifpb-logo.svg"
        width={40}
        height={40}
        alt="ifpb logo"
      />
      <div>
        <h1 className="text-4xl font-bold">Calcule seu CRE</h1>
        <p className="text-neutral-400">Coeficiente de renda escolar</p>
      </div>
    </header>
  );
}
