import { useDispatch, useSelector } from "react-redux";
import { Button, Alert, CircularProgress} from "@mui/material";
import { songsAdd, updateSong} from "../features/songsSlice";
import { useEffect,useState} from "react";
import '../App.css';
import './addsong.css';
const AddSong = ({song,setSong}) => {
  const dispatch = useDispatch();
  const songsState = useSelector((state) => state.songsState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (song._id) {
      dispatch(updateSong(song));
    } else {
      const newSong = {
        ...song,
        date: new Date(),
      };
      dispatch(songsAdd(newSong));
    }

setSong({
      artist: "",
      title: "",
      isComplete: false,
    });
    setShowSuccessMessage(true);
  };
   
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  useEffect(() => {
    if (songsState.addSongStatus === 'success' || songsState.updateSongStatus === 'success') {
      setShowSuccessMessage(true);
    }
  }, [songsState.addSongStatus, songsState.updateSongStatus]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input className="addsongs"
          type="text"
          placeholder="artist name"
          value={song.artist}
          onChange={(e) => setSong({ ...song, artist: e.target.value })}
        />
        <br />
        <input class="addsong"
          type="text"
          placeholder="song title"
          value={song.title}
          onChange={(e) => setSong({ ...song, title: e.target.value })}
        />
        <br />
         
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{
            margin: "0.9rem 0rem",
            fontFamily: "'Abel', 'sansSerif'",
          }}
        >
          {songsState.addSongStatus === "pending" ? (
            <CircularProgress size={24} color="secondary" />
          ) :song._id ?("Update Song") : (
            "Add your song"
          )}
        </Button>
        {songsState.addSongStatus === "rejected" ? (
          <Alert severity="error">{songsState.addSongError}</Alert>
        ) : null}
        {songsState.addSongStatus === "success" ? (
          <Alert severity="success">Song Added...</Alert>
        ) : null}
        {songsState.updateSongStatus === "rejected" ? (
          <Alert severity="error">{songsState.updateSongError}</Alert>
        ) : null}
        {songsState.updateSongStatus === "success" ? (
          <Alert severity="success">Song Updated...</Alert>
        ) : null}
        {songsState.deleteSongStatus === "rejected" ? (
          <Alert severity="error">{songsState.deleteSongError}</Alert>
        ) : null}
        {songsState.deleteSongStatus === "success" ? (
          <Alert severity="warning">A Song was deleted...</Alert>
        ) : null}
      </form>
    </>
  );
};

export default AddSong;
