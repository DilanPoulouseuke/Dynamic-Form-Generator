import React from "react";

interface EditorProps {
  jsonSchema: string;
  setJsonSchema: (schema: string) => void;
  darkMode: boolean;
}

const Editor: React.FC<EditorProps> = ({ jsonSchema, setJsonSchema, darkMode }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonSchema(e.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">JSON Editor</h2>
      <textarea
        value={jsonSchema}
        onChange={handleInputChange}
        className={`w-full h-96 border p-2 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        placeholder="Enter JSON schema..."
      />
    </div>
  );
};

export default Editor;
