import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import songs from "./routes/song.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5031;

app.use("/api/songs", songs);

app.get("/", (req, res) => {
  res.send("welcome to the songs api...");
});
app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));