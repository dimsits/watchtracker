const ErrorMessage = ({ message }) => {
    if (!message) return null;
  
    return (
      <div className="bg-red-100 text-red-600 border border-red-500 p-3 rounded">
        {message}
      </div>
    );
  };
  
  export default ErrorMessage;
  