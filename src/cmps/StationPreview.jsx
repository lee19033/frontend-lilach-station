/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Link } from "react-router-dom";
import likedSongs from '../assets/img/liked-songs.jpg'  

export function StationPreview({ station })  {

    return (
    <Link to={`/${station.type}/${station._id}`}>
    <div className="station-preview">
        {(station.cover==='liked-songs.jpg') ?   
            <img src={likedSongs} alt={station.name} className="playlist-cover-image liked" />
            : <img src={station.cover} alt={station.name} className="playlist-cover-image" />
         }
                
            <div className="playlist-info">
                <span className="playlist-name">{station.name.substring(0,25)}</span>
                <p className="playlist-type">{station.type}</p>
            </div>
            </div>
    </Link>
    
    );
}