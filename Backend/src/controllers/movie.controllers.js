import { Movie } from "../models/movie.models.js";

const addMovie = async (req, res) => {
    try {
        req.body.createdBy = req.userId;
        console.log("req.body", req.body);
        await Movie.create(req.body);
        res.status(200).json({ message: "Movie added successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
            .populate("cast")
            .populate("hero")
            .populate("heroine")
            .populate("director")
            .populate("createdBy");
        res.status(200).json({ movies, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
            .populate("cast")
            .populate("hero")
            .populate("heroine")
            .populate("director")
            .populate("createdBy");
        res.status(200).json({ data: movie, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            message: "Movie updated successfully",
            data: updatedMovie,
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id, { new: true });
        res.status(200).json({
            message: "Movie deleted successfully",
            success: true,
            data: deletedMovie,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export {
    addMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
};
