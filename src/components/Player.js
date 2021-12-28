import React, {useEffect} from "react"; //useRef grabs html element

// Font Awesome Component
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// {} --> importing specfic things from font awesome
import {faPlay, faAngleLeft, faAngleRight, faPause,} from '@fortawesome/free-solid-svg-icons';
import {playAudio} from '../util';

const Player = ({
  currentSong, 
  isPlaying, 
  setIsPlaying, 
  audioRef, 
  setSongInfo, 
  songInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  //UseEffect ---> using this to change the UI State of current song being played in the library section
  useEffect(() => {
   // Add Active State
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }, [currentSong]); //run this function everytime our currentSong function gets updated

//setting the song id to the current song id
// at the end run currentSong function

  //Event Handlers
  const playSongHandler = () => {
    if(isPlaying){
      audioRef.current.pause(); //if it is playing, then pause it
      setIsPlaying(!isPlaying); // setting it to the opposite so true or false
    } else{
     audioRef.current.play(); //but if it is paused then play
     setIsPlaying(!isPlaying);
  }
};

  const getTime= (time) => {
    return(
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2) // formats time - min:sec
    );
  };
  
  const dragHandler =(e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value})
  }

  const skipTrackHandler =(direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id); // does the id here match the id from state and if it does give me the index
    if(direction === 'skip-forward'){
      setCurrentSong(songs[(currentIndex +1) % songs.length]); //go to the songs array and dynamically change the index ---> so we are incrementing current index by 1
      console.log(`next index: ${currentIndex + 1}`);
      console.log( `songs length: ${songs.length}`);
    }
    if(direction === 'skip-back'){
      if((currentIndex -1) % songs.length === -1){ //if our index equals -1 
        setCurrentSong(songs[songs.length -1]); // then set current song to the remainder 
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]); //only applies to the middle songs
    }
    playAudio(isPlaying, audioRef);
  };

//1. Need to know where I am and which song I selected so that I know which song to go forward and backwards ---> use index
//2. need to access songs
// 3. we can't do currentIndex + 1 because there is no song #9,10,etc.. and so the .length will match and go back to 0.
// 4. when it is on the first song and we go backwards it crashes
// --->do a check
// so if it currentIndex: 8 and songs.length:8 then go to the remainder of 0

// styles for animation
const trackAnimation = {
  transform: `translateX(${songInfo.animationPercentage}%)`,
};

  return (
    <div className="player">
      <div className="time-control">
        <p> {getTime(songInfo.currentTime)}</p>
      <div className style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
      > 
        <input 
          type="range" 
          min={0} // min length of song
          max={songInfo.duration || 0} //max length of song // setting 0 as default
          value={songInfo.currentTime} //current time
          onChange={dragHandler}
          />
          <div style={trackAnimation} className="animate-track"></div> 
        </div>
        <p> {getTime(songInfo.duration)} </p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon 
            onClick={() => skipTrackHandler('skip-back')} //arrow function so we are not invoking it immediately
            className="skip-back" 
            size="2x" 
            icon={faAngleLeft} />
          <FontAwesomeIcon 
            onClick={playSongHandler} 
            className="play" 
            size="2x" 
            icon={isPlaying ? faPause : faPlay } /> 
             {/* // if it is playing show pause, if it is not then show play  */}
          <FontAwesomeIcon
            onClick={() => skipTrackHandler('skip-forward')} 
            className="skip-forward" 
            size="2x" 
            icon={faAngleRight} />
        </div>
    </div>
  );
};

export default Player;

//Notes
// animate-track goes on top of track and will reveal where we are in the track