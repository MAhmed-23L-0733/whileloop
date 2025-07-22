"use client";
import SignUpForm from "@/components/ui/signupform";
import SafeImage from "@/components/SafeImage";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/30 rounded-full blur-2xl animate-bounce"></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Logo with glow effect */}
          <div className="relative mb-6 flex justify-center">
            <div className="relative">
              <SafeImage
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
            Join WhileLoop
          </h1>

          <p className="text-gray-300 text-lg">
            Create your account and start your journey
          </p>
        </div>

        {/* Form Container with Glass Effect */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 relative overflow-hidden">
          {/* Glass shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>

          <Form />
        </div>

        {/* Bottom decorative elements */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 text-gray-400">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-1"></div>
            <span className="text-sm">Welcome to the community</span>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
