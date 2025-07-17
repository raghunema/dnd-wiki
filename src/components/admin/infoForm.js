// src/components/EntryForm.jsx
import { useEffect, useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';

import { getNPCSchema } from '../../backendCalls/api'


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

  //return <></>
  return <Form schema={schema} onSubmit={handleSubmit} validator={validator}/>;

}
