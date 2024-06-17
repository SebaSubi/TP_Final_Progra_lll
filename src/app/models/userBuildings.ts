import mongoose, { Schema } from "mongoose"

const userBuildingsSchema = new Schema(
  {
    userId: String,
    name: String,
    cost: Number,
    img: String,
    prod_per_hour: Number,
    lastCollected: Date,
    workers: Number,
    level: Number,
    unlock_level: Number,
    maxWorkers: Number,
    capacity: Number,
    maxCapacity: Number,
    position: {x: Number, y: Number}
  }
);

const userBuildings = mongoose.models.userBuildings || mongoose.model("userBuildings", userBuildingsSchema)

export default userBuildings