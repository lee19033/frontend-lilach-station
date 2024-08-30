import  { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  setVideo } from '../store/station.actions';
import YouTube from 'react-youtube';
import { SongInfo } from './SongInfo';
import { ProgressBar } from './ProgressBar';    

let videoElement = null;

export function AudioPlayer() {

// Assuming playlist is an array of video IDs. Replace with actual playlist.
const playlist = useSelector(storeState => storeState.stationModule.station)
const [currentSongIndex, setCurrentSongIndex] = useState(0)
const videoId = useSelector(storeState => storeState.stationModule.videoId)
const [playing, setPlaying] = useState(false)
const [progress, setProgress] = useState(0)
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const playerRef = useRef(null);   

const onPlayerReady = (event) => {
    videoElement = event;
    playerRef.current = event.target;
    setDuration(playerRef.current.getDuration());
    setInterval(() => {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
      setProgress((currentTime / duration) * 100);
      setCurrentTime(currentTime);
    }, 1000);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

// Function to play the next song
const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.songs.length; // Loop back to the start
    setCurrentSongIndex(nextIndex);
    
    // Optionally, update the Redux store if needed
    // dispatch(updateVideoIdAction(playlist[nextIndex]));
};

// Options for YouTube player
const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      rel: 0,
    },
};

useEffect(() => {   
    if (videoElement)   {
        if (playing) {
            videoElement.target.playVideo();
          } else {
            videoElement.target.pauseVideo();
          } 
    }
}, [videoElement,playing]);


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
    <>
        { videoId && 
        <div className='station-player-song'>
                    <SongInfo song={playlist.songs[currentSongIndex]} size={'med'}/>
        </div>
        }
        <div className='youtube-audio-player'>
        { videoId && (
            <><YouTube
                    videoId={videoId} // Current video ID
                    opts={opts}
                    onReady={onPlayerReady}
                    onEnd={playNextSong} // Play next song when the current one ends
                />
                <div className="controls">
                <span className="material-symbols-outlined">
                        skip_previous
                        </span>
                        <span className="material-symbols-outlined" onClick={handlePlayPause}>
                            {playing ? 'pause_circle' : 'play_circle'}
                        </span>
                        <span className="material-symbols-outlined">
                            skip_next
                        </span>
                    </div>
                    <ProgressBar progress={progress} currentTime={currentTime} duration={duration} />
                    </>
        )}
        { !videoId && (
            <p>No playlist available</p> // Fallback UI when playlist is null
        )
        }
        </div>
    </>
    )

}