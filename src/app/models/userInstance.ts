import mongoose, { Schema } from "mongoose"

const userInstanceSchema = new Schema(
  {
    userId: String,
    name: String,
    level: Number,
    country: String,
    boosts: Array,
    units: Array,
    gold: Number,
    materials: Array,
  }
);

const UserInstance = mongoose.models.Instance || mongoose.model("userInstance", userInstanceSchema)

export default UserInstance