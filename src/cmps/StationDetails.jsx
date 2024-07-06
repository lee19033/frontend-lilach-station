/* eslint-disable react/prop-types */

import { useSelector } from 'react-redux';

export function StationDetails()  {
    const station = useSelector(storeState => storeState.stationModule.station)

        return (
            <div>
                <p>{station ? station.name : ''}</p>
                <p>{station ? station.type : ''}</p>
            </div>
        );
}
