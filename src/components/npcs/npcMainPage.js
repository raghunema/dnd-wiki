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
    const [SearchTerm, setSearchTerm] = useState('')
    const [FilteredNpcs, setFilteredNpcs] = useState(null)
    const navigate = useNavigate();

    useEffect (() => {
        const getAndSetNPCs = async () => {
            const npcs = await getAllNpcs({
               fields: ['slug', 'name', 'description'],
               expand: []
            })
            if (!npcs) throw new Error("NPCs not defined") 
            setNpcs(npcs)
            setFilteredNpcs(npcs)
        }

        getAndSetNPCs();
    }, [])


    useEffect(() => {

        if (Npcs) {
            const filteredNpcs = Npcs.filter(npc => {
                return npc.name.toLowerCase().includes(SearchTerm.toLowerCase()) ||
                npc.description.toLowerCase().includes(SearchTerm.toLowerCase())
            })

            setFilteredNpcs(filteredNpcs)
        }
        
    }, [Npcs, SearchTerm])




    const handleCardClick = (npc) => {
        //console.log(`Clicking ${npc._id}`);
        navigate(`/npcs/${npc.slug}`, { state: { _id: npc._id} });
    };
    
    const handleGraphClick = () => {
        navigate(`/npcs/graph`)
    }

    if (!Npcs) return <p>Getting your beloved NPCs!</p>;

    return (
        <div >
            <div className='npc-graph-button'>
                <button
                    onClick={() => handleGraphClick()}
                >
                    Check out the graph!
                </button>
            </div>

            <div className="npc-search-field">
                <input
                    type='text'
                    value={SearchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search an Npc...'
                />
            </div>

            <div className="npc-main-page"> 
                {FilteredNpcs.map((npc, index) => (
                    <NpcCard 
                        key={index} 
                        name={npc.name}
                        description={npc.description} 
                        onClick={() => handleCardClick(npc)}
                    />
                ))}
             </div>
        </div>
    );
};

export default NpcMainPage;