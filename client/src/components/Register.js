import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
};

  const [message, setMessage] = useState("");
const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      console.log("data", formData);
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      if (res.data.status) {
        console.log("response", res);
        alert(res.data.msg);
        setMessage("Registration successful!");
         navigate("/login"); // 🔁 Redirect to login page
      }
    }
    catch (error) {
      if (!error.response.data.status) {
        alert(error.response.data.msg);
      }
      console.log("Registration error:", error.response.data.msg); // ✅ For debugging
      if (error.response && error.response.data) {
        setMessage(error.response.data.msg); // ✅ show backend message
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl flex overflow-hidden">
        {/* Left Side - Image or Illustration */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500">
          <img
            src="https://images.pexels.com/photos/7648319/pexels-photo-7648319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Register Illustration"
            className="w-full h-full"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">
            Create your account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Join us today! It takes only a few steps.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />

          <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className="w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-12"
    required
  />
  <button
    type="button"
    onClick={togglePasswordVisibility}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
  >
    {showPassword ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.965 9.965 0 011.177-4.762m.645-.867A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.346-.263 2.63-.738 3.799M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3l18 18M10.477 10.477a3 3 0 004.242 4.242M5.635 5.635A9.969 9.969 0 002 12c0 5.523 4.477 10 10 10a9.969 9.969 0 006.365-2.365M9.88 9.88A3 3 0 0114.12 14.12"
        />
      </svg>
    )}
  </button>
</div>


            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-300 shadow-lg"
            >
              Register
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500 font-medium">
              {message}
            </p>
          )}
          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition duration-200"
            >
              Log in here
            </a>
          </p>

          <p className="text-xs text-gray-400 text-center mt-6">
            By registering, you agree to our Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
