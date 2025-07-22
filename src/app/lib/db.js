import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.DB_URI);
  }
  try {
    cached.conn = await cached.promise;
    console.log("Connected to the database!");
  } catch (error) {
    cached.promise = null;
    console.log("Error: ", error.message);
  }
  return cached.conn;
}
