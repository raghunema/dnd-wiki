// src/components/EntryForm.jsx
import { useEffect, useState } from 'react';
import Form from '@rjsf/core';
import { getNPCSchema, getEventSchema, getLocationSchema, getEvents} from '../../backendCalls/api'

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
    "ui:title": "Date of Birth:",
    "ui:widget": "date", 
    "ui:classNames": "form-field-wrapper",
    "ui:options": {
        yearsRange: [0, 10000],
        format: 'MDY'
    }
  },
  related: {
    "ui:title": "Related",
    "ui:className": "array-field-wrapper",
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

//const formFuncs = ['ADD', 'UPDATE', 'DELETE']

export default function EntryForm({ onCreated }) {
  const [type, setType] = useState('NPC'); //I should enumerate this or somethign
  const [schema, setSchema] = useState(null); 
  const [uiSchema, setUiSchema] = useState(uiNpcSchema)
  const [formFunc, setFormFunc] = useState('ADD') //Same with this

  const [allEvents, setAllEvents] = useState([])
  const [currEvent, setCurrEvent] = useState(null)

  //sets the actual form type
  useEffect(() => {
    async function getAndSetSchema () {
  
      switch(type) {
        case "NPC":
          const npcSchema = await getNPCSchema();
          //console.log(npcSchema)
          setSchema(npcSchema)
          setUiSchema(uiNpcSchema)
          break

        case 'EVENT': 
          const eventSchema = await getEventSchema();
          //console.log(eventSchema)
          setSchema(eventSchema)
          //setUiSchema(uiEventSchema)
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

  //sets the function type (add, update, or delete)
  useEffect(() => {
    async function setOptions () {

      if (formFunc === 'UPDATE') {
        //show update button
        // const selectOptions = document.getElementById("select-options")
        // selectOptions.style.display = "inline"

        setAllEvents([])
        //implement reset location and npcs too
        //setAllNPCS([])
        //setAllLocations([])

        switch (type) {
          case 'EVENT': 
            const events = await getEvents();
            setAllEvents(events)

            break

        }
      } else {
        //hide button
        // const selectOptions = document.getElementById("select-options")
        // if(selectOptions) selectOptions.style.display = "none";

        setAllEvents([])
        //setAllNPCS([])
        //setAllLocations([])

      }
    }

    setOptions()

  }, [formFunc, type])

  useEffect(() => {
    console.log(currEvent)
  }, [currEvent])

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
              value={currEvent || ""}
              style={{
                display: formFunc === "UPDATE" ? "inline" : "none"
              }}
              onChange={e => setCurrEvent(e.target.value)}>
              <option value=""></option>
              {allEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
            
        </div>
        
        <div className='info-form'>
          <Form schema={schema} uiSchema={uiSchema} onSubmit={handleSubmit} validator={validator}/>
        </div>
     </div>
    );

}
