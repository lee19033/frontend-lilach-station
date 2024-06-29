import  { useState } from 'react';

export function AudioPlayer ({ src })  {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <audio src={src} controls={true} autoPlay={false} />
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    );
}