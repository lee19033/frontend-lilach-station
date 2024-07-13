import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { youtubeService } from "../services/youtube.service";


export function SearchStation() {

    const [playlist, setPlaylist] = useState(null); 
    const location = useLocation(); // Use useLocation to get the current location object
    const [searchQuery, setSearchQuery] = useState('');

    function getSongs(playlistId) {
        youtubeService.getPlaylistItems(playlistId)
        .then(res => {
            console.log(res.data.items);
        })
        .catch(err => {
            console.log(err);
        })
    }   

    function updateStation(item) {     
        sessionStorage.setItem('playlistId', item.id.playlistId);
    }


    useEffect(() => {       
         // Parse the query string
         const searchParams = new URLSearchParams(location.search);
         const query = searchParams.get('query'); // Get the 'query' parameter
          
        const fetchData = async () => {
            try {
              const response = await youtubeService.searchPlaylist(searchQuery);  
              setPlaylist(response.data.items);
            } catch (error) {
              console.error('Error fetching videos:', error);
            }
          };
      
          fetchData();
        }, [location.search]);

        return (
            <div>
                {/* Your component JSX goes here */}
                <h1>SearchStation</h1>
                <div>
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Link to={`/search?query=${encodeURIComponent(searchQuery)}`}>Search</Link>
            </div>
                <div className="playlist-container">
                {playlist && playlist.map((item, idx) => (
                    <Link to={`/playlist/${item.id.playlistId}`} key={idx} onClick={() => updateStation(item)}>
                    <div key={idx}>
                        <h2>{item.snippet.title}</h2>
                        <img src={item.snippet.thumbnails.high.url} alt={item.snippet.title} />
                    </div>
                    </Link>
                ))}
                </div>
                
            </div>
        );
}