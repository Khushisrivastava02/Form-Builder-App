import { useState } from "react";
import { submitForm } from "../api/api";

const FormPreview = ({ form, onClose }: { form: any; onClose: () => void }) => {
  const [values, setValues] = useState<any>({});

  const handleChange = (label: string, value: any) => {
    setValues({ ...values, [label]: value });
  };

  const handleSubmit = async () => {
    await submitForm(form.id, values);
    alert("Form submitted!");
    onClose();
  };

  return (
    <div style={{ border: "1px solid gray", padding: "15px", marginTop: "20px" }}>
      <h2>{form.title}</h2>
      {form.fields.map((f: any, i: number) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <label>{f.label}: </label>
          {f.type === "checkbox" && (
            <input
              type="checkbox"
              onChange={(e) => handleChange(f.label, e.target.checked)}
            />
          )}
          {f.type === "radio" && (
            <div>
              <input
                type="radio"
                name={f.label}
                value="Option 1"
                onChange={(e) => handleChange(f.label, e.target.value)}
              /> Female
              <input
                type="radio"
                name={f.label}
                value="Option 2"
                onChange={(e) => handleChange(f.label, e.target.value)}
                style={{ marginLeft: "10px" }}
              /> Male
            </div>
          )}
          {f.type === "textarea" && (
            <textarea
              onChange={(e) => handleChange(f.label, e.target.value)}
            />
          )}
          {(f.type === "text" || f.type === "email") && (
            <input
              type={f.type}
              onChange={(e) => handleChange(f.label, e.target.value)}
            />
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose} style={{ marginLeft: "10px" }}>Back</button>
    </div>
  );
};

export default FormPreview;
