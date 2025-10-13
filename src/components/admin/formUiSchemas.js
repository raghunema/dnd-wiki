import InformationField from "./customFormFields/informationField";
import RelationshipItemField from "./customFormFields/relationshipField";

const customFields = {
  "information": InformationField,
  "relationshipItem": RelationshipItemField
};

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
  placeOfBirth: {
    "ui:title": "Place of Birth",
    "ui:widget": "select"
  },
  relationships: {
    "ui:title": "Related",
    items: {
        "ui:title": "relationshipItem",
        "ui:field": RelationshipItemField
    },
    "ui:options": {
      orderable: false,
    }
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
  "ui:order": ["_id", "slug", "name", "race", "description", "dateOfBirth", "dateOfDeath", "placeOfBirth", "information", "relationships", "events"]
}

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
    "ui:title": "Event Name",
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
  information: {
    "ui:title": "Information",
    "ui:field": InformationField,
  },
  location: {
    "ui:title": "Location:",
    "ui:widget": "select",
    "ui:classNames": "form-field-wrapper",
  },
  "ui:submitButtonOptions": {
    "submitText": "Submit",
    "props": {
      "className": "submit-button"
    }
  },
  "ui:order": ["_id", "slug", "name", "description", "information", "toDate", "fromDate", "npcs", "location"]
};

const uiLocationSchema = {
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
    "ui:title": "Location Name",
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
  type: {
    "ui:title": "Type", 
    "ui:widget": "textarea",
    "ui:classNames": "form-field-wrapper"
  },
  parentId: {
      "ui:title": "Parent Location:",
      "ui:widget": "select",
  },
  children: {
    "ui:title": "Sub-Locations"
  },
  "ui:submitButtonOptions": {
    "submitText": "Submit",
    "props": {
      "className": "submit-button"
    }
  },
  "ui:order": ["_id", "slug", "name", "type", "description", "parentId", "toDate", "fromDate", "placeOfBirth", "information", "events", "children"]
}

export { customFields, uiEventSchema, uiNpcSchema, uiLocationSchema };