import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import placeholderImage from "../assets/popcorn.png";
import { validateRegister } from "../utils/validate"; // Import validation function
import InputField from "../components/InputField"; // Import reusable InputField component

function Register() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific and general errors as user types
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setValidationErrors({});

    // Client-side validation
    const errors = validateRegister(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);

      // Check auth state after registration attempt
      if (useAuthStore.getState().isAuthenticated) {
        navigate("/dashboard");
      } else {
        // If not authenticated, show error
        if (!Object.keys(validationErrors).length) {
          setLocalError(error || "Registration failed.");
        }
      }
    } catch (err) {
      // Backend error handling: If express-validator errors return from backend, they should be in a known format
      if (err.response && err.response.data && err.response.data.errors) {
        const backendErrors = err.response.data.errors.reduce((acc, cur) => {
          acc[cur.param] = cur.msg;
          return acc;
        }, {});
        setValidationErrors(backendErrors);
      } else {
        setLocalError(err.message || "Registration failed.");
      }
    }
  };

  const showGeneralError = localError && !Object.keys(validationErrors).length;

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
              src={placeholderImage}
              alt="Custom Asset"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Registration Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center px-8 py-12">
          <form
            onSubmit={handleSubmit}
            className="bg-granite-softWhite p-6 rounded-lg w-full max-w-md space-y-4"
          >
            <h2 className="text-3xl text-left font-nunito text-black">
              Create an Account
            </h2>
            <p className="text-sm text-black text-left font-nunito">
              Enter your information below to create your account
              <br />
              Use /dashboard in URL to access website *Dev*
            </p>

            {showGeneralError && (
              <div className="bg-red-100 text-red-600 border border-red-500 p-3 rounded">
                {localError}
              </div>
            )}

            <div className="space-y-4">
              <InputField
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                error={validationErrors.name}
              />

              <InputField
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                error={validationErrors.username}
              />

              <InputField
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
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

              <InputField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                error={validationErrors.confirmPassword}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-granite-dark text-white py-3 px-4 rounded-md hover:bg-granite-medium focus:outline-none focus:ring-2 focus:ring-granite-medium focus:ring-offset-2 transition duration-300"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-sm text-granite-dark text-left mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-granite-dark hover:text-granite-medium">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
