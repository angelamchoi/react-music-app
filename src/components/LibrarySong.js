import React from "react";

const LibrarySong = ({ song, songs, setCurrentSong, id }) => {
   //Event
   const songSelectHandler =() => {
       const selectedSong = songs.filter((state) => state.id === id);
   } 
  return (
    <div onClick={songSelectHandler} className="library-song">
      <img alt={song.name} src={song.cover}></img>
      <h3> {song.name}</h3>
      <h4> {song.artist}</h4>
    </div>
  );
};

export default LibrarySong;
