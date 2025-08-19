import { useState } from "react";
import FormBuilder from "./components/FormBuilder";
import Dashboard from "./components/Dashboard";
import FormPreview from "./components/FormPreview";
import Analytics from "./components/Analytics";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [activeForm, setActiveForm] = useState<any>(null);
  const [showAnalytics, setShowAnalytics] = useState<string | null>(null);

  return (
    <div className="container">
      <h1 className="title">📋 Form Builder App</h1>

      {!activeForm && !showAnalytics && (
        <>
          <FormBuilder onFormCreated={() => setRefresh(!refresh)} />
          <Dashboard
            onSelect={(form) => setActiveForm(form)}
            onAnalytics={(id) => setShowAnalytics(id)}
            key={refresh.toString()}
          />
        </>
      )}

      {activeForm && (
        <FormPreview form={activeForm} onClose={() => setActiveForm(null)} />
      )}

      {showAnalytics && (
        <Analytics formId={showAnalytics} onBack={() => setShowAnalytics(null)} />
      )}
    </div>
  );
}

export default App;
