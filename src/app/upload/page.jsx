"use client";
import { App } from "@/components/provider";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useRef, useState } from "react";

const UploadVideo = () => {
  const { setCurrPage } = createContext(App);
  const title = useRef();
  const description = useRef();

  const { data: session } = useSession();
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const abortController = new AbortController();
  const router = useRouter();

  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("video/")) {
        fileInputRef.current.files = files;
        setSelectedFile(file);
      } else {
        alert("Please drop a video file only");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }
    const file = fileInput.files[0];
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });
      const data = {
        title: title.current.value || "Untitled Video",
        description: description.current.value || "No description provided",
        videoUrl: `https://ik.imagekit.io/mahmedl230733/${uploadResponse.name}`,
        thumbnailUrl: `https://ik.imagekit.io/mahmedl230733/${uploadResponse.name}/ik-thumbnail.jpg`,
        author: session.user.email,
      };
      const addVideoRes = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!addVideoRes.ok) {
        console.log("Could not add the video to the database!");
      } else {
        // Clear form after successful upload
        title.current.value = "";
        description.current.value = "";
        fileInputRef.current.value = "";
        setSelectedFile(null);
        setProgress(0);
        alert("Video uploaded successfully!");
      }

      console.log("Upload response:", uploadResponse);
      setCurrPage("home");
      router.push("/");
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div className="lg:pl-60 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Upload Your Videos
            </h1>
            <p className="text-gray-300 text-lg">
              Share your content with the world
            </p>
          </div>

          {/* Upload Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            {/* Video Details */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  name="title"
                  ref={title}
                  placeholder="Enter a catchy title for your video"
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  ref={description}
                  rows="4"
                  placeholder="Describe your video content..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                ></textarea>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="mb-8">
              <label className="block text-white font-semibold mb-4">
                Select Video File
              </label>
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="video/*"
                  className="hidden"
                  id="video-upload"
                  onChange={handleFileChange}
                />
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                    isDragOver
                      ? "border-blue-400 bg-blue-500/20 scale-105"
                      : selectedFile
                      ? "border-green-400 bg-green-500/10"
                      : "border-white/30 bg-white/5 hover:border-blue-500 hover:bg-white/10"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {selectedFile ? (
                      <>
                        <svg
                          className="w-8 h-8 mb-4 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-green-400 font-semibold">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </>
                    ) : isDragOver ? (
                      <>
                        <svg
                          className="w-8 h-8 mb-4 text-blue-400 animate-bounce"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-blue-400 font-semibold">
                          Drop your video here
                        </p>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-8 h-8 mb-4 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          MP4, MOV, AVI (MAX. 100MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {progress > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">
                    Upload Progress
                  </span>
                  <span className="text-blue-400 font-bold">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <button
              type="button"
              onClick={handleUpload}
              disabled={progress > 0 && progress < 100}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {progress > 0 && progress < 100 ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </div>
              ) : (
                "Upload Video"
              )}
            </button>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-blue-400 text-2xl mb-2">🎬</div>
              <h3 className="text-white font-semibold mb-1">High Quality</h3>
              <p className="text-gray-400 text-sm">
                Upload videos in HD quality
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-green-400 text-2xl mb-2">⚡</div>
              <h3 className="text-white font-semibold mb-1">Fast Upload</h3>
              <p className="text-gray-400 text-sm">
                Lightning fast upload speeds
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-purple-400 text-2xl mb-2">🔒</div>
              <h3 className="text-white font-semibold mb-1">Secure</h3>
              <p className="text-gray-400 text-sm">
                Your content is safe with us
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
