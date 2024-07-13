/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Link } from "react-router-dom";

export function StationPreview({ station })  {

    return (
    <Link to={`/${station.type}/${station._id}`}>
    <div className="playlist-preview">
                <img src={station.coverImageUrl} alt={station.name} className="playlist-cover-image" />
                <span className="material-symbols-outlined">
                    favorite
                    </span>
            <div className="playlist-info">
                <h3 className="playlist-name">{station.name}</h3>
                <p className="playlist-description">{station.description}</p>
                <p className="playlist-track-count">{station.trackCount} songs</p>
            </div>
            </div>
    </Link>
    
    );
}