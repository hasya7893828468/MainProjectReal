import {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const apiUrl = 'http://localhost:5000/api/auth/login';

const Login = () => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const navigate = useNavigate ();

  const handleSubmit = async e => {
    e.preventDefault ();
    try {
      const response = await axios.post (apiUrl, {email, password});

      if (response.data.success) {
        // If login is successful, redirect to the main page
        navigate ('/main');
      } else {
        // If login fails, show an error message
        alert ('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error ('Error:', error);
      alert ('Login failed. Please check your backend.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail (e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword (e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
