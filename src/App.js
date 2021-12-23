import React, {useState} from "react"
//styles
import './styles/app.scss'

// components
import Song from "./components/Song";
import Player from "./components/Player";

// data
import data from "./util";


function App() {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]); //grabs the first song from the array of objects
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} /> 
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
    </div>
  );
}

export default App;
