import axios from 'axios';

const apiUrl_search = 'https://www.googleapis.com/youtube/v3/search';
const apiUrl_playlist_items = 'https://www.googleapis.com/youtube/v3/playlistItems';

export const youtubeService = {
    searchPlaylist,
    getPlaylistItems
}

function searchPlaylist(query) { 
     return axios.get(apiUrl_search, {
        params: {
            part: 'snippet',
            type: 'playlist',
            q: query,
            key: import.meta.env.VITE_API_KEY,  
        },
    });
}   

function getPlaylistItems(playlistId) {
    return axios.get(apiUrl_playlist_items, {
        params: {
            part: 'snippet',
            playlistId,
            key: import.meta.env.VITE_API_KEY,
            maxResults: 20
        },
    });
}   

