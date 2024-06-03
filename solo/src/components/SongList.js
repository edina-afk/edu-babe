 import { useDispatch, useSelector } from "react-redux";
import { getSongs,deleteSong } from "../features/songsSlice";
import { useEffect } from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import { CircularProgress, Card } from "@mui/material";
import "../App.css";
 
 
 const ListSongs = ({setSong}) => {
   const dispatch = useDispatch();
  const songsState = useSelector((state) => state.songsState);
  const { songs } = songsState;

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);
  const handleDelete = (id) => {
    dispatch(deleteSong(id));
  };
  
   return (
    <div>
       <h2>PLay LIST</h2>
      <div>
         {songsState.getSongsStatus === "pending" ? <CircularProgress /> : null}
         {songs.map((song) => (
        <Card
          variant="outlined"
          sx={{
            padding: "0.7rem",
            marginBottom: "2rem",
          }}
          key={song._id}
        >
         <h3>Artist name: {song.artist}</h3>
         <h3>Song title:{song.title}</h3>
         <audio controls>
          <source  src='asset/the.mp3' type="audio/mpeg">
            </source>
            <source  src='asset/ይከብዳል አንገት ደፍቶ ጉዞ - yikebdal akerkro guzo   መልካሙ ተበጀ  melkamu tebeje  ስሚዝ smith ባር ባር.mp3' type="audio/mpeg">
            </source>
        </audio> 
         <p>Added: {moment(song.date).fromNow()}</p>

             <Button
            variant="outlined"
            size="small"
            onClick={() => setSong({ ...song })}
            sx={{
              fontFamily: "'Abel', 'sansSerif'",
            }}
          >
            Update
          </Button>
           <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              marginLeft: "0.7rem",
              fontFamily: "'Abel', 'sansSerif'",
            }}
            onClick={() => handleDelete(song._id)}
          >
            Delete
          </Button>
          </Card>
        ))}
        </div>
        
        </div> 
         );
};

export default ListSongs;
 

  
     

