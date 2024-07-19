
import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { STATION_TYPE } from '../helpers/const' 

const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    createStation,
    getEmptyStation,
}
window.cs = stationService

async function query(filterBy = { txt: '', price: 0 }) {
    var stations = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.name) || regex.test(station.name))
    }
    
    // Return just preview info about the boards
    stations = stations.map(({ _id, name, songs, type, cover }) => ({ _id, name, songs, type, cover }))
    return stations
}

function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}

async function remove(stationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
    var savedStation
    if (station._id) {
        const stationToSave = {
            _id : station._id,
            name : station.name,
            type : station.type,
            tags : [],
            createdBy: {
                id: 'u101',
                fullname: 'Admin',
                imgUrl: 'https://i.pravatar.cc/150?u=admin'  
            },
            likedByUsers: [{}],
            songs: station.songs,
        }
        savedStation = await storageService.put(STORAGE_KEY, stationToSave)
    } else {
        // Later, owner is set by the backend
        const stationToSave = {
            id : station.id,
            name : station.name,
            songs: [],
        }
        savedStation = await storageService.post(STORAGE_KEY, stationToSave)
    }
    return savedStation
}

async function createStation(station) {
    console.log('createStation:', station.name)
    var savedStation
    const stationToSave = {
        _id : station._id,
        name : station.name,
        type : station.type,
        tags : [],
        createdBy: {
            id: 'u101',
            fullname: 'Admin',
            imgUrl: 'https://i.pravatar.cc/150?u=admin'  
        },
        likedByUsers: [{}],
        songs: [...station.songs],
        cover: station?.songs[0]?.snippet?.thumbnails?.default?.url
    }
    if (station.name === 'Liked Songs') {
        stationToSave.cover = 'liked-songs.jpg'
    }
    savedStation = await storageService.post(STORAGE_KEY, stationToSave)
    return savedStation
}   

async function getEmptyStation() {
    const station  = 
    { station: 
        {
            _id: utilService.makeId(), 
            name: 'Liked Songs',
            type: STATION_TYPE.LIBARY,
            tags: [],
            createdBy:{},
            likeByUsers: [{}],
            songs: [{}],
            cover: 'liked-songs.jpg'   
        }            
    }    
    return station
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))


