import React from "react";
import Image from "next/image";
import Logo from "./logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-teal-50 flex flex-row">
      <div className="flex-auto">
        <Link href="/">
          <Image src={Logo} width={70} placeholder="blur" quality={100} alt = "Mama shop logo" />
        </Link>
      </div>
      <div className="flex-auto flex flex-row justify-end items-center text-center">
        <div className="mx-2 px-2 hover:bg-teal-100">
          <Link href="/Products">Products</Link>
        </div>
        <div className="mx-2 px-2 hover:bg-teal-100">
          <div>
            <Link href="/Cart">Cart</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
