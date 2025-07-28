import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getNpc } from '../../backendCalls/api'
import './npcPage.css'

const NpcBaseInfo = ({name, race, birthDate}) => {
    return(
        <div className="npc-base-info">
            <table className="base-info-grid">
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
                    <td className="value">{birthDate}</td>
                </tr>
            </table>
        </div>
    )
}

const NpcNav = ({npcInfo}) => {
    const entries = Object.keys(npcInfo || {});

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

// const NpcLore = ({npcLore}) => {
//     const entries = Object.keys(npcLore || {});

//     const renderObj = (entry) => {
//         if (typeof entry === 'string') {
//             return(<p>{String(entry)}</p>)
//         } else if (typeof entry === 'object') {
//             return (
//                 <ul>
//                     {Object.entries(entry).map(([key, value]) => {
//                         <div key={key}>
//                             <h1>{key}</h1>
//                             {renderObj(value)}
//                         </div>
//                     })}
//                 </ul>   
//             )
//         }
//     }

//     return (
//         <div className = "npc-lore">
//             {Object.entries(npcLore).map(([key, value]) => {
//                 <div id={key} key={key}>
//                     <h1>{key}</h1>
//                     {renderObj(value)}
//                 </div>
//             })}
//         </div>
//     )
// }

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

    const { npcSlug } = useParams();
    const [npc, setNpc] = useState(null);
    const [error, setError] = useState(null);

    useEffect (() => {
        console.log("Getting npc info")

        const getAndSetNPCs = async () => {
            const npc = await getNpc(npcSlug);
            if (!npc) {
                setError("No NPC Defined"); 
                throw new Error("NPC not defined") 
            }
            setNpc(npc)
            console.log(npc.information)
        }
        getAndSetNPCs()
        
    }, [npcSlug]);

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
                />
            </div>
            <div className="npc-lore-part">
                <NpcLore npcLore={npc.information}/>
            </div>
        </div>
    )
}

export default NpcPage;