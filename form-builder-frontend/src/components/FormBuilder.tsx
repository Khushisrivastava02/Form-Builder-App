import { useState } from "react";
import { createForm } from "../api/api";

const FormBuilder = ({ onFormCreated }: { onFormCreated: () => void }) => {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState<{ type: string; label: string }[]>([]);

  const addField = (type: string) => {
    setFields([...fields, { type, label: `${type} field` }]);
  };

  const saveForm = async () => {
    if (!title) {
      alert("Please add a form title");
      return;
    }
    await createForm({
      title,
      fields,
      status: "draft",
      date: new Date().toISOString(),
    });
    alert("Form saved!");
    setTitle("");
    setFields([]);
    onFormCreated();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
      <h2>Create New Form</h2>
      <input
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: "10px", display: "block" }}
      />
      <div>
        <button onClick={() => addField("text")}>+ Text</button>
        <button onClick={() => addField("email")}>+ Email</button>
        <button onClick={() => addField("checkbox")}>+ Checkbox</button>
      </div>
      <ul>
        {fields.map((f, i) => (
          <li key={i}>{f.label} ({f.type})</li>
        ))}
      </ul>
      <button onClick={saveForm}>Save Form</button>
    </div>
  );
};

export default FormBuilder;
