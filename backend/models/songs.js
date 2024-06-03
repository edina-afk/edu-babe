import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String},
  artist: { type: String},
  date: { type: Date, default: new Date()},
});

const Song = mongoose.model("Song", songSchema);

export default Song;
