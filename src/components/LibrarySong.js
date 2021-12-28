import React from "react";
import {playAudio} from '../util';

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs,
  active,
}) => {
  //Event
  const songSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === id);
    //access state song and it is equal to state.id
    //checking to see if what we clicked on equals the state
    // filtering out the whole state songs to just the song we clicked on
    // returns an array
    setCurrentSong({...selectedSong[0] });
    
    //Set Active in library
    const newSongs = songs.map((song) => {
      if (song.id === id) {
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
    //check if the song is playing
    playAudio(isPlaying, audioRef);
    //if my song is playing, then create a playPromise to play the song
    //if my playPromise  the audio is undefined(not loaded up yet) then wait and then play
  };
  return (
    <div onClick={songSelectHandler} className="library-song">
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3> {song.name}</h3>
        <h4> {song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
