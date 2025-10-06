import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getLocationInfo } from "../../../backendCalls/api";

const LocationPage = () => {

    const react_location = useLocation();
    const locId  = react_location.state?._id

    const [loc, setLoc] = useState(null);
    const [events, setEvents] = useState(null);

    useEffect(() => {

        const getAndSetLoc = async () => {
            const loc = await getLocationInfo({
                fields: [],
                expand: ['events:slug name description'],
                _id: locId
            })

            setLoc(loc)
            setEvents(loc.events)
        }

        getAndSetLoc();
        console.log()
    }, [])
    
    if (!loc) return <p>Getting Location</p>

    return (
        <div>
            <h1>{loc.name}</h1>
            <h3>{loc.description}</h3>
            <div className="loc-events" id="events">
                    <h1>Events</h1>
                    {events.length > 0 &&
                        events.map(event => {
                            return (
                                <div key={event._id}> 
                                    <h2>{event.name}</h2>
                                    <p>{event.description}</p>
                                </div>
                            )

                        })
                    }
                </div>
        </div>
    )

}

export default LocationPage;