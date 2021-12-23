import React from "react";

// Font Awesome Component
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// {} --> importing specfic things from font awesome
import {faPlay} from '@fortawesome/free-solid-svg-icons';


const Player = () => {
  return (
    <div className="player">
      <div className="time-control">
        <p> Start Time</p>
        <input type="range"/>
        <p> End Time </p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon className="play" icon={faPlay} />
        </div>


    </div>
  );
};

export default Player;
