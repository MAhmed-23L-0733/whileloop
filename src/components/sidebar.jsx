"use client";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { App } from "./provider";
import Link from "next/link";
const SideBar = () => {
  const { currPage, setCurrPage } = useContext(App);
  const session = useSession();
  return (
    <>
      {session.status === "authenticated" && (
        <div className="hidden lg:flex fixed top-20 left-0 h-[89vh] w-64 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-lg border-r-2 border-white/10 shadow-2xl flex-col justify-center items-start gap-y-2 px-6 z-2">
          {/* User Profile Section */}
          <div className="w-full mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {session.data?.user?.email?.split(".")[0][0].toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm truncate max-w-32">
                  {session.data?.user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-gray-400 text-xs">Content Creator</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="w-full space-y-2">
            <Link href={"/"} className="w-full">
              <button
                onClick={() => setCurrPage("home")}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  currPage === "home"
                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-400"
                    : "hover:bg-white/10 text-gray-300 hover:text-white"
                } cursor-pointer`}
              >
                <div
                  className={`w-6 h-6 ${
                    currPage === "home"
                      ? "text-blue-400"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="font-semibold">Home</span>
              </button>
            </Link>

            <Link href="/upload" className="w-full">
              <button
                onClick={() => setCurrPage("addvideo")}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  currPage === "addvideo"
                    ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 text-green-400"
                    : "hover:bg-white/10 text-gray-300 hover:text-white"
                } cursor-pointer`}
              >
                <div
                  className={`w-6 h-6 ${
                    currPage === "addvideo"
                      ? "text-green-400"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-semibold">Add Video</span>
              </button>
            </Link>

            <Link href={"/profile"}>
              <button
                onClick={() => setCurrPage("profile")}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  currPage === "profile"
                    ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-400"
                    : "hover:bg-white/10 text-gray-300 hover:text-white"
                } cursor-pointer`}
              >
                <div
                  className={`w-6 h-6 ${
                    currPage === "profile"
                      ? "text-purple-400"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-semibold">Profile</span>
              </button>
            </Link>

            <Link href={"/about"}>
              <button
                onClick={() => setCurrPage("about")}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  currPage === "about"
                    ? "bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 text-orange-400"
                    : "hover:bg-white/10 text-gray-300 hover:text-white"
                } cursor-pointer`}
              >
                <div
                  className={`w-6 h-6 ${
                    currPage === "about"
                      ? "text-orange-400"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-semibold">About</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
