
import { storageService } from './async-storage.service'

const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    createStation
}
window.cs = stationService


async function query(filterBy = { txt: '', price: 0 }) {
    var stations = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.name) || regex.test(station.name))
    }
    
    // Return just preview info about the boards
    stations = stations.map(({ _id, name, songs, type }) => ({ _id, name, songs, type }))
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
            name : station.name
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
    console.log('createStation:', name)
    var savedStation
    const stationToSave = {
        id : station.id,
        name : station.name,
        type : station.type,
        tags : [],
        createdBy: {
            _id: 'u101',
            fullname: 'Puki Ben David',
            imgUrl: 'https://i.pravatar.cc/150?u=puki'  
        },
        likedByUsers: [{}],
        songs: [{
            id: "s101",
            title:  'Song1',
            url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
            addedBy: {},
            likeBy: [{}],
            addedAt:  new Date()  
        } ,
        {
            id: "s102",
            title:  'Song2',
            url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
            addedBy: {},
            likeBy: [{}],
            addedAt:  new Date()  
        } 
        ],
    }
    savedStation = await storageService.post(STORAGE_KEY, stationToSave)
    return savedStation
}   



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))


