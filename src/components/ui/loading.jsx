"use client";
import React from "react";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Animated Logo */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-purple-500 rounded-full animate-spin animation-delay-150"></div>
      </div>
    </div>
  );
};

export default Loading;
