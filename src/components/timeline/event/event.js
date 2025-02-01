import React from "react";
import './event.css'

const Event = ({title, info, date, isLast}) => {
    return (
        <div className="event">
            <div className="dot-line">
                <div className="dot"></div>
                {/* {!isLast && <div className="line"></div>} */}
            </div>
            <div id={title} className="event-info">
                <h1> <span className="event-date">{date}</span> ~ {title}</h1>
                <h3>{info}</h3>
            </div>
        </div>
    )
}

const EventTimeline = ({ events }) => {
    return (
        <div className='event-timeline'>
            {events.map((event, idx) => (
                <Event key={idx} title={event.title} info={event.info} date={event.date} isLast={idx === events.length - 1}/>
            ))}
        </div>
    )
}

export default EventTimeline;