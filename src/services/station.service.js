
// import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'station'

var station = {
    "_id": "5cksxjas89xjsa8xjsa8jxs09",
    "name": "Funky Monks",
    "tags": [
      "Funk",
      "Happy"
    ],
    "createdBy": {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "http://some-photo/"
    },
    "likedByUsers": ['{minimal-user}', '{minimal-user}'],
    "songs": [
      {
        "id": "s1001",
        "title": "The Meters - Cissy Strut",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedBy": '{minimal-user}',
        "likedBy": ['{minimal-user}'],
        "addedAt": 162521765262
      },
      {
        "id": "mUkfiLjooxs",
        "title": "The JB's - Pass The Peas",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedBy": {}
      },
    ]
  }

export const stationService = {
    query,
    getById,
    save,
    remove,
    createStation
}
window.ss = stationService

async function query(filterBy = { txt: '' }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    return httpService.delete(`station/${stationId}`)
}
async function save(station) {
    var savedStation
    if (station._id) {
        savedStation = await httpService.put(`station/${station._id}`, station)

    } else {
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}

function createStation(name, tags, createdBy, type) {
    return {
        name,
        tags,
        createdBy,
        songs: [],
        type
    }
}   






