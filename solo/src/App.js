import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import { useState } from "react";
import "./App.css";

const App = () => {
  const backgroundImageUrl = 'http://localhost:3000/images/bg-image.png';
  const [song, setSong] = useState({
    artist: "",
    title: "",
    isComplete: false,
  });

  return (
    <div className="App">
       <div
    className="background-image"
    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
>
      <h2>song App</h2>
      <AddSong song={song} setSong={setSong}/>
      <SongList setSong={setSong}/>
       </div>
     </div>
  );
};

export default App;
