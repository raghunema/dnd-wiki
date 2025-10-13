import { useState, useEffect } from "react";

const RelationshipItemField = (props) => {
    const { formData, onChange, schema, uiSchema, formContext } = props;

    const allNpcs = formContext?.allNpcs || [] // selectable npcs
    const [ secondaryNpc, setSecondaryNpc ] = useState(null)
    const [ relationTo, setRelationTo ] = useState("")
    const [ relationFrom, setRelationFrom ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ error, setError ] = useState(null);

    useEffect(() => {

    })

    return (
        <div className="relation-form-field-wrapper">
            <select
                value={secondaryNpc || ''}
                onChange={e => setSecondaryNpc(e.target.value)}
                style={{width: '100%'}}
            >
                <option value=""> Select Npc</option>
                {allNpcs.map(npc => (
                    <option key={npc._id} value={npc._id}>{npc.name}</option>
                ))}
            </select>
            <textarea
                value={relationFrom}
                onChange={e => setRelationFrom(e.target.value)}
                rows={1}
                style={{width: '100%', height: '40px'}}
                placeholder="Relationship From"
            ></textarea>
            <textarea
                value={relationTo}
                onChange={e => setRelationTo(e.target.value)}
                rows={1}
                style={{width: '100%', height: '40px'}}
                placeholder="Relationship To"
            ></textarea>
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={5}
                style={{width: '100%', height: '60px'}}
                placeholder="Description"
            >
            </textarea>
        </div>
    )
    
}

export default RelationshipItemField