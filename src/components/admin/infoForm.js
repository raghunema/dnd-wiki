// src/components/EntryForm.jsx
import { useEffect, useState } from 'react';
import Form from '@rjsf/core';
import { getNPCSchema, getEventSchema, getLocationSchema, getEventsForm, getNpc, getAllNpcsForm, getEvents} from '../../backendCalls/api'

import validator from '@rjsf/validator-ajv8';

import './infoForm.css'

const uiNpcSchema = {
  slug: {
    "ui:title": "SLUG",
    "ui:widget": "textarea", 
    "ui:classNames": "form-field-wrapper"
  },
  name: {
    "ui:title": "NPC Name",
    "ui:widget": "textarea", 
    "ui:classNames": "form-field-wrapper"
  },
  description: {
    "ui:title": "Description",
    "ui:widget": "textarea", 
    "ui:classNames": "form-field-wrapper"
  },
  race: {
    "ui:title": "Race",
    "ui:widget": "textarea", 
    "ui:classNames": "form-field-wrapper"
  },
  dateOfBirth: {
    "ui:title": "Date of Birth:",
    "ui:widget": "date", 
    "ui:classNames": "form-field-wrapper",
    "ui:options": {
        yearsRange: [0, 10000],
        format: 'MDY'
    }
  },
  dateOfDeath: {
    "ui:title": "Date of Death:",
    "ui:widget": "date", 
    "ui:classNames": "form-field-wrapper",
    "ui:options": {
        yearsRange: [0, 10000],
        format: 'MDY'
    }
  },
  information: {
    "ui:title": "Information",
    //"ui:className": "array-field-wrapper",
    "ui:options": {
      "addable": true,
      "orderable": true, 
      "removable": true,
      "addLabel": "Add Related"
    },
    "items": {
      "ui:classNames": "array-item",  // Style for each array item
      "ui:defaultValue": "",
      "ui:title": "Item"
    }
  },

  "ui:submitButtonOptions": {
    "submitText": "Submit",
    "props": {
      "className": "submit-button"
    }
  }
}

const uiEventSchema = {
  slug: {
    "ui:title": "SLUG",
    "ui:widget": "textarea", 
    "ui:classNames": "form-field-wrapper"
  },
  name: {
    "ui:title": "NPC Name",
    "ui:widget": "textarea", 
    "ui:classNames": "form-field-wrapper"
  },
  description: {
    "ui:title": "Description",
    "ui:widget": "textarea", 
    "ui:classNames": "form-field-wrapper"
  },
  fromDate: {
    "ui:title": "From Date:",
    "ui:widget": "date-time", 
    "ui:classNames": "form-field-wrapper",
    "ui:options": {
        yearsRange: [0, 10000]
    }
  },
  toDate: {
    "ui:title": "To Date:",
    "ui:widget": "date-time", 
    "ui:classNames": "form-field-wrapper",
    "ui:options": {
        yearsRange: [0, 100000]
    }
  },
  npcs: {
    items: {
      "ui:widget": "select"
    }
  }
};
//const formFuncs = ['ADD', 'UPDATE', 'DELETE']

export default function EntryForm({ onCreated }) {
  const [type, setType] = useState('NPC'); //I should enumerate this or somethign
  const [schema, setSchema] = useState(null); 
  const [uiSchema, setUiSchema] = useState(null)
  const [formFunc, setFormFunc] = useState('ADD') //Same with this

  //information
  const [allEvents, setAllEvents] = useState([])
  const [allNpcs, setAllNPCS] = useState([])
  const [allLocations, setAllLocations] = useState([])

  //current for object
  const [currObj, setCurrObj] = useState(null)
  const [formData, setFormData] = useState(null)

  //for form ui shit
  // const [npcOptions, setNpcOptions] = useState(null)

  //on mount
  useEffect(() => {

    async function setBaseInfo() {
      const events = await getEventsForm();
      const npcs = await getAllNpcsForm()

      setAllEvents(events)
      setAllNPCS(npcs)
    
    }

    setBaseInfo()  
  }, [])
  
  //sets the actual form type when you switch events
  useEffect(() => {
    async function getAndSetSchema () {
      //gets and sets information for  
      switch(type) {
        case "NPC":
          const npcSchema = await getNPCSchema();

          if (allEvents) {
            const eventOptions = allEvents.map(npc => npc._id);
            const eventLabels = allEvents.map(npc => npc.name);

            npcSchema.properties.events.items = {
              type: "string",
              enum: eventOptions,
              enumNames: eventLabels,
              uniqueItems: true
            }
          }

          setSchema(npcSchema)
          setUiSchema(uiNpcSchema)
          break

        case 'EVENT': 
          const eventSchema = await getEventSchema();

          if (allNpcs) {
            const npcOptions = allNpcs.map(npc => npc._id);
            const npcLabels = allNpcs.map(npc => npc.name);

            eventSchema.properties.npcs.items = {
              type: "string",
              enum: npcOptions,
              enumNames: npcLabels,
              uniqueItems: true
            }
          }

          setSchema(eventSchema)
          setUiSchema(uiEventSchema)
          break

        case 'LOCATION': 
          const locationSchema = await getLocationSchema();
          //console.log(locationSchema)
          setSchema(locationSchema)
          //setUiSchema(uiEventSchema)
          break

        default:
          setSchema(null)

      }   
    }
    getAndSetSchema()
    //console.log(schema)
  }, [type]);
  
  //prepops the current form if you select an existing object
  useEffect(() => {
    console.log(`Current object: ${currObj}`)
    if (!currObj){
      setFormData({});
      return;
    } else {
      setObjectPrepop()
    }

    async function setObjectPrepop () {
      switch (type) {
      case "NPC": 
        const selectedNpc = allNpcs.find(ev => ev._id === currObj);
        //console.log(`selectedNPC: ${selectedNpc.slug}`)

        if (selectedNpc) {
          const npcInfo = await getNpc(selectedNpc.slug)
          //console.log(npcInfo)
          if (npcInfo) {
            setFormData(npcInfo.npcInfo);
          }
        }
        
        break
      
      case "EVENT":
        const selectedEvent = allEvents.find(ev => ev._id === currObj);

        if (selectedEvent) {

          const eventInfo = await getEvents({"_id": currObj})
          console.log(eventInfo)

          if (eventInfo) {
            setFormData(eventInfo[0]);
          }
        }

        break

      default:
        setFormData({})
      }
    }
    
    
  }, [currObj, allNpcs, allEvents, type])

  const handleSubmit = async ({formData}) => {
    console.log('Submitted:', formData);
  }

  if (!schema) return <p>Loading form...</p>;

  return (
      <div>
        <div>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value=""></option>
              <option value="NPC">NPC</option>
              <option value="EVENT">Event</option>
              <option value="LOCATION">Location</option>
            </select>
            <select value={formFunc} onChange={e => setFormFunc(e.target.value)}>
              <option value=""></option>
              <option value="ADD">ADD</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
            </select>

            <select 
              id='select-options' 
              value={currObj || ""}
              style={{
                display: formFunc === "UPDATE" || formFunc === "DELETE" ? "inline" : "none"
              }}
              onChange={e => setCurrObj(e.target.value)}
              >
              <option value=""></option>

              {type === 'EVENT' && 
                  allEvents.map((event) => (
                    <option key={event.id} value={event._id}>
                      {event.name}
                    </option>
                  ))
              }

              {type === 'NPC' && 
                  allNpcs.map((event) => (
                    <option key={event.id} value={event._id}>
                      {event.name}
                    </option>
                  ))
              }
            </select>
            
        </div>
        
        <div className='info-form'>
          <Form schema={schema} 
            uiSchema={uiSchema} 
            formData={formData}  
            onChange={({ formData }) => setFormData(formData)} 
            onSubmit={handleSubmit} 
            validator={validator}/>
        </div>
     </div>
    );

}
