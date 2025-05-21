import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
};
  useEffect(() => {
    // Display any message passed from the PrivateRoute or navigation state
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      if (res.data.status) {
        alert(res.data.msg);
        setMessage("Login successful!");
        // Store token in localStorage
        localStorage.setItem("token", res.data.token);
        navigate("/booking"); // Redirect to booking page
      }
    } catch (error) {
      if (!error.response.data.status) {
        alert(error.response.data.msg);
      }
      console.log("Login error:", error.response.data.msg); // ✅ For debugging
      if (error.response && error.response.data) {
        setMessage(error.response.data.msg); // ✅ show backend message
      } else {
        setMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl flex overflow-hidden">
        {/* Left Image Section */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500">
          <img
            src="https://images.pexels.com/photos/7820375/pexels-photo-7820375.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Login Illustration"
            className="w-full h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Log in to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              Login
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500 font-medium">
              {message}
            </p>
          )}

          <p className="text-sm text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <a
              href="/"
              className="text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition duration-200"
            >
              Register here
            </a>
          </p>

          <p className="text-xs text-gray-400 text-center mt-4">
            Forgot your password?{" "}
            <a href="/forgot" className="underline text-indigo-500">
              Reset it
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         formData
//       );
//       console.log(res);
//       if (res.data.status) {
//         console.log("response", res);
//         alert(res.data.msg);
//         setMessage("Login successful!");
//         navigate("/booking"); // 🔁 Redirect to login page
//       }
//       // You can also save token in localStorage or redirect
//       // localStorage.setItem("token", res.data.token);
//     } catch (error) {
//         if(!error.response.data.status){
//             alert(error.response.data.msg)
//         }
//       console.log("Login error:", error.response.data.msg); // ✅ For debugging
//       if (error.response && error.response.data) {
//         setMessage(error.response.data.msg); // ✅ show backend message

//       } else {
//         setMessage("Login failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-white to-blue-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl flex overflow-hidden">
//         {/* Left Image Section */}
//         <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500">
//           <img
//             src="https://images.pexels.com/photos/7820375/pexels-photo-7820375.jpeg?auto=compress&cs=tinysrgb&w=600"
//             alt="Login Illustration"
//             className="w-full h-full"
//           />
//         </div>

//         {/* Right Form Section */}
//         <div className="w-full md:w-1/2 p-8 sm:p-12">
//           <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">
//             Welcome Back
//           </h2>
//           <p className="text-sm text-gray-500 mb-6">
//             Log in to access your account
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               required
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               required
//             />

//             <button
//               type="submit"
//               className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-300 shadow-lg"
//             >
//               Login
//             </button>
//           </form>

//           {message && (
//             <p className="mt-4 text-center text-sm text-red-500 font-medium">
//               {message}
//             </p>
//           )}

//           <p className="text-sm text-center mt-6 text-gray-600">
//             Don't have an account?{" "}
//             <a
//               href="/"
//               className="text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition duration-200"
//             >
//               Register here
//             </a>
//           </p>

//           <p className="text-xs text-gray-400 text-center mt-4">
//             Forgot your password?{" "}
//             <a href="/forgot" className="underline text-indigo-500">
//               Reset it
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
