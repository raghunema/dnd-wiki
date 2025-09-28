import { React } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import './event.css'

const Event = ({event}) => {
    const navigate = useNavigate();

    const handleCardClick = (slug, id) => {
        navigate(`/npcs/${slug}`, { state: { _id: id} });
    };

    console.log(event)

    return (
        <div className="event">
            
            <div className="dot-line">
                <div className="dot"></div>
            </div>

            <div id={event._id} className="event-info">

                <h1>{event.name}</h1>
                <h2 className="event-date"> {event.fromDate.toString().substring(0,10)}  to  {event.toDate.toString().substring(0,10)}</h2>

                {event.location && <h3>{event.location.name}</h3>}
                
                <h2>{event.description}</h2>


                <div className="event-npcs">
                    {(event.npcs.length > 0) && <h2>Npcs</h2>}
                    {(event.npcs.length > 0) && 
                        event.npcs.map(npc => {
                            return (
                                <h3
                                 key={npc._id}
                                 onClick={() => handleCardClick(npc.slug, npc._id)}
                                > {npc.name} </h3>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const EventTimeline = ({ events }) => {

    console.log(events)
    // console.log(npcsMap)

    return (
        <div className='event-timeline'>
            {events.map((event, idx) => (
                <Event key={idx} event={event}/>
            ))}
        </div>
    )
}

export default EventTimeline;