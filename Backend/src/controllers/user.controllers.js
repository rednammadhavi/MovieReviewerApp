import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) throw new Error("User with this email id already exists");

        req.body.password = await bcrypt.hash(req.body.password, 10);
        await User.create(req.body);

        res.status(200).json({ message: "User successfully registered", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error("User not exist");

        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrectPassword) throw new Error("Invalid password");

        const token = jwt.sign({ userId: user._id }, process.env.secret_jwt, {
            expiresIn: "1d",
        });

        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.status(200).json({
            message: "User fetched successfully",
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
export {
    registerUser,
    loginUser,
    getCurrentUser
};
