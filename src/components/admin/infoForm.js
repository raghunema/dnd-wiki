// src/components/EntryForm.jsx
import { useEffect, useState } from 'react';
import Form from '@rjsf/core';

import { 
  getNPCSchema, 
  getEventSchema, 
  getLocationSchema,
  getAllEvents, 
  getNpc, 
  getEvents, 
  getLocationsForm,
  postNPC,
  postEvent,
  getLocationInfo,
  getAllNpcs,
  postLocation
} from '../../backendCalls/api'

import {
  customFields, 
  uiNpcSchema,
  uiEventSchema,
  uiLocationSchema
} from './formUiSchemas'

import validator from '@rjsf/validator-ajv8';
import './infoForm.css'


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
    const events = await getAllEvents( {
      fields: ['slug', 'name'],
      expand: []
    });

    const npcs = await getAllNpcs({
      fields: ['slug', 'name',],
      expand: []
    })

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
              type: ["string"],
              enum: eventOptions,
              enumNames: eventLabels,
              uniqueItems: true
            }
          }

          if (allLocations) {
            const locationOptions = [null, ...allLocations.map(loc => loc._id)];
            const locationLabels = ["NONE", ...allLocations.map(loc => loc.name)];

            npcSchema.properties.placeOfBirth = {
              type: ["string", "null"],
              enum: locationOptions,
              enumNames: locationLabels,
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
              type: ["string", "null"],
              enum: npcOptions,
              enumNames: npcLabels,
              uniqueItems: true
            }
          }

          if (allLocations) {
            const locationOptions = [null, ...allLocations.map(loc => loc._id)];
            const locationLabels = ["NONE", ...allLocations.map(loc => loc.name)];

            eventSchema.properties.location = {
              type: ["string", "null"],
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

          if (allEvents) {
            const eventOptions = allEvents.map(npc => npc._id);
            const eventLabels = allEvents.map(npc => npc.name);

            locationSchema.properties.events.items = {
              type: "string",
              enum: eventOptions,
              enumNames: eventLabels,
              uniqueItems: true
            }
          }

          if (allLocations) {
            const locationOptions = [null, ...allLocations.map(loc => loc._id)];
            const locationLabels = ["NONE", ...allLocations.map(loc => loc.name)];

            locationSchema.properties.parentId = {
              type: ["string", "null"],
              enum: locationOptions,
              enumNames: locationLabels,
              uniqueItems: true
            }

            locationSchema.properties.children.items = {
              type: "string",
              enum: locationOptions,
              enumNames: locationLabels,
              uniqueItems: true
            }
          }


          setSchema(locationSchema)
          setUiSchema(uiLocationSchema)
          break

        default:
          setSchema(null)
      }   
    }
    getAndSetSchema()
  }, [type, allEvents, allNpcs, allLocations]);
  
  //prepops the current form if you select an existing object
  useEffect(() => {
    //console.log(`Current object: ${currObj}`)
    if (!currObj || formFunc === "ADD"){
      setFormData({});
      return;
    } else {
      setObjectPrepop()
    }

    async function setObjectPrepop () {
      try {
         switch (type) {
          case "NPC": 
            const selectedNpc = allNpcs.find(ev => ev._id === currObj);

            if (selectedNpc) {
              const npcInfo = await getNpc({
                fields: [],
                expand: [],
                _id: selectedNpc._id,
                reason: ''
              })

              //console.log(npcInfo)
              if (npcInfo) {
                setFormData(npcInfo);
              }
            }
            
          break
      
          case "EVENT":
            const selectedEvent = allEvents.find(ev => ev._id === currObj);
            if (selectedEvent) {

              const eventInfo = await getEvents({"_id": currObj})
              //console.log(eventInfo)

              if (eventInfo) {
                setFormData(eventInfo[0]);
              }
            }
          break

          case "LOCATION":
            console.log('gettign location')

            //console.log(currObj)
            const locationInfo = await getLocationInfo({
                fields: [],
                expand: [],
                _id: currObj,
              })

              //console.log(locationInfo)
              if (locationInfo) {
                setFormData(locationInfo);
              }

          break 

          default:
            setFormData({})
        }
      } catch (error) {
        console.error('Error fetching object data:', error);
        setFormData({});
      }

    }
    
  }, [currObj, allNpcs, allEvents, allLocations, type, formFunc])

  //on submit handle what happens
  const handleSubmit = async ({formData}) => {
    
    //handleing submit
    switch (type) {
      case "NPC":
        await postNPC(formData, formFunc);
        setFormData({});
        await setBaseInfo();
      break

      case "EVENT":
        await postEvent(formData, formFunc);
        setFormData({});
        await setBaseInfo();
      break
      
      case "LOCATION":
        await postLocation(formData, formFunc)
        setFormData({});
        await setBaseInfo();
      break

      default:
        console.log('Handling Sumbit')
    } 
  }

  if (!schema) return <p>Loading form...</p>;

  return (
      <div>
        <div>
            <select value={type} onChange={e => 
              {
                setType(e.target.value)
                setCurrObj(null)
                setFormData({})
              }}>
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
            formContext={{ allNpcs: allNpcs }}
            onSubmit={handleSubmit} 
            validator={validator}/>
        </div>
     </div>
    );

}
