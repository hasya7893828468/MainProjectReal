import {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'; // Import useNavigate hook for redirection
// import img
//   from '../../public/Powerful eagle HD wallpaper 4K free download for Desktop laptop and Phones.jpeg';

const apiUrl = 'http://localhost:5000/api/auth/register';

const SignUp = () => {
  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const navigate = useNavigate (); // Initialize the navigate function

  const handleSubmit = async e => {
    e.preventDefault ();
    try {
      // Send POST request to register the user
      const response = await axios.post (apiUrl, {name, email, password});
      console.log (response.data);

      // If registration is successful, redirect to the main page (home or dashboard)
      navigate ('/main'); // Adjust the route path accordingly
    } catch (error) {
      console.error ('Error:', error);
      alert ('Registration failed. Please check your backend.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-75 rounded-lg shadow-md m-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName (e.target.value)} // Update name state
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail (e.target.value)} // Update email state
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword (e.target.value)} // Update password state
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
