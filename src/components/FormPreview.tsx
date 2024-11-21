import React from "react";
import DynamicForm from "./DynamicForm";

interface FormPreviewProps {
  jsonSchema: string;
  darkMode: boolean;
}

const FormPreview: React.FC<FormPreviewProps> = ({ jsonSchema, darkMode }) => {
  let schema;
  try {
    schema = JSON.parse(jsonSchema);
  } catch {
    return (
      <p className={`text-red-500 ${darkMode ? "bg-gray-800 text-white" : ""}`}>
        Invalid JSON. Please correct it.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Form Preview</h2>
      <DynamicForm schema={schema} darkMode={darkMode} />
    </div>
  );
};

export default FormPreview;
