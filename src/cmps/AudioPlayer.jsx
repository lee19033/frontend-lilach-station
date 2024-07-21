import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  setVideo } from '../store/station.actions';
import YouTube from 'react-youtube';

export function AudioPlayer() {
const dispatch = useDispatch();
// Assuming playlist is an array of video IDs. Replace with actual playlist.
const playlist = useSelector(storeState => storeState.stationModule.station);
const [currentSongIndex, setCurrentSongIndex] = useState(0);
const videoId = useSelector(storeState => storeState.stationModule.videoId);

// Function to play the next song
const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.songs.length; // Loop back to the start
    setCurrentSongIndex(nextIndex);
    
    // Optionally, update the Redux store if needed
    // dispatch(updateVideoIdAction(playlist[nextIndex]));
};

// Options for YouTube player
const opts = {
    height: '80',
    width: '100%',
    playerVars: {
        autoplay: 1,
    },
};

// Effect to update videoId in Redux store when currentSongIndex changes
useEffect(() => {
     //videoId = playlist[currentSongIndex].videoId;
    // Update the Redux store with the new video ID
    const songId = playlist?.songs[currentSongIndex].snippet.resourceId.videoId;
    if (songId) {
        setVideo(songId);
    }
          //song.snippet.resourceId.videoId
}, [currentSongIndex]);

return (
    <div className='station-player'>
     { videoId && (
        <YouTube
            videoId={videoId} // Current video ID
            opts={opts}
            onEnd={playNextSong} // Play next song when the current one ends
        />
    )}
    { !videoId && (
        <p>No playlist available</p> // Fallback UI when playlist is null
    )
    }
    </div>
    )

}