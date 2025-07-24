import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/get-current-user").get(verifyJWT, getCurrentUser);

export { router };
