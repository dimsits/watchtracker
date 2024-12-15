// pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import placeholderImage from "../assets/popcorn.png";
import { validateLogin } from "../utils/validate"; // Import validation
import ErrorMessage from "../components/ErrorMessage"; // Import ErrorMessage
import InputField from "../components/InputField"; // Import InputField

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setValidationErrors({});

    // Validate fields
    const errors = validateLogin(formData.email, formData.password);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      // Navigate to dashboard only if login is successful
      navigate("/dashboard");
    } catch (err) {
      // Handle error
      setLocalError(err.message || "Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-granite-softWhite flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-granite-dark to-granite-medium text-white py-4 shadow-md">
        <div className="container mx-auto flex items-left justify-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-granite-light flex items-center justify-center">
              <span className="text-xl font-bold text-granite-dark">🎬</span>
            </div>
            <h1 className="text-2xl font-bold font-nunito">WatchTracker</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Image Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <div className="w-3/4 h-3/4 flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={placeholderImage} // Use the imported image here
              alt="Custom Asset"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Login Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center px-8 py-12">
          <form
            onSubmit={handleSubmit}
            className="bg-granite-softWhite p-6 rounded-lg w-full max-w-md space-y-4"
          >
            <h2 className="text-3xl text-left font-nunito text-black">Log In</h2>
            <p className="text-sm text-black text-left font-nunito">
              Enter your credentials to access your account <br />
              Use /dashboard in URL to access website *Dev Tips*
            </p>
            <ErrorMessage message={localError || error} />

            <InputField
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email or Phone Number"
              error={validationErrors.email}
            />

            <InputField
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              error={validationErrors.password}
            />

            <button
              type="submit"
              className="w-full bg-granite-dark text-white py-3 px-4 rounded-md hover:bg-granite-medium focus:outline-none focus:ring-2 focus:ring-granite-medium focus:ring-offset-2 transition duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-sm text-granite-dark text-left mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-granite-dark hover:text-granite-medium">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
