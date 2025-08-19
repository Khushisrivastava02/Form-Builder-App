import { useEffect, useState } from "react";
import { getForms, deleteForm } from "../api/api";

const Dashboard = ({ onSelect, onAnalytics }: { onSelect: (form: any) => void; onAnalytics: (id: string) => void }) => {
  const [forms, setForms] = useState<any[]>([]);

  const fetchForms = async () => {
    const res = await getForms();
    setForms(res.data as any[]);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;
    await deleteForm(id);
    fetchForms();
  };

  return (
    <div className="card">
      <h2>Saved Forms</h2>
      {forms.length === 0 ? (
        <p>No forms created yet.</p>
      ) : (
        <ul>
          {forms.map((form) => (
            <li key={form.id}>
              <strong>{form.title}</strong> ({form.status})
              <div style={{ display: "inline-block", marginLeft: "15px" }}>
                <button onClick={() => onSelect(form)}>Open</button>
                <button
                  onClick={() => handleDelete(form.id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
                <button
                  onClick={() => onAnalytics(form.id)}
                  style={{ marginLeft: "10px", backgroundColor: "#27ae60", color: "white" }}
                >
                  Analytics
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
