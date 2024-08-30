import { useState } from "react"
import { useSelector } from "react-redux";

import { SongInfo } from "./SongInfo";

export function SongList({ songs, onPlay , addToLikeSongs, addToPlaylist}) {     
    
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const [selectedSong, setSelectedSong] = useState({})
  const stations = useSelector(storeState => storeState.stationModule.stations) 
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const togglePopover = (song) => {
    setSelectedSong(song);
    setIsPopoverVisible(!isPopoverVisible);
  };

function addSongToPlayList(song, isLiked=false){
    console.log('addSongToPlayList:', song)
    console.log(song.snippet.title)
    if (isLiked)
        addToLikeSongs(song)
    else {
        //togglePopover(song)
        addToPlaylist(null, selectedSong)
    }
        
    setIsPopoverVisible(false);
}   

function addSongToStation(station) {
    addToPlaylist(station, selectedSong)
    setIsPopoverVisible(false);
}

return (
    <div className="song-list">
        {songs.map((song, idx) => (
            
            <div className="song-item" key={idx} onClick={() => onPlay(song.snippet.resourceId.videoId)}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
            >
                <div className="song-index">
                  {hoveredIndex === idx && <span className='material-symbols-outlined'
                  onClick={() => addSongToPlayList(song, true)}>
                  play_arrow
                    </span> 
                  }
                  {hoveredIndex !== idx && <span>{idx + 1}</span>}
                </div>
                <SongInfo song={song} />
                {/*<img src={song?.snippet?.thumbnails?.default?.url} alt={song?.snippet?.title} className="song-thumbnail" />
                <div className="song-info">
                    <div className="song-info-title">{removeUntilHyphen(song?.snippet?.title)}</div>
                    <div className="song-title artist">{song?.snippet?.videoOwnerChannelTitle}</div>
                </div>*/}
                <button className="parent-container" onClick={() => togglePopover(song)}>...</button>
            </div>
        ))}
        {isPopoverVisible && (
        <div className="popover-container">
          <h3>Select Station</h3>
          <button onClick={() => addSongToPlayList(selectedSong)}>New playlist</button>
          {stations.map((station, index) => (
            <button key={index} onClick={() => addSongToStation(station)}>{station.name.substring(0,10)}</button>
          ))}
        </div>
      )}
    </div>
);  
}
