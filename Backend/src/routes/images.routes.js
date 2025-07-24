import express from "express";
import multer from "multer";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { uploadImage } from "../controllers/upload.controllers.js";

const router = express.Router();

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

router.route("/upload-image").post(verifyJWT, upload.single("image"), uploadImage);

export { router };
