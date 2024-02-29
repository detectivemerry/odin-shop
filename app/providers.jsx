"use client";

import React, { Dispatch, createContext, useReducer, useState } from "react";
import { AppContext } from "./context/App.context";


export function Providers({ children }) {
  const [cartItems, setCartItems] = useState([{id : 2, quantity: 3}])
  const [ loggedIn, setLoggedIn ] = useState(false)

  return (
    <AppContext.Provider value={{ cartItems, setCartItems, loggedIn, setLoggedIn}}>
      { children }
    </AppContext.Provider>
  );
}
