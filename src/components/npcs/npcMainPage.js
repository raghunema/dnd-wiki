import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllNpcs } from '../../backendCalls/api'
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
            const npcs = await getAllNpcs({
               fields: ['slug', 'name', 'description'],
               expand: []
            })
            if (!npcs) throw new Error("NPCs not defined") 
            setNpcs(npcs)
        }

        getAndSetNPCs();
    }, [])

    const handleCardClick = (npc) => {
        //console.log(`Clicking ${npc._id}`);
        navigate(`/npcs/${npc.slug}`, { state: { _id: npc._id} });
    };
    
    if (!Npcs) return <p>Getting your beloved NPCs!</p>;

    return (
        <div className="npc-main-page">
            {Npcs.map((npc, index) => (
                <NpcCard 
                    key={index} 
                    name={npc.name}
                    description={npc.description} 
                    onClick={() => handleCardClick(npc)}
                />
            ))}
        </div>
    );
};

export default NpcMainPage;