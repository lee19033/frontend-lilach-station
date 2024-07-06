/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { addStation } from '../store/station.actions.js' 
import { utilService } from '../services/util.service.js'
import { STATION_TYPE } from "../helpers/const.js";

// eslint-disable-next-line react/prop-types
export function StationSideBar({ stations }) {

    const stationToCreate = {
        id: utilService.makeId(), 
        name: `New Station${utilService.makeId()}`,
        type: STATION_TYPE.ALBUM,
        tags: [],
        createdBy:{},
        likeByUsers: [{}],
        songs: [{}]    
    }
    return (
        <div>
            {/* Your component content goes here */}
            <div><button onClick={() => {
                addStation(stationToCreate)
            }}>Create station</button></div>
            <ul>
                <li><Link to="search">Search</Link>  </li>
                {stations.map(station => (
                    <li key={station._id}><Link to={`/${station.type}/${station._id}`}>{station.name}</Link></li>
                ))}

            </ul>        
        </div>
    );
}