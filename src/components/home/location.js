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
            {location.description}
        </div>
    )

}

export default LocationInfo