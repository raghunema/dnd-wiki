import { useEffect, useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { getAllNpcs } from '../../backendCalls/api'
import  NpcPage from './npcPage'
import './npcMainPage.css'


const NpcCard = ({name, description, onClick}) => {

    return (
        <div className='npc-card' onClick={onClick}>
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    )
}

const NpcMainPage = () => {

    const [Npcs, setNpcs] = useState(null);
    const navigate = useNavigate();

    useEffect (() => {
        const getAndSetNPCs = async () => {
            const npcs = await getAllNpcs()
            if (!npcs) throw new Error("NPCs not defined") 
            setNpcs(npcs)
        }

        getAndSetNPCs();
    }, [])

    const handleCardClick = (npcSlug) => {
        console.log(`Clicking ${npcSlug}`);
        navigate(`/npcs/${npcSlug}`);
    };
    
    if (!Npcs) return <p>Getting your beloved NPCs!</p>;

    return (
        <div className="npc-main-page">
            {Npcs.map((npc, index) => (
                <NpcCard 
                    key={index} 
                    name={npc.name}
                    description={npc.description} 
                    onClick={() => handleCardClick(npc.slug)}
                />
            ))}
        </div>
    );
};

export default NpcMainPage;