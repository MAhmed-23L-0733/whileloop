"use client";
import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "@imagekit/next";
import { createContext, useState } from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export const App = createContext({
  currPage: "home",
  setCurrPage: () => {},
});

export default function Provider({ children }) {
  const [currPage, setCurrPage] = useState("home");
  return (
    <App.Provider value={{ currPage, setCurrPage }}>
      <SessionProvider refetchInterval={5 * 60}>
        <ImageKitProvider urlEndpoint={urlEndpoint}>
          {children}
        </ImageKitProvider>
      </SessionProvider>
    </App.Provider>
  );
}
