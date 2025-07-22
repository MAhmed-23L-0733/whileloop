"use client";
import { Video } from "@imagekit/next";
import { useSession } from "next-auth/react";
import { useOptimistic, useRef, useState, startTransition } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const VideoCard = ({ video }) => {
  const { data: session } = useSession();
  const comment = useRef();
  const [persistentComments, setPersistentComments] = useState(
    video.comments || []
  );

  const [videoComments, setComments] = useOptimistic(
    persistentComments,
    (curr, newComment) => {
      return [...curr, newComment];
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addComment = async (id) => {
    if (!comment.current.value.trim()) {
      alert("Please enter a comment!");
      return;
    }

    const commentText = comment.current.value;

    // Create optimistic comment with temporary ID
    const optimisticComment = {
      _id: `temp-${Date.now()}`,
      authoremail: session.user.email,
      description: commentText,
      createdAt: new Date().toISOString(),
    };

    startTransition(() => {
      setComments(optimisticComment);
    });

    // Clear input immediately
    comment.current.value = "";
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/video/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          comment: commentText,
        }),
      });

      if (res.status == 200) {
        const data = await res.json();
        // Update persistent comments to include the new comment
        const newComment = {
          _id: `real-${Date.now()}`,
          authoremail: data.name,
          description: commentText,
          createdAt: new Date().toISOString(),
        };
        setPersistentComments((prev) => [...prev, newComment]);
      } else {
        alert("Comment could not be added!");
        // Optionally reload to revert optimistic update
        // window.location.reload();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("An error occurred while adding the comment!");
      // Optionally reload to revert optimistic update
      // window.location.reload();
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl lg:p-6 p-4 hover:bg-white/15 transition-all duration-300 hover:shadow-3xl relative overflow-hidden w-[95vw] lg:w-[35vw]">
      {/* Glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      <div className="relative z-10">
        {/* Video Container */}
        <div className="relative mb-4 rounded-xl overflow-hidden shadow-lg">
          <Video
            className="w-80 transition-transform duration-300 place-self-center"
            src={video.videoUrl}
            controls
            preload="metadata"
            poster={video.thumbnailUrl}
          />
          {/* Play overlay - only shows when video is paused and not hovering controls */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
            {video.title}
          </h3>

          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300 w-50 h-10">
            {video.description}
          </p>

          <div className="flex items-center justify-between space-x-2 pt-2">
            <div className="flex items-center gap-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {video.author?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="text-gray-400 text-sm font-medium">
                {video.author || "Unknown Author"}
              </span>
            </div>
          </div>
          <div className="text-white">
            {new Date(video.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-6 md:mt-10 place-self-center h-96 overflow-hidden flex-1">
        {/* Comments Section Header */}
        <div className="w-full mb-4 md:mb-6">
          <div className="flex items-center space-x-2 mb-3 md:mb-4">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h4 className="text-white font-semibold text-base md:text-lg">
              Comments
            </h4>
            <span className="text-gray-400 text-xs md:text-sm">
              ({videoComments ? videoComments.length : 0})
            </span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        </div>

        {/* Comments List */}
        <div className="w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          {videoComments.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {videoComments.map((comment, index) => (
                <div
                  key={comment._id || index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 w-80 lg:w-90"
                >
                  <div className="flex items-start space-x-2 md:space-x-3">
                    {/* Avatar */}
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-semibold shadow-lg flex-shrink-0">
                      {comment.authoremail?.charAt(0).toUpperCase() || "U"}
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1 space-y-1 md:space-y-2 min-w-0">
                      <div className="flex items-center space-x-1 md:space-x-2 flex-wrap">
                        <span className="text-blue-300 text-xs md:text-sm font-semibold truncate max-w-[120px] md:max-w-none">
                          {comment.authoremail || "Unknown Author"}
                        </span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-400 text-xs">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>

                      {/* Comment Text */}
                      <div className="bg-white/5 rounded-lg p-2 md:p-3 border-l-2 md:border-l-4 border-blue-400/50 w-full min-h-[60px] flex items-start">
                        <p className="text-gray-200 text-xs md:text-sm leading-relaxed break-words w-full">
                          {comment.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center">
              <svg
                className="w-10 h-10 md:w-12 md:h-12 text-gray-500 mx-auto mb-2 md:mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-gray-400 text-xs md:text-sm">
                No comments yet
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(video._id);
        }}
        className="mt-4 md:mt-6 w-80 lg:w-full place-self-center"
      >
        <div className="lg:bg-white/5 lg:backdrop-blur-sm rounded-xl lg:p-3 md:p-4 lg:border border-white/10 place-self-center">
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* User Avatar for Comment Input */}
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-semibold shadow-lg flex-shrink-0">
              {session?.user?.email?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* Comment Input */}
            <div className="flex-1 flex items-center space-x-2 px-2">
              <input
                ref={comment}
                type="text"
                placeholder="Add a comment..."
                disabled={isSubmitting}
                className="flex-1 px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="p-2 md:p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex-shrink-0"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <IoIosAddCircleOutline className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VideoCard;
