import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong}) => {
    return(
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                <LibrarySong 
                    songs={songs} // all songs   
                    song={song} // each song
                    setCurrentSong={setCurrentSong} //function
                    id={song.id} // ID of song (optional b/c we can access song id from song)
                    key={song.id} // something React requires
                    /> //mapping over to render librarySong component
                ))}
            </div>
        </div>
    )
}

export default Library;