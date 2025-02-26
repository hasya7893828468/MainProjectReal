import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import VendorLogin from './components/VendorLogin';
import VendorSignUp from './components/VenderSignup';
import VendorDashboard from './components/VendorDashboard';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/ab" element={<About />} />

        {/* Vendor Routes */}
        <Route path="/vendor-signup" element={<VendorSignUp />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
