import mongoose, { Schema } from "mongoose"

const UserInstanceSchema = new Schema(
    {
        userId: String,
        name: String,
        level: Number,
        country: String,
        boosts: Array,
        units: Number,
        gold: Number,
        materials: Array,
    }
);

const UserInstance = mongoose.models.userInstance || mongoose.model("userInstance", UserInstanceSchema)

export default UserInstance