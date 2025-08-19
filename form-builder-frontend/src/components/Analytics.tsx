import { useEffect, useState } from "react";
import { getSubmissions } from "../api/api";
import { CSVLink } from "react-csv";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Analytics = ({ formId, onBack }: { formId: string; onBack: () => void }) => {
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    getSubmissions(formId).then((res) => setSubmissions(res.data as any[]));
  }, [formId]); // ✅ close useEffect properly

  const chartData = [
    { name: "Submissions", count: submissions.length }
  ];

  return (
    <div className="card">
      <h2>Form Analytics</h2>
      <p><strong>Total Submissions:</strong> {submissions.length}</p>

      <BarChart width={400} height={250} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#4CAF50" />
      </BarChart>

      <CSVLink
        data={submissions}
        filename="submissions.csv"
        className="btn"
        style={{ marginTop: "10px", display: "inline-block" }}
      >
        Export to CSV
      </CSVLink>

      <br />
      <button className="btn btn-secondary" onClick={onBack}>Back</button>
    </div>
  );
};

export default Analytics;
