/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { addStation } from '../store/station.actions.js' 
import { utilService } from '../services/util.service.js'
import { STATION_TYPE } from "../helpers/const.js";
import { StationPreview } from "./StationPreview.jsx";
import { loadStation } from '../store/station.actions.js'


// eslint-disable-next-line react/prop-types
export function StationSideBar({ stations }) {
    const [searchQuery, setSearchQuery] = useState('')
    
    const stationClick = (id, ev) => {     
        ev.stopPropagation() 
        console.log('Station clicked')
        loadStation(id)
        //navigate(`/mail/${folder}/${mail.id}` + composeSearchParam)
    }
    return (
        <div className="station-sidebar">
            <div className="search-bar">
            {/* Your component content goes here */}
            <Link to="" className="search-bar search-bar--home">Home</Link>
            <div>
                <Link to={`/search`} className="search-bar search-bar--search">Search</Link>
            </div>
            </div>
            <ul>
                {stations && stations.map(station => (
                    <li key={station._id} onClick={(ev) => stationClick(station._id, ev)}>
                        <StationPreview key={station._id} station={station} />
                    </li>
                ))}
            </ul>        
        </div>
    );
}