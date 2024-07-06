
import {  Routes, Route } from 'react-router'

import { StationIndex} from './pages/StationIndex.jsx'
import { StationSideBar } from './cmps/StationSideBar.jsx'
import { SearchStation } from './cmps/SearchStation.jsx'
import { StationInfo } from './cmps/StationInfo.jsx'        
import { AudioPlayer }   from './cmps/AudioPlayer.jsx'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStations } from './store/station.actions.js'
import { StationDetails } from './cmps/StationDetails.jsx'

export function RootCmp() {

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const isStationsLoading = useSelector(storeState => storeState.stationModule.isLoading)

    useEffect(() => {               
        loadStations()} ,[]) 
    
    return (
            <main className='main-container'>
                <StationSideBar className='station-sidebar' stations={stations} isLoading={isStationsLoading} />
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
                <StationInfo className='station-info' />
                <AudioPlayer className='station-player' />
            </main>
    )
}


