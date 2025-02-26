import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/vendors/login", { email, password });

      if (response.data.token && response.data.vendorId) {
        // ✅ Store vendor token & ID
        localStorage.setItem("vendorToken", response.data.token);
        localStorage.setItem("vendorId", response.data.vendorId);
        localStorage.setItem("vendorName", response.data.vendorName); // Store Vendor Name if available

        alert("✅ Login successful!");
        navigate("/vendor-dashboard"); // Redirect to Vendor Dashboard
      } else {
        alert("❌ Login failed: Missing vendor ID");
      }
    } catch (error) {
      console.error("❌ Login error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Vendor Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Links for Signup & Vendor Signup */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/vendor-signup" className="text-blue-500 hover:text-blue-700">
            Vendor Sign Up
          </Link>
        </p>

        {/* Link to User Login */}
        <p className="mt-2 text-center text-sm text-gray-600">
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            User Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VendorLogin;
