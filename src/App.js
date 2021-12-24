import React, {useState, useRef} from "react"
//styles
import './styles/app.scss'

// components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";

// data
import data from "./util";


function App() {
  // Ref
  const audioRef = useRef(null);
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]); //grabs the first song from the array of objects
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  // Event
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration}) //whatever info we had already update it to the current time variable and duration
  };

  return (
    <div className="App">
      <Song currentSong={currentSong} /> 
      <Player
        audioRef={audioRef} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo} />
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong}/>
      <audio 
          onTimeUpdate={timeUpdateHandler} 
           // when the song loads, update the time
          onLoadedMetadata={timeUpdateHandler} 
          ref={audioRef} 
          src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
