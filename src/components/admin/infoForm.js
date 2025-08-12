// src/components/EntryForm.jsx
import { useEffect, useState } from 'react';
import Form from '@rjsf/core';
import { getNPCSchema } from '../../backendCalls/api'
import validator from '@rjsf/validator-ajv8';

import './infoForm.css'

const uiSchema = {
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

export default function EntryForm({ onCreated }) {
  const [type, setType] = useState('NPC');
  const [schema, setSchema] = useState(null);
  //const [error, setError] = useState('');

  useEffect(() => {

    async function getAndSetSchema () {
      if (type === 'NPC') {
        const newSchema = await getNPCSchema();
        console.log(newSchema)

        setSchema(newSchema)
      }
    }

    getAndSetSchema()
    console.log(schema)

  }, [type]);

  const handleSubmit = async ({formData}) => {
    console.log('Submitted:', formData);
  }

  if (!schema) return <p>Loading form...</p>;

  return (
    <div className='info-form'>
      <Form schema={schema} uiSchema={uiSchema} onSubmit={handleSubmit} validator={validator}/>
    </div>
    );

}
