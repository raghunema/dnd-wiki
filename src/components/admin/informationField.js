import { useState, useEffect } from "react";

const InformationField = (props) => {
  console.log("InformationField props:", props); // Debug log
  const { formData, onChange, schema, uiSchema, name } = props;
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  // Sync incoming formData -> string
  useEffect(() => {
    if (formData !== undefined && formData !== null) {
      setText(JSON.stringify(formData, null, 2));
    } else {
      setText("");
    }
  }, [formData]);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // If empty, clear error and send undefined
    if (newText.trim() === "") {
      setError(null);
      onChange(undefined);
      return;
    }

    try {
      const parsed = JSON.parse(newText);
      setError(null);
      onChange(parsed);
    } catch (parseError) {
      setError("Invalid JSON");
      // Don't call onChange with invalid data
    }
  };

  return (
    <div className="form-field-wrapper">
      <label>{schema.title || name}</label>
      <textarea
        value={text}
        onChange={handleChange}
        rows={6}
        style={{ width: "80%", height: "200px"}}
        placeholder="Enter valid JSON..."
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default InformationField;