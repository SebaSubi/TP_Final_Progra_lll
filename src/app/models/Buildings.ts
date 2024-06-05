import mongoose, { Schema } from "mongoose"

const BuildingsSchema = new Schema(
  {
    name: String,
    cost: Number,
    img: String,
    prod_per_hour: Number,
    workers: Number,
    level: Number,
    unlock_level: Number,
    maxWorkers: Number,
    maxCapacity: Number,
  }
);

const Buildings = mongoose.models.Buildings || mongoose.model("Buildings", BuildingsSchema)

export default Buildings