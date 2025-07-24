import { cloudinary } from "../config/cloudinary.config.js";

const uploadImage = async (req, res) => {
    try {
        const response = await cloudinary.uploader.upload(req.file.path, {
            folder: "movie-recommendation",
        });
        const imageUrl = response.secure_url;
        res
            .status(200)
            .json({ message: "Image Uploaded", data: imageUrl, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export { uploadImage };
