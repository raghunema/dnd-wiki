import React from 'react'
import { useEffect, useState } from 'react';
import EventTimeline from './event/event'
import EventMenu from './eventMenu/eventMenu';

import { getEvents, getNpcsForEvents } from '../../backendCalls/api'
import './timeline.css'
import { all } from 'three/tsl';

// const events = [
//     {   
//         title: "The Connection",
//         date: "500 BC",
//         info: "The single most important event of the millennia was when the explorer Naeth Vaz and his crew, from the Northern Continent of Kiresth, departing from Baraq Peninsula, landed on the Southern Continent Kalith, on the peninsula of Shiraq. That was more than 500 years finally reuniting the two ancient lands."
//     },
//     {
//         title: "Founding of the Bronze Council",
//         date: "350 BC",
//         info: "Bronze Council is founded, once a loose assembly of tribe heads that came together in times of struggle and need, has become the leading authority figure for the entire mountain range."
//     }, 
//     {
//         title: "Desecration of Petr",
//         date: "100 BC",
//         info: "There is going to be a large-scale conflict that makes Porsithi isolationist, causing them to strictly cut and regulate trade. They decide to make and keep a lot of power. This also causes Petr to become heavily militarized but the wealthy can buy their way out."
//     },
//     {
//         title: "Isolation of Ventosa",
//         date: "80 BC",
//         info: "Reef of Ventossa retreats in response, desecrating the potential city that is the campaign is set in - no more trade."
//     },
//     {
//         title: "Session One",
//         date: "0 BC",
//         info: "A group of travelers venture into unkown territory. They land on the city of Sinnora and after a night of heavy drinking and tomfoolery, they are requested by the town's captain to help out a struggling farming family at the edge of town."
//     }
// ];

const Timeline = () => {
  const [events, setEvents] = useState([]);
  const [eventFilter, setFilter] = useState(null);
  const [npcsMap, setNpcsMap] = useState({});  // <-- object, not array

  useEffect(() => {
    const filters = {};

    const fetchEvents = async () => {
      const allEvents = await getEvents(filters);
      setEvents(allEvents);
    };

    fetchEvents();
  }, [eventFilter]);

  useEffect(() => {
    const getNpcs = async () => {
      if (events.length > 0) {
        const npcIds = [...new Set(events.flatMap(event => event.npcs))];
        const npcs = await getNpcsForEvents(npcIds);

        const npcsMap = {};
        npcs.forEach(npc => {
          npcsMap[npc._id] = npc;
        });

        setNpcsMap(npcsMap);
      }
    };

    getNpcs();
  }, [events]);

  if (events.length === 0) return <div><h1>Getting Events</h1></div>;
  if (Object.keys(npcsMap).length === 0) return <div><h1>Getting NPCs</h1></div>;

  return (
    <div className="timeline">
      <EventMenu events={events} />
      <EventTimeline events={events} npcsMap={npcsMap} />
    </div>
  );
};


export default Timeline