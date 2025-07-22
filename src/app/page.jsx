"use client";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import VideoCard from "@/components/ui/video-card";
import { App } from "@/components/provider";
import Logo from "@/assets/WhileLoop.png";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const session = useSession();
  const { setCurrPage } = useContext(App);

  useEffect(() => {
    async function GetVideos() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/video");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const videos = await response.json();
        setVideos(videos);
        setError(null);
      } catch (err) {
        setError("Videos are not available at the moment!");
        console.error("Error fetching videos:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (session.status === "authenticated") {
      GetVideos();
    }
  }, [session.status]);
  return (
    <>
      {session.status === "authenticated" ? (
        <div className="lg:pl-64 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
          {/* Header Section */}
          <div className="p-8 border-b border-white/10">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-gray-300 text-lg">
                Discover amazing videos from our community
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              {isLoading ? (
                <div className="flex items-center justify-center min-h-96">
                  <Loading text="Loading amazing videos..." />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center min-h-96 space-y-4">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{error}</h3>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              ) : videos.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-96 space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      No videos yet
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Be the first to share amazing content!
                    </p>
                    <Link href="/upload">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Upload Your First Video
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* Stats Bar */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2 mr-2 lg:mr-0">
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 lg:p-0 lg:px-4 lg:py-2 border border-white/10">
                        <span className="text-gray-400 text-sm">
                          Total Videos:{" "}
                        </span>
                        <span className="text-white font-semibold">
                          {videos.length}
                        </span>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 lg:p-0 lg:px-4 lg:py-2 border border-white/10">
                        <span className="text-gray-400 text-sm">
                          Recently Added:{" "}
                        </span>
                        <span className="text-white font-semibold">
                          {
                            videos.filter(
                              (v) =>
                                new Date(v.createdAt) >
                                new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                            ).length
                          }
                        </span>
                      </div>
                    </div>

                    <Link href="/upload">
                      <button
                        onClick={() => {
                          setCurrPage("addvideo");
                        }}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold lg:px-6 lg:py-2 p-2 lg:p-0 rounded-lg transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Add Video</span>
                      </button>
                    </Link>
                  </div>

                  {/* Videos Grid */}
                  <div className="grid lg:flex place-content-center flex-wrap justify-center items-center gap-10">
                    {videos.map((video) => (
                      <VideoCard key={video._id} video={video} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-8">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            {/* Hero Logo */}
            <div className="flex items-center justify-center space-x-4">
              <div className="relative">
                <SafeImage
                  src={Logo}
                  width={120}
                  height={120}
                  priority
                  alt="Logo"
                  className="drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              </div>
              <h1 className="font-mono text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WhileLoop
              </h1>
            </div>

            {/* Hero Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                The Ultimate Video Platform for{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Developers
                </span>
              </h2>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover, upload, and share short, informative tech videos.
                Learn by looping through concise, code-focused content from the
                developer community.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 my-16">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  High Quality
                </h3>
                <p className="text-gray-600 text-sm">
                  Crystal clear video uploads with optimized streaming
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 text-sm">
                  Optimized for speed with instant video loading
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Secure & Safe
                </h3>
                <p className="text-gray-600 text-sm">
                  Your content is protected with enterprise-grade security
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Link href="/signin">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl text-lg">
                  Get Started Today
                </button>
              </Link>
              <p className="text-gray-500 text-sm mt-5">
                Join thousands of developers sharing knowledge
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
