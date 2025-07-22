import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    videoUrl: String,
    thumbnailUrl: String,
    controls: { type: Boolean, default: true },
    transformations: {
      height: { type: Number, default: 200 },
      width: { type: Number, default: 200 },
      quality: { type: Number, default: 720 },
    },
    author: { type: String, ref: "User" },
    comments: [
      {
        authoremail: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export const Video =
  mongoose.models?.Video || mongoose.model("Video", VideoSchema);
