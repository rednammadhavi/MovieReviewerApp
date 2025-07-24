import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.route("/register").post(verifyJWT, registerUser);
router.route("/login").post(verifyJWT, loginUser);
router.route("/get-current-user").get(verifyJWT, getCurrentUser);

export { router };
