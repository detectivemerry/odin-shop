import React from "react";
import Image from "next/image";
import Logo from "./logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav class="w-full bg-teal-50 flex flex-row">
      <div class="flex-auto">
        <Link href="/">
          <Image src={Logo} width={70} placeholder="blur" quality={100} />
        </Link>
      </div>
      <div class="flex-auto flex flex-row justify-end items-center text-center">
        <div class="mx-2 px-2 hover:bg-teal-100">
          <Link href="/Products">Products</Link>
        </div>
        <div class="mx-2 px-2 hover:bg-teal-100 h-max">
          <Link href="/Cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
}
