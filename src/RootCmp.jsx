
import {  Routes, Route } from 'react-router'
import { useState } from 'react'
import { StationIndex} from './pages/StationIndex.jsx'
import { StationSideBar } from './cmps/StationSideBar.jsx'
import { SearchStation } from './cmps/SearchStation.jsx'
import { StationInfo } from './cmps/StationInfo.jsx'        
import { AudioPlayer }   from './cmps/AudioPlayer.jsx'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStations } from './store/station.actions.js'
import { StationDetails } from './cmps/StationDetails.jsx'
import { addStation } from './store/station.actions.js' 
import { STATION_TYPE } from './helpers/const.js'
import { utilService } from './services/util.service.js'
    


const stationToCreate = {
    id: utilService.makeId(), 
    name: 'Liked Songs',
    type: STATION_TYPE.LIBARY,
    tags: [],
    createdBy:{},
    likeByUsers: [{}],
    songs: [{}]    
}

export function RootCmp() {

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const [initialLoadDone, setInitialLoadDone] = useState(false);   

    useEffect(() => {
        async function init() {
            await loadStations();
        }
        init();
    }, []); // Empty dependency array means this effect runs only once after the initial render
    
    return (
            <main className='main-container'>
                <StationSideBar stations={stations} isLoading={initialLoadDone} />
                <section className='station-main'>
                <Routes>
                        <Route path="" element={<StationIndex />} />
                        <Route path="/search" element= {<SearchStation />} />
                        <Route path="station/:id" element= {<StationDetails />} />
                        <Route path="collection/:id" element= {<StationDetails />} />
                        <Route path="album/:id" element= {<StationDetails />} />
                        <Route path="playlist/:id" element= {<StationDetails />} />
                </Routes>
                </section>
                <StationInfo />
                <AudioPlayer />
            </main>
    )
}


