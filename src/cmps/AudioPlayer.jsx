import  { useState } from 'react';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';


export function AudioPlayer ()  {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoId = useSelector(storeState => storeState.stationModule.videoId); // Get the video ID from the store

    const opts = {
        height: '80',
        width: '1000',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    return (
        <div style={{backgroundColor: 'black', width:'100%'}}>
            {videoId && 
                <YouTube videoId={videoId} opts={opts} />
            }
        </div>
    );
}