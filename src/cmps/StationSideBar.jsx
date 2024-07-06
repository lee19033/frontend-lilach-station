/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { addStation } from '../store/station.actions.js' 
import { utilService } from '../services/util.service.js'
import { STATION_TYPE } from "../helpers/const.js";
import { StationPreview } from "./StationPreview.jsx";
import { loadStation } from '../store/station.actions.js'
import { useNavigate } from 'react-router-dom'  

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

    const stationClick = (id, ev) => {     
        ev.stopPropagation() 
        console.log('Station clicked')
        loadStation(id)
        //navigate(`/mail/${folder}/${mail.id}` + composeSearchParam)
    }
    return (
        <div>
            {/* Your component content goes here */}
            <div><button onClick={() => {
                addStation(stationToCreate)
            }}>Create station</button></div>
            <Link to="search">Search</Link>
            <Link to="">Home</Link>
            <ul>
                {stations.map(station => (
                    <li key={station._id} onClick={(ev) => stationClick(station._id, ev)}>
                        <StationPreview key={station._id} station={station} />
                    </li>
                ))}
            </ul>        
        </div>
    );
}