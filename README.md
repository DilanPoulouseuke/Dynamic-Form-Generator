# **Dynamic Form Generator**

A React-based dynamic form generator that renders forms from JSON schemas, supports real-time field validation, and adapts to dark mode.

---

## **Features**

- **Dynamic Form Rendering**: Generate forms from JSON schemas without manual layout adjustments.
- **Validation**: Includes built-in form validation using `react-hook-form`.
- **Dark Mode**: Fully adaptable for light and dark mode themes.
- **Customizable Fields**: Supports text, email, textarea, and select fields with dynamic options.

---

## **Setup Instructions**

Follow these steps to set up and run the project locally:

### **1. Clone the Repository**

```bash
git clone https://github.com/DilanPoulouseuke/Dynamic-Form-Generator.git
cd Dynamic-Form-Generator
```
### **2. Install Dependencies**
```
npm install
```
### **3. Start the Development Server**
```
npm start
```
Your application will be available at http://localhost:3000.

### **4. Build for Production**
To create a production build of the application, run:
```
npm run build
```
This will generate optimized files in the ``build/`` directory.

## **Example JSON Schemas**
Here are examples of JSON schemas you can use to define your forms:

### **Basic Form Example**
```Json
{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "companySize",
      "type": "select",
      "label": "Company Size",
      "required": true,
      "options": [
        { "value": "1-50", "label": "1-50 employees" },
        { "value": "51-200", "label": "51-200 employees" },
        { "value": "201-1000", "label": "201-1000 employees" },
        { "value": "1000+", "label": "1000+ employees" }
      ]
    },
    {
      "id": "industry",
      "type": "radio",
      "label": "Industry",
      "required": true,
      "options": [
        { "value": "tech", "label": "Technology" },
        { "value": "healthcare", "label": "Healthcare" },
        { "value": "finance", "label": "Finance" },
        { "value": "retail", "label": "Retail" },
        { "value": "other", "label": "Other" }
      ]
    },
    {
      "id": "timeline",
      "type": "select",
      "label": "Project Timeline",
      "required": true,
      "options": [
        { "value": "immediate", "label": "Immediate (within 1 month)" },
        { "value": "short", "label": "Short-term (1-3 months)" },
        { "value": "medium", "label": "Medium-term (3-6 months)" },
        { "value": "long", "label": "Long-term (6+ months)" }
      ]
    },
    {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments",
      "required": false,
      "placeholder": "Any other details you'd like to share..."
    }
  ]
}
```
## **Local Development Guide**
### **1. File Structure**

```plaintext
src/
├── components/
│   ├── DynamicForm.tsx       # Core dynamic form logic
│   ├── Editor.tsx            # JSON editor for schema input
│   └── FormPreview.tsx       # Component to preview form submissions
├── App.tsx                   
├── index.tsx                 
└── styles.css                            
```
### **2. Adding a New Field Type**
1. Open ``DynamicForm.tsx``.
2. Locate the ``renderField`` method.
3. Add your custom field type:

```tsx
if (field.type === "customType") {
  return (
    <CustomComponent
      id={field.id}
      label={field.label}
      {...additionalProps}
    />
  );
}
```
4. Import and define your CustomComponent as needed.
### **3. Testing Validations**
- Test validations using the validation property in the schema.
- Example:
```json

"validation": {
  "pattern": "^[0-9]+$",
  "message": "This field accepts only numbers"
}
```
### **4. Dark Mode Customization**
- Adjust colors in styles.css to modify dark mode themes.
- Example:
```css
body.dark-mode {
  background-color: #121212;
  color: #ffffff;
}
```

### **5. Debugging Tips**
- Check the browser console for form-related errors.
- Use ``console.log`` within ``DynamicForm.tsx`` for debugging JSON parsing or validation logic.

