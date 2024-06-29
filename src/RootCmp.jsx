
import {  Routes, Route } from 'react-router'

import { StationIndex} from './pages/StationIndex.jsx'
import { StationSideBar } from './cmps/StationSideBar.jsx'
import { SearchStation } from './cmps/SearchStation.jsx'
import { CollectionDetails } from './cmps/CollectionDetails.jsx'   
import { AlbumDetails } from './cmps/AlbumDetails.jsx' 
import { PlaylistDetails } from './cmps/PlaylistDetails.jsx'    
import { StationInfo } from './cmps/StationInfo.jsx'        
import { AudioPlayer }   from './cmps/AudioPlayer.jsx'

export function RootCmp() {
    return (
            <main className='main-container'>
                <StationSideBar className='station-sidebar'/>
                <section className='station-main'>
                <Routes>
                        <Route path="" element={<StationIndex />} />
                        <Route path="/search" element= {<SearchStation />} />
                        <Route path="collection/:id" element= {<CollectionDetails />} />
                        <Route path="album/:id" element= {<AlbumDetails />} />
                        <Route path="playlist/:id" element= {<PlaylistDetails />} />
                </Routes>
                </section>
                <StationInfo className='station-info' />
                <AudioPlayer className='station-player' />
            </main>
    )
}


