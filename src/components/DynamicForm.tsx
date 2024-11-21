import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    message?: string;
  };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

interface DynamicFormProps {
  schema: FormSchema;
  darkMode: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, darkMode }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const successMessageRef = useRef<HTMLDivElement | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    setFormData(data);
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted && successMessageRef.current) {
      successMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isSubmitted]);

  const handleCopyJson = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    navigator.clipboard.writeText(jsonData)
      .then(() => alert("Form data copied to clipboard!"))
      .catch((err) => alert("Failed to copy: " + err));
  };

  // Download form submissions as JSON
  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form_submission.json';
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h1 className="text-2xl font-bold">{schema.formTitle}</h1>
        <p>{schema.formDescription}</p>

        {schema.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="block font-semibold">{field.label}</label>

            {/* Text Input */}
            {field.type === "text" && (
  <input
    {...register(field.id, {
      required: field.required,
      pattern: field.validation?.pattern
        ? {
            value: new RegExp(field.validation.pattern),
            message: field.validation.message || `${field.label} is not valid`,
          }
        : undefined,
    })}
    type="text"
    placeholder={field.placeholder}
    className={`border w-full p-2 ${
      darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
    }`}
  />
)}

            {/* Email Input */}
            {field.type === "email" && (
  <input
    {...register(field.id, {
      required: field.required,
      pattern: field.validation?.pattern
        ? {
            value: new RegExp(field.validation.pattern),
            message: field.validation.message || `${field.label} is not valid`,
          }
        : undefined,
    })}
    type="email"
    placeholder={field.placeholder}
    className={`border w-full p-2 ${
      darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
    }`}
  />
)}


            {/* Select Dropdown */}
            {field.type === "select" && (
              <select
              {...register(field.id, { required: field.required })}
              className={`border w-full p-2 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {/* Radio Buttons */}
            {field.type === "radio" && (
              <div className="space-y-1">
                {field.options?.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      {...register(field.id, { required: field.required })}
                      type="radio"
                      value={option.value}
                      id={`${field.id}-${option.value}`}
                      className="mr-2"
                    />
                    <label htmlFor={`${field.id}-${option.value}`}>{option.label}</label>
                  </div>
                ))}
              </div>
            )}

            {field.type === "textarea" && (
  <textarea
    {...register(field.id, { required: field.required })}
    placeholder={field.placeholder}
    className={`border w-full p-2 ${
      darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    }`}
  />
            )}

            
            {/* Error Message */}
            {errors[field.id]?.message && (
              <span className="text-red-500 text-sm">
                {String(errors[field.id]?.message) || `${field.label} is required`}
              </span>
            )}
          </div>
        ))}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>

        <button 
          type="button" 
          onClick={handleCopyJson} 
          className="bg-gray-500 text-white px-4 py-2 ml-2"
          disabled={!formData}
        >
          Copy Form JSON
        </button>

        <button 
          type="button" 
          onClick={handleDownloadJson} 
          className="bg-green-500 text-white px-4 py-2 ml-2"
          disabled={!formData}
        >
          Download Form Submission
        </button>

        {/* Success Message */}
        {isSubmitted && (
          <div ref={successMessageRef} className="mt-4 text-green-500">
            <p>Form submitted successfully!</p>
          </div>
        )}
      </form>
  );
};

export default DynamicForm;
