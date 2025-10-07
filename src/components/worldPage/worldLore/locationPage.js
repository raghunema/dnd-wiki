import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getLocationInfo } from "../../../backendCalls/api";
import './locationPage.css'

const LocationLore = ({ locLore }) => {
    const renderObj = (entry) => {
        if (typeof entry === 'string' || typeof entry === 'number' || typeof entry === 'boolean') {
            return <p>{String(entry)}</p>;
        } else if (Array.isArray(entry)) {
            return (
                <ul>
                    {entry.map((item, i) => (
                        <li key={i}>{renderObj(item)}</li>
                    ))}
                </ul>
            );
        } else if (typeof entry === 'object' && entry !== null) {
            return (
                <ul>
                    {Object.entries(entry).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}</strong>
                            {renderObj(value)}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return <p>{String(entry)}</p>;
        }
    };

    return (
        <div className="loc-lore">
            {Object.entries(locLore || {}).map(([key, value]) => (
                <div className="loc-lore-obj" id={key} key={key}>
                    <h2>{key}</h2>
                    {renderObj(value)}
                </div>
            ))}
        </div>
    );
};

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
        <div className="location-container">
            <h1 className="location-name">{loc.name}</h1>
            <h3 className="location-description">{loc.description}</h3>

            <LocationLore locLore={loc.information} />

            <div className="location-events" id="events">
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