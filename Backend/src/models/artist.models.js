import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    images: {
      type: [],
      required: false,
    },
    debutYear: {
      type: Number,
      required: true,
    },
    debutMovie: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Artist = mongoose.model("Artist", artistSchema);
