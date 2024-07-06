import { stationService } from '../services/station.service.local'
import { store } from './store'
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, SET_STATION, UPDATE_STATION } from './station.reducer'

export async function loadStations() {
    try {
        const stations = await stationService.query()
        console.log('Station load from DB:', stations)
        store.dispatch(getCmdSetStations(stations))
    } catch (err) {
        console.log('Cannot load statitons', err)
        throw err
    }
}

export async function loadStation(stationId) {
    try {
        const station = await stationService.getById(stationId)
        console.log('Station from DB:', station)
        store.dispatch(getCmdSetStation(station))
    } catch (err) {
        console.log('Cannot load car', err)
        throw err
    }
}


export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch(getCmdRemoveStation(stationId))
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}

export async function addStation(station) {
    console.log('addStation:', station) 
    try {
        const savedStation = await stationService.createStation(station)
        console.log('Create Station', savedStation)
        store.dispatch(getCmdAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const savedStation = await stationService.save(station)
        console.log('Updated Car:', savedStation)
        store.dispatch(getCmdUpdateStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot save car', err)
        throw err
    }
}

// Command Creators:
function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations
    }
}
function getCmdSetStation(station) {
    return {
        type: SET_STATION,
        station
    }
}
function getCmdRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId
    }
}
function getCmdAddStation(station) {
    return {
        type: ADD_STATION,
        station
    }
}
function getCmdUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}


// unitTestActions()
async function unitTestActions() {
    await loadStations()
    await addStation(stationService.getEmptyStation())
    await updateStation({
        _id: 'm1oC7',
        title: 'Station-Good',
    })
    await removeStation('m1oC7')
    // TODO unit test addCarMsg
}
