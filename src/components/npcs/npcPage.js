import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getNpc } from '../../backendCalls/api'
import './npcPage.css'

const NpcBaseInfo = ({name, race, birthDate, deathDate}) => {
    return(
        <div className="npc-base-info">
            <table className="base-info-grid">
                <tbody>
                <tr>
                    <td className="label" >Name</td>
                    <td className="value">{name}</td>
                </tr>
                <tr>
                    <td className="label" >Race</td>
                    <td className="value">{race}</td>
                </tr>
                <tr>
                    <td className="label">DOB</td>
                    <td className="value">{birthDate.toString().substring(0,10)}</td>
                </tr>
                <tr>
                    <td className="label">DOD</td>
                    <td className="value">{deathDate.toString().substring(0,10)}</td>
                </tr>

                </tbody>
            </table>
        </div>
    )
}

const NpcNav = ({npcInfo}) => {
    const entries = Object.keys(npcInfo || {});
    entries.unshift("description")
    entries.push("events")

    return(
        <div className="npc-nav">
            <h2>Table of Contents</h2>
            <div className = "npc-nav-obj">
                {entries.map((info, index) => (
                    <div className="npc-nav-obj" id={info} key={index}>
                        <ul onClick={() => document.getElementById(info)?.scrollIntoView({behavior: 'smooth'})}>
                            {info}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

const NpcLore = ({ npcLore }) => {
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
        <div className="npc-lore">
            {Object.entries(npcLore || {}).map(([key, value]) => (
                <div className="npc-lore-obj" id={key} key={key}>
                    <h2>{key}</h2>
                    {renderObj(value)}
                </div>
            ))}
        </div>
    );
};


const NpcPage = () => {

    const react_location = useLocation();
    const npcId  = react_location.state?._id

    const [npc, setNpc] = useState(null);
    const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);

    useEffect (() => {
        console.log("Getting npc info")
        console.log(npcId)

        const getAndSetNPCs = async () => {
            const npc = await getNpc({
                fields: [],
                expand: ['events:-npcs -createdAt -updatedAt -__v'],
                _id: npcId,
                reason: 'npc_detail'
            });


            if (!npc) {
                setError("No NPC Defined"); 
                throw new Error("NPC not defined") 
            }
            setNpc(npc)
            setEvents(npc.events)
            
            console.log(npc.npcEvents)
        }
        getAndSetNPCs()
        
    }, [npcId]);

    if (error) return <p>Error: {error}</p>;
    if (!npc) return <p>Getting your beloved npc!</p>;

    return (
        <div className="npc-page">
            <div className="npc-description">
                <NpcNav npcInfo={npc.information}/>
                <NpcBaseInfo 
                    name={npc.name} 
                    race={npc.race} 
                    birthDate={npc.dateOfBirth}
                    deathDate={npc.dateOfDeath}
                />
            </div>
            <div className="npc-lore-part">
                <div className="npc-desc-obj" id="description">{npc.description}</div>
                <NpcLore npcLore={npc.information}/>
                <div className="npc-events" id="events">
                    <h1>Events</h1>
                    {events.length > 0 &&
                        events.map(event => {
                            return (
                            <div> 
                                <h2>{event.name}</h2>
                                <h3>{event.locationName}</h3>
                                <p>{event.description}</p>
                            </div>
                            )

                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default NpcPage;