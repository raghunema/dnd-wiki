import { useEffect, useState, useRef} from 'react';
import { getRelations } from '../../../backendCalls/api';
import * as d3 from "d3"

const RelationGraph = () => {
    
    const svgRef = useRef();
    
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


    function forcePlot({
        data, 
        width =  640,
        height = 400,
        marginTop = 20,
        marginRight = 20,
        marginBottom = 20,
        marginLeft = 20
    }) {

    }

    return (
        <div>
            <h1>In Relation Graph</h1>
        </div>
    )

}

export default RelationGraph