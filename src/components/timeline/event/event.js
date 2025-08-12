import { React } from "react";
import { Link } from 'react-router-dom'

import './event.css'

const Event = ({event, npcsMap}) => {
    return (
        <div className="event">
            <div className="dot-line">
                <div className="dot"></div>
                {/* {!isLast && <div className="line"></div>} */}
            </div>
            <div id={event.name} className="event-info">
                <h1>{event.name}</h1>
                <h2 className="event-date"> {event.fromDate} - {event.toDate}</h2>
                {event.location && <h3>{event.location}</h3>}
                <h2>{event.description}</h2>
                <div className="event-npcs">
                    {(event.npcs.length > 0) && <h2>Npcs</h2>}
                    {(event.npcs.length > 0) && 
                        event.npcs.map(npcId => {
                            const npc = npcsMap[npcId];
                            console.log(npc);
                            return (
                            <Link to={`/npcs/${npc.slug}`}>
                                <h3 key={npc.slug}>{npc.name} </h3>
                            </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const EventTimeline = ({ events, npcsMap }) => {
    return (
        <div className='event-timeline'>
            {events.map((event, idx) => (
                <Event key={idx} event={event} npcsMap={npcsMap}/>
            ))}
        </div>
    )
}

export default EventTimeline;