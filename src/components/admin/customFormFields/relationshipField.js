import { useState, useEffect } from "react";

const RelationshipItemField = (props) => {
    const { formData, onChange, schema, uiSchema, formContext } = props;

    const allNpcs = formContext?.allNpcs || [] // selectable npcs
    const currNpc = formContext?._id //current Npc

    const [ isNpcA, setIsNpcA ] = useState(true) //if its a new relationship then we assume we are npcA
    const [ secondaryNpc, setSecondaryNpc ] = useState(null)
    const [ relationTo, setRelationTo ] = useState("")
    const [ relationFrom, setRelationFrom ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ strength, setStrength ] = useState(0);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if (formData?.relationshipId?._id) {
            //for each item in relationship - how to set that item
            const isA = formData?.relationshipIndex === 'npcA'
            setIsNpcA(isA)

            if (isA) {
                setSecondaryNpc(formData.relationshipId.npcB)
                setRelationTo(formData.relationshipId.relAtoB)
                setRelationFrom(formData.relationshipId.relBtoA)
            } else {
                setSecondaryNpc(formData.relationshipId.npcA)
                setRelationTo(formData.relationshipId.relBtoA)
                setRelationFrom(formData.relationshipId.relAtoB)
            }
            
            setDescription(formData.relationshipId.description)
            setStrength(formData.relationshipId.strength)
        } else if (formData?.relationshipId && !formData.relationshipId.npcA) { // a whole new relationship
            console.log('no npc form data')
            onChange({
                relationshipId: {
                    npcA: currNpc,
                    relAtoB: "",
                    npcB: "",
                    relBtoA: "",
                    description: "",
                    strength: 0
                },
                relationshipIndex: "npcA"
            });
        }
    }, [formData?.relationshipId?._id])

    const handleUpdate = (field, value) => {
        const updateData = {
            ...formData, //copy over the item
            relationshipId: { //this overwrites our relationshipId info
                ...formData.relationshipId,
                [field]: value //overwrite our specific field
            }
        }
        onChange(updateData)
    }
    
    const handleSecondaryNpcChange = (e) => {
        const value = e.target.value;
        setSecondaryNpc(value);

        if (isNpcA) {
            //if i am npc A, i am changing npc B
            handleUpdate('npcB', value)
        } else {
            //if i am npc B, i am changing npc A
            handleUpdate('npcA', value)
        }
    }

    const handleRelationFromChange = (e) => {
        const value = e.target.value;
        setRelationFrom(value)

        if (isNpcA) {
            //if i am npc A, i am changing npc B
            handleUpdate('relBtoA', value)
        } else {
            //if i am npc B, i am changing npc A
            handleUpdate('relAtoB', value)
        }
    }

    const handleRelationToChange = (e) => {
        const value = e.target.value;
        setRelationTo(value)

        if (isNpcA) {
            //if i am npc A, change relationship a to b
            handleUpdate('relAtoB', value)
        } else {
            //if i am npc B, i am change relationship b to a
            handleUpdate('relBtoA', value)
        }
    }

    const handleDescrptionChannge = (e) => {
        const value = e.target.value

        setDescription(value)
        handleUpdate('description', value)
    }

    const handleStrengthChange = (e) => {
        const value = e.target.value

        setStrength(value)
        handleUpdate('strength', value)
    }

    return (
        <div className="relation-form-field-wrapper">
            <select
                value={secondaryNpc || ''}
                onChange={handleSecondaryNpcChange}
                style={{width: '100%'}}
            >
                <option value=""> Select Npc</option>
                {allNpcs.map(npc => (
                    <option key={npc._id} value={npc._id}>{npc.name}</option>
                ))}
            </select>
            <textarea
                value={relationFrom}
                onChange={handleRelationFromChange}
                rows={1}
                style={{width: '100%', height: '40px'}}
                placeholder="Relationship From"
            ></textarea>
            <textarea
                value={relationTo}
                onChange={handleRelationToChange}
                rows={1}
                style={{width: '100%', height: '40px'}}
                placeholder="Relationship To"
            ></textarea>
            <textarea
                value={description}
                onChange={handleDescrptionChannge}
                rows={5}
                style={{width: '100%', height: '60px'}}
                placeholder="Description"
            >
            </textarea>
            <textarea
                value={strength}
                onChange={handleStrengthChange}
                rows={1}
                style={{width: '30%', height: '20px'}}
                placeholder="Relationship Strength"
            >
            </textarea>
        </div>
    )
    
}

export default RelationshipItemField