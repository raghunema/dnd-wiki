import React from 'react'
import './eventMenu.css'

const MenuObj = ({ title }) => {
    return (
        <div className='event-menu-obj' id={title}>
            <h2 
                onClick={() => document.getElementById(title)?.scrollIntoView({behavior: 'smooth'})}
            >
                {title}
            </h2>
        </div>
    )
};

const EventMenu = ({ events }) => {
    return (
        <div className='timeline-menu'>
            {events.map((event, idx) => (
                <MenuObj key={idx} title={event.title}/>
            ))}
        </div>
    )
};

export default EventMenu;