import React, {useState, useRef} from "react"
//styles
import './styles/app.scss'

// components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
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
  const [libraryStatus, setLibraryStatus] = useState(false);
  // Event
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration}) //whatever info we had already update it to the current time variable and duration
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav 
        libraryStatus={libraryStatus} 
        setLibraryStatus={setLibraryStatus} />
      <Song 
        currentSong={currentSong}
        isPlaying={isPlaying} /> 
      <Player
        audioRef={audioRef} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo} 
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}/>
      <Library 
        audioRef={audioRef}
        songs={songs} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}/>
      <audio 
          onTimeUpdate={timeUpdateHandler} 
          onLoadedMetadata={timeUpdateHandler} // when the song loads, update the time 
          ref={audioRef} 
          src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
