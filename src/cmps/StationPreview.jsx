/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Link } from "react-router-dom";

export function StationPreview({ station })  {

    return (
    <Link to={`/${station.type}/${station._id}`}>
    <div>
                <h3 className="station-name">{station.name}</h3>
    </div>
    </Link>
    );
}