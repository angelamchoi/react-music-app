import React, {useState, useRef} from "react"
  
  //light & dark mode
import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./components/useDarkMode"
import { GlobalStyles } from "./components/GlobalStyle";
import { lightTheme, darkTheme } from "./components/Theme"
import Toggle from "./components/Toggler"
//styles
import './styles/app.scss'

// components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
// data
import data from "./data";


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
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  
  //light & dark mode

  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  // Event
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate percentage
    const roundedCurrent = Math.round(current); 
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100); //current time divided by duration then times 100
    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation}) //whatever info we had already update it to the current time variable and duration
  };
  if(!mountedComponent) return <div/>

  return (
    <ThemeProvider theme={themeMode}>
    <>
    <GlobalStyles/>
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
    <Toggle theme={theme} toggleTheme={themeToggler} />
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
    </>
    </ThemeProvider>
  );
}

export default App;
