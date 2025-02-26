import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const VendorSignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/vendors/register", form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      alert(response.data.message);
      navigate("/vendor-login");
    } catch (error) {
      console.error("❌ Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Error registering vendor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Vendor Signup
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Links for Vendor Login & User Signup */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/vendor-login" className="text-blue-500 hover:text-blue-700">
            Login here
          </Link>
        </p>

        <p className="mt-2 text-center text-sm text-gray-600">
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            User Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VendorSignUp;
