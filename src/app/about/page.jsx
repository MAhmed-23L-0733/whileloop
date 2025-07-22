"use client";
import { useState } from "react";
import {
  FaPlay,
  FaUpload,
  FaComments,
  FaUsers,
  FaRocket,
  FaHeart,
  FaStar,
  FaCode,
  FaShieldAlt,
} from "react-icons/fa";

const AboutPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <FaUpload className="w-8 h-8" />,
      title: "Easy Video Upload",
      description:
        "Drag and drop your videos with our intuitive upload interface. Supports multiple formats and automatic optimization.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaPlay className="w-8 h-8" />,
      title: "Seamless Streaming",
      description:
        "Powered by ImageKit for lightning-fast video streaming with adaptive quality and instant thumbnails.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaComments className="w-8 h-8" />,
      title: "Interactive Comments",
      description:
        "Engage with your audience through real-time comments with optimistic updates and beautiful UI.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "User Authentication",
      description:
        "Secure NextAuth.js integration with personalized profiles and session management.",
      color: "from-orange-500 to-red-500",
    },
  ];

  const techStack = [
    {
      name: "Next.js 15",
      description: "React framework with App Router",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "React 19",
      description: "Latest React with Server Components",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
    {
      name: "MongoDB",
      description: "NoSQL database for scalability",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first styling",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Sign Up",
      description: "Create your account with our secure authentication system",
    },
    {
      step: "02",
      title: "Upload Videos",
      description: "Drag and drop your videos or click to browse and upload",
    },
    {
      step: "03",
      title: "Share & Engage",
      description:
        "Share your videos and interact with the community through comments",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden lg:pl-64">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-full p-6 border border-white/20 shadow-2xl">
              <FaRocket className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            WhileLoop
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The next-generation video sharing platform built with cutting-edge
            technology. Share, stream, and connect with beautiful glass-morphism
            design.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl px-6 py-3 border border-white/20">
              <div className="flex items-center space-x-2">
                <FaStar className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">Modern UI/UX</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl px-6 py-3 border border-white/20">
              <div className="flex items-center space-x-2">
                <FaShieldAlt className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Secure & Fast</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl px-6 py-3 border border-white/20">
              <div className="flex items-center space-x-2">
                <FaHeart className="w-5 h-5 text-red-400" />
                <span className="text-white font-semibold">
                  Community Driven
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  activeFeature === index ? "ring-2 ring-blue-400" : ""
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 shadow-lg`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            How to Get Started
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 h-full">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-400">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Built with Modern Technology
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <img src={tech.src} className="h-20 w-20"></img>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      {tech.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full px-6 py-3 text-white font-semibold shadow-lg">
                <FaCode className="w-5 h-5" />
                <span>Our Mission</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Democratizing Video Sharing
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              WhileLoop was created to provide a modern, fast, and beautiful
              platform for video sharing. We believe in the power of community,
              seamless user experience, and cutting-edge technology to bring
              people together through the magic of video content.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  100%
                </div>
                <div className="text-gray-300">Open Source</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
                <div className="text-gray-300">Possibilities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  0ms
                </div>
                <div className="text-gray-300">Load Time Goal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
