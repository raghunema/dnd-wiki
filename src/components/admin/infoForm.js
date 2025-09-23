// src/components/EntryForm.jsx
import { useEffect, useState } from 'react';
import Form from '@rjsf/core';
import InformationField from "./informationField";

import { getNPCSchema, 
  getEventSchema, 
  getLocationSchema,
  getEventsForm, 
  getNpc, 
  getAllNpcsForm, 
  getEvents, 
  getLocationsForm,
  postNPC
} from '../../backendCalls/api'

import validator from '@rjsf/validator-ajv8';

import './infoForm.css'

const uiNpcSchema = {
  _id: {
    "ui:title": "Id",
    "ui:widget": "textarea", 
    "ui:classNames": "form-field-wrapper",
    "ui:readonly": "true",
    "ui:options": {
      "readonly": "true"
    }
  },
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
    "ui:widget": "date-time", 
    "ui:classNames": "form-field-wrapper",
    "ui:options": {
        yearsRange: [0, 10000],
        format: 'MDY'
    }
  },
  dateOfDeath: {
    "ui:title": "Date of Death:",
    "ui:widget": "date-time", 
    "ui:classNames": "form-field-wrapper",
    "ui:options": {
        yearsRange: [0, 10000],
        format: 'MDY'
    }
  },
  related: {
    "ui:title": "Related"
  },
  information: {
    "ui:title": "Information",
    "ui:field": InformationField,
  },
  events: {
    "ui:title": "Events",
    "ui:options": {
      orderable: false,
    },
  },
  "ui:submitButtonOptions": {
    "submitText": "Submit",
    "props": {
      "className": "submit-button"
    }
  },
  "ui:order": ["_id", "slug", "name", "race", "description", "dateOfBirth", "dateOfDeath", "related", "information", "events"]
}

const customFields = {
  "information": InformationField
};

const uiEventSchema = {
  _id: {
    "ui:title": "Id",
    "ui:widget": "textarea", 
    "ui:classNames": "form-field-wrapper",
    "ui:readonly": "true",
    "ui:options": {
      "readonly": "true"
    }
  },
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
    "ui:title": "NPCS",
    items: {
      "ui:widget": "select"
    },
    "ui:options": {
      orderable: false,
    },
  },
  location: {
    "ui:title": "Location:",
    "ui:widget": "select"
  },
  "ui:submitButtonOptions": {
    "submitText": "Submit",
    "props": {
      "className": "submit-button"
    }
  },
  "ui:order": ["_id", "slug", "name", "description", "information", "toDate", "fromDate", "npcs", "location"]
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

  async function setBaseInfo() {
    const events = await getEventsForm();
    const npcs = await getAllNpcsForm()
    const locations = await getLocationsForm();

    setAllEvents(events)
    setAllNPCS(npcs)
    setAllLocations(locations)
  }

  //on mount
  useEffect(() => {
    setBaseInfo();
  }, [])
  
  //sets the actual form type when you switch events
  useEffect(() => {
    async function getAndSetSchema () {
      //gets and sets information for  
      switch(type) {
        case "NPC":
          const npcSchema = await getNPCSchema();
          //console.log(npcSchema)

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

          if (allLocations) {
            const locationOptions = allLocations.map(loc => loc._id);
            const locationLabels = allLocations.map(loc => loc.name);

            eventSchema.properties.location = {
              type: "string",
              enum: locationOptions,
              enumNames: locationLabels,
              uniqueItems: true
            }

          }

          setSchema(eventSchema)
          setUiSchema(uiEventSchema)
          break

        case 'LOCATION': 
          const locationSchema = await getLocationSchema();
          setSchema(locationSchema)

          //setUiSchema(uiEventSchema)
          break

        default:
          setSchema(null)
      }   
    }
    getAndSetSchema()
  }, [type, allEvents, allNpcs, allLocations]);
  
  //prepops the current form if you select an existing object
  useEffect(() => {
    console.log(`Current object: ${currObj}`)
    if (!currObj || formFunc === "ADD"){
      setFormData({});
      return;
    } else {
      setObjectPrepop()
    }

    async function setObjectPrepop () {
      switch (type) {
      case "NPC": 
        const selectedNpc = allNpcs.find(ev => ev._id === currObj);

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
    
    
  }, [currObj, allNpcs, allEvents, allLocations, type, formFunc])

  //on submit handle what happens
  const handleSubmit = async ({formData}) => {
    //handle add
    if (formFunc === 'ADD') {
      switch (type) {
        case "NPC":
          console.log('Adding NPC!')
          console.log(formData)

          await postNPC(formData, formFunc);
          await setBaseInfo();
          break
      }
    } else if (formFunc === 'UPDATE') {
      switch (type) {
        case "NPC":
          console.log('Updating NPC!')
          console.log(formData)

          await postNPC(formData, formFunc);
          await setBaseInfo();
          break
      }
    }

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
                    <option key={event._id} value={event._id}>
                      {event.name}
                    </option>
                  ))
              }

              {type === 'NPC' && 
                  allNpcs.map((npc) => (
                    <option key={npc._id} value={npc._id}>
                      {npc.name}
                    </option>
                  ))
              }

              {type === 'LOCATION' && 
                  allLocations.map((loc) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.name}
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
            fields={customFields} 
            onSubmit={handleSubmit} 
            validator={validator}/>
        </div>
     </div>
    );

}
