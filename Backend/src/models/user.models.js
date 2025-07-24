import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema)