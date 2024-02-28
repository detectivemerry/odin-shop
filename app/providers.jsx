"use client";

import React, { Dispatch, createContext, useReducer, useState } from "react";
import { AppContext } from "./context/App.context";


export function Providers({ children }) {
  const [cartItems, setCartItems] = useState([{id : 2, quantity: 3}])

  return (
    <AppContext.Provider value={{ cartItems, setCartItems }}>
      { children }
    </AppContext.Provider>
  );
}
