import { Artist } from "../models/artist.models.js";

const addArtist = async (req, res) => {
    try {
        req.body.createdBy = req.userId;
        await Artist.create(req.body);
        res.status(200).json({ message: "Artist Added successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find().sort({ createdAt: -1 });
        res.json({ data: artists, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        res.json({ data: artist, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const updateArtist = async (req, res) => {
    try {
        const validId = req.params.id.replace(":", "");
        const updatedArtist = await Artist.findByIdAndUpdate(validId, req.body, { new: true });
        res.json({ message: "Artist updated successfully", success: true, data: updatedArtist });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const deleteArtist = async (req, res) => {
    try {
        const validId = req.params.id.replace(":", "");
        const deletedArtist = await Artist.findByIdAndDelete(validId);
        res.json({ message: "Artist deleted successfully", success: true, data: deletedArtist });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export {
    addArtist,
    getAllArtists,
    getArtistById,
    updateArtist,
    deleteArtist
};
