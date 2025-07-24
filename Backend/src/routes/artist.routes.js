import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
} from "../controllers/artist.controllers.js";

const router = express.Router();

router.route("/add1").post(verifyJWT, addArtist);
router.route("/").get(verifyJWT, getAllArtists);
router.route("/:id").get(verifyJWT, getArtistById);
router.route("/:id").put(verifyJWT, updateArtist);
router.route("/:id").delete(verifyJWT, deleteArtist);

export { router };
