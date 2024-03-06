"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Logo from "./logo.png";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AppContext } from "@/app/context/App.context"

export default function Navbar() {
  const context = useContext(AppContext) 
  const { data : session } = useSession()

  return (
    <nav className="w-full bg-teal-50 flex flex-row">
      <div className="flex-auto">
        <Link href="/">
          <Image
            src={Logo}
            width={70}
            placeholder="blur"
            quality={100}
            alt="Mama shop logo"
          />
        </Link>
      </div>
      <div className="flex-auto flex flex-row justify-end items-center text-center pr-5">
        <div className="mx-2 px-2 hover:bg-teal-100">
          <Link href="/Products">Products</Link>
        </div>
        <div className="mx-2 px-2 hover:bg-teal-100">
          <div className="flex flex-row gap-2 justify-center">
            <Link href="/Cart">Cart</Link>
            {context.cartItems.length > 0 && (
              <div className="bg-teal-700 text-white p-1 rounded">
                {context.cartItems.length}
              </div>
            )}
          </div>
        </div>
        <div>
          {session ? (
            <div>{`${session?.username}`}</div>
          ) : (
            <div>
              <Link href="/api/auth/signin">Sign in</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
