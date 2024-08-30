
export function SongInfo({ song, size }) {     


function removeUntilHyphen(str) {
  return str?.replace(/^[^-]+ - /, '');
}

const sizeClass = size === 'med' ? 'song-thumbnail medium' : 'song-thumbnail';


return (
    <div className="song-info">
                <img src={song?.snippet?.thumbnails?.default?.url} alt={song?.snippet?.title} className={sizeClass} />
                <div className="song-info-container">
                    <div className="song-info-title">{removeUntilHyphen(song?.snippet?.title)}</div>
                    <div className="song-title artist">{song?.snippet?.videoOwnerChannelTitle}</div>
                </div>
    </div>
);  
}
