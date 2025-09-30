import { useEffect, useState } from 'react';
import { getLocationInfo, getLocationMapInfo } from '../../backendCalls/api'
import "./location.css"


const LocationInfo = ({newLocation}) => {

    const [location, setLocation] = useState(null);


    useEffect(() => {
        const getAndSetLocation = async () => {
            const locationInfo = await getLocationMapInfo(newLocation)
            console.log(locationInfo.info)
            setLocation(locationInfo.info)
        }

        if (newLocation) {
            getAndSetLocation()
        }
        
    }, [newLocation])


    if (!location) {
        return (
            <div className="curr-location-info">
                <p>Getting Location!</p>
            </div>
        )
    }

    return (
        <div className="curr-location-info">
            <div><h3>{location.name}</h3></div>
            <div><p>{location.description}</p></div>
        </div>
    )

}

export default LocationInfo