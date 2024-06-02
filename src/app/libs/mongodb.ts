import mongoose from "mongoose";

const {MONGODB_URI} = process.env;

if (!MONGODB_URI) {
  throw new Error("No MONGODB_URI provided");
}

export const connect = async () => {
  try {
  const {connection} = await mongoose.connect(MONGODB_URI);

  if(connection.readyState === 1){
    console.log("Connected to MongoDB")
    return Promise.resolve(true);
  }
 } catch (error){
    console.error("Error connecting to MongoDB", error);
    return Promise.reject(error);
  }
}