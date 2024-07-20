/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // Step 1: Import useLocation
import { youtubeService } from '../services/youtube.service';
import { addStation, setVideo, updateStation } from '../store/station.actions';
import { SongList } from './SongList';
import { stationService } from '../services/station.service.local';
import { STATION_TYPE } from '../helpers/const';  
import { utilService } from '../services/util.service';
import likedSongs from '../assets/img/liked-songs.jpg'  

export function StationDetails() {
    const station = useSelector(storeState => storeState.stationModule.station);
    const likedStation = useSelector(storeState => storeState.stationModule.stations.filter(station => station.name === 'Liked Songs'));
    const location = useLocation(); // Step 2: Use useLocation to get the current location object
    const queryParams = new URLSearchParams(location.search); // Step 3: Parse the query string
    // Convert queryParams to an array and get the last parameter
    const paramsArray = Array.from(queryParams.entries());
    const lastParam = paramsArray.length > 0 ? paramsArray[paramsArray.length - 1] : null;
    const lastParamValue = lastParam ? lastParam[1] : 'No last parameter in query';

  const [lastPart, setLastPart] = useState(null);
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    if (location) {
      const tmp = location.pathname.slice(
        location.pathname.lastIndexOf("/") + 1
      );
      setLastPart(tmp);
      console.log('fetching songs',tmp)

      const fetchSongsData = async () => {
        try {
          const response = await youtubeService.getPlaylistItems(lastPart);  
          setSongs(response.data.items);
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      };
  
      // Fetch songs
      if (station && station.songs) {
        setSongs(station.songs)
        console.log('station songs',station.songs)
      }
      else if (lastPart) {
        fetchSongsData();
      }
      

      
      //search 

      
    }
  }, [location, lastPart, station]);

  function addToLikeSongs(song) { 
      // Add the song to the liked songs station
      //updateStation({ ...station, songs: [...station.songs, song] });
      if (!likedStation) return 
      // Clone the likedStation and add the new song to the songs array
    const updatedStation = {
      ...likedStation[0], // Assuming likedStation is an array of stations
      songs: [...likedStation[0].songs, song],
    };
    // Update the station with the new list of songs
    updateStation(updatedStation);
  }

  function addToPlaylist(station, song) {  
    if (!station) {
      //cretae new station with song 
      const newStation = {
        id: utilService.makeId(), 
        name: song.snippet.title,
        type: STATION_TYPE.PLAYLIST,
        tags: [],
        createdBy:{},
        likeByUsers: [{}],
        songs: [song],
        cover: song.snippet.thumbnails.default.url,
        high: song.snippet.thumbnails.high.url    
      }
      addStation(newStation);
    }
      else {
        // Clone the station and add the new song to the songs array
        const updatedStation = {
          ...station,
          songs: [...station.songs, song],
        };
        // Update the station with the new list of songs
        updateStation(updatedStation);
      }

    }

    return (
        <div className='station-details'>
          <div className='station-details-header'>
          {station && 
            (station?.cover==='liked-songs.jpg') 
            ?   
              <img src={likedSongs} alt={station?.name} className="station-cover-image liked" />
              : <img src={station?.cover} alt={station?.name} className="station-cover-image" />
          
        }
                
            <div className="staion-details-info">
              <p className="station-type">{station?.type}</p>
              <span className="station-name">{station?.name?.substring(0,10)}</span>
              <p className="station-type">{station?.name}</p>
                
            </div>
            </div>
            <div className="station-details-actions"> 
            <span className="material-symbols-outlined station-action">
                play_circle
                </span>
            </div>

            {songs && <SongList songs={songs} onPlay={setVideo} addToLikeSongs={addToLikeSongs} addToPlaylist={addToPlaylist} />}
        </div>
    );
}
    
