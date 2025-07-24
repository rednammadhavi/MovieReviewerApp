import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controllers.js";

const router = express.Router();

router.route("/add1").post(verifyJWT, addMovie);
router.route("/").get(verifyJWT, getAllMovies);
router.route("/:id").get(verifyJWT, getMovieById);
router.route("/:id").put(verifyJWT, updateMovie);
router.route("/:id").delete(verifyJWT, deleteMovie);;


export { router };
