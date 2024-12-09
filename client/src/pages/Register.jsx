import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      window.location.href = "/login";
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-[#3D7C98] text-white py-4 px-8 font-serif">
        <h1 className="text-2xl font-bold">WatchTracker</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Image Section */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
          <div className="w-3/4 h-3/4 bg-gray-300 flex items-center justify-center rounded-lg">
            {/* Placeholder for the image */}
            <p className="text-gray-700 text-lg">Image Placeholder</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center px-8 py-12">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg w-full max-w-md space-y-4"
          >
            <h2 className="text-3xl font-bold text-left font-serif">Create an Account</h2>
            <p className="text-sm text-gray-500 text-left">
              Enter your information below to create your account
            </p>

            {error && (
              <div className="bg-red-100 text-red-600 border border-red-500 p-3 rounded">
                {error}
              </div>
            )}

            <div className="space-y-8">
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Name"
                required
                className="block w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-0"
              />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email or Phone Number"
                required
                className="block w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-0"
              />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="block w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-0"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="block w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-0"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-sm text-left text-gray-600 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline"
              >
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
