import mongoose, { Schema } from "mongoose"

const userInstanceSchema = new Schema(
  {
    fullname: String,
    email: String,
    password: String
  }
);

const UserInstance = mongoose.models.Instance || mongoose.model("Instance", userInstanceSchema)

export default UserInstance