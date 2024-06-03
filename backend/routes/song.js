import Song from "../models/songs.js";
import express from "express";
import Joi from "joi";
 const router = express.Router();

 router.get("/", async (req, res) => {
  try {
    const songs = await Song.find().sort({ date: -1 });
    res.send(songs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error: " + error.message);
  }
});
 router.post("/",async (req, res) => {
  try {
    const schema = Joi.object({
        artist:Joi.string().min(3).max(300).required(),
        title:Joi.string().min(3).max(300).required(),
        isComplete: Joi.boolean(),
        date: Joi.date(),
    });

     const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

     const {artist,title,isComplete, date,uid} = req.body;
           
     let song = new Song({artist,title,isComplete,date});

     song = await song.save();
     res.send(song);
   } catch (error) {
     console.log(error.message);
     res.status(588).send(error.message);
   }
});

router.delete("/:id", async (req, res) => {
  const song = await Song.findById(req.params.id);

  if (!song) return res.status(404).send("Song not found...");

  const deletedSong = await Song.findByIdAndDelete(req.params.id);

  res.send(deletedSong);
});

router.put("/:id", async (req, res) => {
  const schema = Joi.object({
    artist:Joi.string().min(3).max(300).required(),
    title:Joi.string().min(3).max(300).required(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const song = await Song.findById(req.params.id);

  if (!song) return res.status(404).send("Song not found...");

  const {artist,title,isComplete,date,uid } = req.body;

  const updatedSong = await Song.findByIdAndUpdate(
    req.params.id,
    {artist,title,isComplete, date, uid },
    { new: true }
  );

  res.send(updatedSong);
});

export default router;
