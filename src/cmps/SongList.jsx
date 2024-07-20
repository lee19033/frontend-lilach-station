import { useState } from "react"
import { useSelector } from "react-redux";

export function SongList({ songs, onPlay , addToLikeSongs, addToPlaylist}) {     
    
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const [selectedSong, setSelectedSong] = useState({})
  const stations = useSelector(storeState => storeState.stationModule.stations) 

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
            
            <div className="song-item" key={idx} onClick={() => onPlay(song.snippet.resourceId.videoId)}>
                <img src={song?.snippet?.thumbnails?.default?.url} alt={song?.snippet?.title} className="song-thumbnail" />
                <div className="song-info">
                    <div className="song-info-title">{song?.snippet?.title}</div>
                    <div className="song-title artist">{song?.snippet?.videoOwnerChannelTitle}</div>
                </div>
                <button className="play-button">Play</button>
                <button className="play-button" onClick={() => addSongToPlayList(song, true)}>Add</button>
                <button className="parent-container" onClick={() => togglePopover(song)}>Add to playlist</button>
            </div>
        ))}
        {isPopoverVisible && (
        <div className="popover-container">
          <h3>Select Station</h3>
          <button onClick={() => addSongToPlayList(selectedSong)}>New playlist</button>
          {stations.map((station, index) => (
            <button key={index} onClick={() => addSongToStation(station)}>{station.name}</button>
          ))}
        </div>
      )}
    </div>
);  
}
