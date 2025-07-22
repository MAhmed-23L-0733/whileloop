"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Video } from "@imagekit/next";
import Link from "next/link";
import {
  FaVideo,
  FaCalendarAlt,
  FaComments,
  FaEdit,
  FaTrash,
  FaPlay,
} from "react-icons/fa";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [userVideos, setUserVideos] = useState([]);
  const [userName, setName] = useState();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVideos: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin");
    }

    if (session?.user?.email) {
      fetchUserVideos();
    }
  }, [session, status]);

  const fetchUserVideos = async () => {
    try {
      setLoading(true);
      
      // Fetch user details
      const userResponse = await fetch(`/api/user/${session.user.email}`);
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setName(userData.name);
      }
      
      // Fetch user videos
      const videosResponse = await fetch(
        `/api/user/videos?email=${session.user.email}`
      );
      if (videosResponse.ok) {
        const data = await videosResponse.json();
        setUserVideos(data.videos || []);

        // Calculate stats
        setStats({
          totalVideos: data.videos?.length || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching user videos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center lg:ml-64">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden lg:ml-64">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                {session?.user?.name?.charAt(0).toUpperCase() ||
                  session?.user?.email?.charAt(0).toUpperCase() ||
                  "U"}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 blur-xl -z-10"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {userName}
              </h1>
              <p className="text-xl text-blue-300 mb-4">
                {session?.user?.email}
              </p>
              <p className="text-gray-300 mb-6 max-w-2xl">
                Content creator passionate about sharing amazing videos with the
                WhileLoop community. Join me on this incredible journey of
                creativity and storytelling.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl text-center group hover:bg-white/15 transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaVideo className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">
              {stats.totalVideos}
            </h3>
            <p className="text-gray-300">Videos Shared</p>
          </div>
        </div>

        {/* Videos Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center space-x-3">
              <FaVideo className="w-8 h-8 text-blue-400" />
              <span>My Videos</span>
            </h2>
            <div className="text-gray-300">
              {stats.totalVideos} video{stats.totalVideos !== 1 ? "s" : ""}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-300">Loading your videos...</p>
              </div>
            </div>
          ) : userVideos.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/5 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <FaVideo className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-4">
                No videos yet
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Start sharing your creativity with the world! Upload your first
                video to get started.
              </p>
              <Link href="/upload">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Upload Your First Video
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userVideos.map((video, index) => (
                <div key={video._id || index} className="group">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    {/* Video Container */}
                    <div className="relative aspect-video bg-gray-800 rounded-t-2xl overflow-hidden">
                      <Video
                        className="w-full h-full object-cover"
                        src={video.videoUrl}
                        controls={false}
                        preload="metadata"
                        poster={video.thumbnailUrl}
                      />

                      {/* Play Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <FaPlay className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Video Stats */}
                      <div className="absolute top-4 right-4 space-y-2">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-xs flex items-center space-x-1">
                          <FaComments className="w-3 h-3" />
                          <span>{video.comments?.length || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-6">
                      <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {video.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FaCalendarAlt className="w-3 h-3" />
                          <span>
                            {new Date(video.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-white/10">
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-white/10">
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
