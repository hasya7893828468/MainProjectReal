import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddtoCart from './AddtoCart/Addtocart';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';

const App = () => {
  const [cart, setCart] = useState ([]); // State to manage the cart

  // Function to add item to the cart
  const addToCart = item => {
    setCart (prevCart => [...prevCart, item]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
