import { useEffect, useState } from 'react';
import { getRelations } from '../../../backendCalls/api';


const RelationGraph = () => {
    
    const [allRelations, setAllRelations] = useState([])

    //on hook
    useEffect (() => {
        const getAndSetAllRelations = async () => {
            try {
                const relations = await getRelations();
                setAllRelations(relations);

                console.log(relations);
            } catch (err) {
                throw new err; 
            }
        }

        getAndSetAllRelations();

    }, []);

    return (
        <div>
            <h1>In Relation Graph</h1>
        </div>
    )

}

export default RelationGraph