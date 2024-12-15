// components/InputField.jsx

const InputField = ({ id, name, type, value, onChange, placeholder, error }) => {
    return (
      <div className="space-y-8">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="bg-granite-softWhite block w-full border-b border-granite-medium focus:outline-none focus:border-granite-dark focus:ring-0"
        />
        {error && <p className="text-red-600 text-xs">{error}</p>}
      </div>
    );
  };
  
  export default InputField;
  