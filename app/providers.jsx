"use client";

import React, { Dispatch, createContext, useReducer, useState } from "react";
import { AppContext } from "./context/App.context";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  const [cartItems, setCartItems] = useState([{ id: 2, quantity: 3 }]);
  const [user, setUser] = useState({});

  return (
      <AppContext.Provider
        value={{ cartItems, setCartItems, user, setUser }}
      >
        <SessionProvider>
        {children}
        </SessionProvider>
      </AppContext.Provider>
  );
}
