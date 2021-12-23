import React, {useRef} from "react"; //useRef grabs html element

// Font Awesome Component
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// {} --> importing specfic things from font awesome
import {faPlay, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';



const Player = ({currentSong, isPlaying, setIsPlaying}) => {
  //Ref
  const audioRef = useRef(null);
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

  return (
    <div className="player">
      <div className="time-control">
        <p> Start Time</p>
        <input type="range"/>
        <p> End Time </p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
          <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
          <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
        </div>
        <audio ref={audioRef} src={currentSong.audio}></audio>

    </div>
  );
};

export default Player;
