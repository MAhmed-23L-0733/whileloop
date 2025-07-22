"use client";
import Form from "@/components/ui/loginform";
import Image from "next/image";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Image
                src={"/WhileLoop.png"}
                width={80}
                height={80}
                priority
                alt="WhileLoop Logo"
                className="drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>

          <p className="text-gray-300 text-lg">
            Sign in to continue your journey
          </p>
        </div>

        {/* Form Container with Glass Effect */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 relative overflow-hidden">
          {/* Glass shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>

          {/* Form */}
          <div className="relative z-10">
            <Form />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-40"></div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Secure authentication powered by{" "}
            <span className="text-blue-400 font-semibold">WhileLoop</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
