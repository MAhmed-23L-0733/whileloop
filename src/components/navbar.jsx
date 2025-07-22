"use client";
import SafeImage from "./SafeImage";
import Checkbox from "./ui/checkbox";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { App } from "./provider";
import Logo from "@/assets/WhileLoop.png";

const Navbar = () => {
  const [check, setCheck] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { setCurrPage } = useContext(App);
  const { data: session } = useSession();
  return (
    <>
      <div className="fixed top-0 h-20 w-[100vw] flex items-center justify-between py-10 px-5 lg:px-10 bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg z-50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:transform before:skew-x-12 before:animate-pulse">
        <Link href={"/"}>
          <div className="flex items-center justify-center relative z-10">
            <SafeImage
              src={Logo}
              width={70}
              height={70}
              priority
              alt="Logo"
              className="object-contain"
            />
            <p className="text-white lg:text-xl font-semibold font-mono drop-shadow-lg">
              WhileLoop
            </p>
          </div>
        </Link>
        {!session && (
          <div className="hidden lg:flex justify-center items-center space-x-5 relative z-10">
            <Link href="/signin">
              <button className="text-white bg-gradient-to-r from-blue-600/80 to-blue-800/80 backdrop-blur-sm px-4 py-2 rounded-xl font-semibold cursor-pointer hover:from-white/90 hover:to-white/90 hover:text-blue-800 transition-all duration-300 ease-linear shadow-lg hover:shadow-xl border border-white/20 hover:border-blue-300">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="text-white bg-gradient-to-r from-blue-600/80 to-blue-800/80 backdrop-blur-sm px-4 py-2 rounded-xl font-semibold cursor-pointer hover:from-white/90 hover:to-white/90 hover:text-blue-800 transition-all duration-300 ease-linear shadow-lg hover:shadow-xl border border-white/20 hover:border-blue-300">
                Signup
              </button>
            </Link>
          </div>
        )}
        {session && (
          <div className="hidden lg:flex justify-center items-center space-x-2 relative z-10">
            <button
              className="text-white bg-gradient-to-r from-red-600/80 to-red-800/80 backdrop-blur-sm px-4 py-2 rounded-xl font-semibold cursor-pointer hover:from-white/90 hover:to-white/90 hover:text-red-800 transition-all duration-300 ease-linear shadow-lg hover:shadow-xl border border-white/20 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSigningOut}
              onClick={async () => {
                setIsSigningOut(true);
                try {
                  await signOut({
                    redirect: true,
                    callbackUrl: "/signin",
                  });
                } catch (error) {
                  console.error("Signout error:", error);
                  window.location.href = "/signin";
                } finally {
                  setIsSigningOut(false);
                }
              }}
            >
              {isSigningOut ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing out...
                </div>
              ) : (
                "Signout"
              )}
            </button>
          </div>
        )}
        <div className="lg:hidden mr-2">
          <Checkbox check={check} setCheck={setCheck}></Checkbox>
        </div>
      </div>
      <div
        className={`fixed ${
          check ? "translate-x-2" : "translate-x-full"
        } top-20 right-0 h-[calc(100vh-5rem)] w-96 transition-transform duration-500 ease-out lg:hidden bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl border-l border-white/20 shadow-2xl z-40 overflow-y-auto`}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>

        <div className="relative z-10 space-y-4 p-2 flex flex-col justify-center items-center">
          {/* User session content */}
          {session && (
            <>
              {/* User info section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20 w-[90vw]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {session.user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {session.user.email}
                    </p>
                    <p className="text-gray-300 text-xs">Welcome back!</p>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="space-y-5 flex flex-col place-self-center">
                <Link href="/" onClick={() => setCheck(false)}>
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/30 transition-all duration-300 group w-[90vw]">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <span className="text-white font-medium group-hover:text-blue-300 transition-colors duration-300">
                      Home
                    </span>
                  </div>
                </Link>

                <Link
                  href="/upload"
                  onClick={() => {
                    setCurrPage("addvideo");
                    setCheck(false);
                  }}
                >
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/30 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                      <svg
                        className="w-5 h-5 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                    <span className="text-white font-medium group-hover:text-purple-300 transition-colors duration-300">
                      Add Video
                    </span>
                  </div>
                </Link>

                <Link href="/profile" onClick={() => setCheck(false)}>
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-400/30 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all duration-300">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-white font-medium group-hover:text-green-300 transition-colors duration-300">
                      Profile
                    </span>
                  </div>
                </Link>

                <Link href="/about" onClick={() => setCheck(false)}>
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-lg flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-cyan-600/30 transition-all duration-300">
                      <svg
                        className="w-5 h-5 text-cyan-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300">
                      About
                    </span>
                  </div>
                </Link>
              </div>

              {/* Divider */}
              <div className=" bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

              {/* Sign out button */}
              <button
                disabled={isSigningOut}
                onClick={async () => {
                  setIsSigningOut(true);
                  try {
                    await signOut({
                      redirect: true,
                      callbackUrl: "/signin",
                    });
                  } catch (error) {
                    console.error("Signout error:", error);
                    window.location.href = "/signin";
                  } finally {
                    setIsSigningOut(false);
                    setCheck(false);
                  }
                }}
                className="w-[90vw] flex items-center space-x-3 p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-400/40 transition-all duration-300 group disabled:opacity-50"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg flex items-center justify-center group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all duration-300">
                  {isSigningOut ? (
                    <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg
                      className="w-5 h-5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-white font-medium group-hover:text-red-300 transition-colors duration-300">
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </span>
              </button>
            </>
          )}

          {/* Guest content */}
          {!session && (
            <>
              <div className="text-center mb-6">
                <h3 className="text-white text-lg font-semibold mb-2">
                  Welcome to WhileLoop
                </h3>
                <p className="text-gray-300 text-sm">
                  Sign in to access all features
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-y-5">
                <Link href="/signin" onClick={() => setCheck(false)}>
                  <div className="flex items-center justify-between w-80 space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-blue-800/20 hover:from-blue-600/30 hover:to-blue-800/30 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">
                      Login
                    </span>
                  </div>
                </Link>

                <Link href="/register" onClick={() => setCheck(false)}>
                  <div className="flex items-center justify-between w-80 space-x-3 p-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-purple-800/20 hover:from-purple-600/30 hover:to-purple-800/30 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group">
                    <svg
                      className="w-5 h-5 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    <span className="text-white font-semibold group-hover:text-purple-300 transition-colors duration-300">
                      Sign Up
                    </span>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
