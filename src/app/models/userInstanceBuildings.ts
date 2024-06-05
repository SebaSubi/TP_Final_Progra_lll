import mongoose, { Schema } from "mongoose"

const userInstanceBuildingsSchema = new Schema(
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
    maxCapacity: Number,
    position: {x: Number, y: Number}
  }
);

const userInstanceBuildings = mongoose.models.userInstanceBuildings || mongoose.model("userInstanceBuildings", userInstanceBuildingsSchema)

export default userInstanceBuildings