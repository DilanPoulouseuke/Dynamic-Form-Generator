import React, { useState } from "react";
import Editor from "./components/Editor";
import FormPreview from "./components/FormPreview";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false); // Shared dark mode state
  const [jsonSchema, setJsonSchema] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "bg-black text-white" : "bg-white text-black"} style={{ minHeight: "100vh" }}>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 bg-black text-white rounded"
      >
        Toggle Dark Mode
      </button>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4 border-r">
          <Editor
            jsonSchema={jsonSchema}
            setJsonSchema={setJsonSchema}
            darkMode={darkMode}
          />
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <FormPreview jsonSchema={jsonSchema} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default App;
