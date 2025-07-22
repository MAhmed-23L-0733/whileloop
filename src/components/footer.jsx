"use client";
import SafeImage from "./SafeImage";
import Logo from "@/assets/WhileLoop.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-t border-white/10 relative overflow-hidden z-30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-transparent"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <SafeImage
              src={Logo}
              width={60}
              height={60}
              priority
              alt="WhileLoop Logo"
              className="object-contain"
            />
            <span className="text-white text-3xl font-bold font-mono">
              WhileLoop
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Your ultimate platform for sharing and discovering amazing video
            content. Connect with creators, explore endless possibilities, and
            join our growing community.
          </p>
        </div>

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10l1 14H6L7 4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V9m4 2V9"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Easy Upload
            </h3>
            <p className="text-gray-400 text-sm">
              Upload your videos effortlessly with our intuitive drag-and-drop
              interface
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
              <svg
                className="w-8 h-8 text-purple-400"
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
            <h3 className="text-white font-semibold text-lg mb-2">
              HD Quality
            </h3>
            <p className="text-gray-400 text-sm">
              Experience crystal-clear video quality with our advanced streaming
              technology
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all duration-300">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Global Community
            </h3>
            <p className="text-gray-400 text-sm">
              Connect with creators worldwide and share your passion with
              millions
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 WhileLoop. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">
                Made with ❤️ for creators
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm">
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
