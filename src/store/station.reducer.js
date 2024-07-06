export const SET_STATIONS = 'SET_STATIONS'
export const SET_STATION = 'SET_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'

const initialState = {
    stations: [],
    station: null,
    filterby: {}
}

export function stationReducer(state = initialState, action) {
    var newState = state
    var stations
    switch (action.type) {
        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break
        case SET_STATION:
            newState = { ...state, station: action.station }
            break
        case REMOVE_STATION:
            const lastRemovedStation = state.stations.find(station => (station._id === action.stationId))
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations, lastRemovedStation }
            break
        case ADD_STATION:
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case UPDATE_STATION:
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            newState = { ...state, stations }
            break
        default:
            return state
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const STATION1 = { _id: 'b101', vendor: 'STATION ' + parseInt(Math.random() * 10), msgs: [] }
    const STATION2 = { _id: 'b102', vendor: 'STATION ' + parseInt(Math.random() * 10), msgs: [] }

    state = stationReducer(state, { type: SET_STATIONS, STATIONs: [STATION1] })
    console.log('After SET_STATIONS:', state)

    state = stationReducer(state, { type: ADD_STATION, STATION: STATION2 })
    console.log('After ADD_STATION:', state)

    state = stationReducer(state, { type: UPDATE_STATION, STATION: { ...STATION2, vendor: 'Good' } })
    console.log('After UPDATE_STATION:', state)

    state = stationReducer(state, { type: REMOVE_STATION, STATIONId: STATION2._id })
    console.log('After REMOVE_STATION:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = stationReducer(state, { type: ADD_STATION_MSG, STATIONId: STATION1._id, msg })
    console.log('After ADD_STATION_MSG:', state)

    state = stationReducer(state, { type: REMOVE_STATION, STATIONId: STATION1._id })
    console.log('After REMOVE_STATION:', state)
}

