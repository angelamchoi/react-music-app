import React, { useState} from "react"; //useRef grabs html element

// Font Awesome Component
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// {} --> importing specfic things from font awesome
import {faPlay, faAngleLeft, faAngleRight, faPause,} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  currentSong, 
  isPlaying, 
  setIsPlaying, 
  audioRef, 
  setSongInfo, 
  songInfo,
}) => {

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

  return (
    <div className="player">
      <div className="time-control">
        <p> {getTime(songInfo.currentTime)}</p>
        <input 
          type="range" 
          min={0} // min length of song
          max={songInfo.duration} //max length of song
          value={songInfo.currentTime} //current time
          onChange={dragHandler}
          />
        <p> {getTime(songInfo.duration)} </p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
          <FontAwesomeIcon 
            onClick={playSongHandler} 
            className="play" 
            size="2x" 
            icon={isPlaying ? faPause : faPlay } /> 
             {/* // if it is playing show pause, if it is not then show play  */}
          <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
        </div>
    </div>
  );
};

export default Player;
