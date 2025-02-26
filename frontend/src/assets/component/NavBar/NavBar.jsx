import {useEffect, useState} from 'react';
import {ShoppingCart, ShoppingBag, X, Plus, Minus, Menu} from 'lucide-react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const NavBar = ({cart, updateQuantity, removeFromCart}) => {
  const [isCartOpen, setIsCartOpen] = useState (false);
  const [isMenuOpen, setIsMenuOpen] = useState (false);
  const [userName, setUserName] = useState ('');

  useEffect (() => {
    setUserName (localStorage.getItem ('userName') || 'Guest');
  }, []);

  const toggleCart = () => {
    setIsCartOpen (prev => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen (prev => !prev);
  };

  const totalAmount = cart.reduce (
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleOrderNow = async () => {
    const vendorId = localStorage.getItem ('vendorId');
    const userId = localStorage.getItem ('userId');
    const userName = localStorage.getItem ('userName'); // ✅ Get user's name

    if (!vendorId || !userId || !userName) {
      alert ('User not logged in properly!');
      return;
    }

    const orderData = {
      vendorId,
      userId,
      userName, // ✅ Ensure userName is sent
      cartItems: cart.map (item => ({
        name: item.name,
        img: item.img,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      })),
    };

    console.log ('📦 Sending Order Data:', orderData); // ✅ Debugging Step

    try {
      const response = await axios.post (
        'http://localhost:5000/api/vendor-cart/add-order',
        orderData
      );
      console.log ('✅ Order Response:', response.data);
      alert ('Order placed successfully!');
    } catch (error) {
      console.error ('❌ Order error:', error);
      alert ('Failed to place order');
    }
  };

  return (
    <div>
      <nav className="fixed top-0 w-full z-50 bg-white shadow-lg py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Store Logo */}
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-black" />
            <span className="font-bold text-xl text-amber-500">ShivaStore</span>
            <span className="text-gray-600 text-sm ml-3">👤 {userName}</span>
          </div>

          {/* Toggle Menu Icon for Small Screens */}
          <div className="lg:hidden flex items-center">
            <Menu
              className="w-8 h-8 cursor-pointer text-black"
              onClick={toggleMenu}
            />
          </div>

          {/* Login, Signup (Visible on Large Screens) */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <button className="bg-amber-500 hover:bg-amber-500 text-white px-6 py-1 rounded-full transition-all transform hover:scale-105">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-amber-500 hover:bg-amber-500 text-white px-6 py-1 rounded-full transition-all transform hover:scale-105">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="relative">
            <ShoppingCart
              className="w-10 h-10 cursor-pointer text-black cart-icon"
              onClick={toggleCart}
            />
            {cart.length > 0 &&
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cart.reduce ((total, item) => total + item.quantity, 0)}
              </span>}
          </div>
        </div>
      </nav>

      {/* Login & Signup Dropdown (Small Screens) */}
      {isMenuOpen &&
        <div className="absolute top-14 right-4 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2 z-50">
          <Link to="/login">
            <button className="bg-amber-500 hover:bg-amber-500 text-white w-full px-4 py-2 rounded-md">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-amber-500 hover:bg-amber-500 text-white w-full px-4 py-2 rounded-md">
              Sign Up
            </button>
          </Link>
        </div>}

      {/* ✅ Cart Sidebar (Now Fully Responsive on Small Screens) */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-1/3 h-full bg-white shadow-lg p-4 transform transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} z-50 overflow-y-auto`}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 bg-gray-100 text-gray-600 p-2 rounded-full"
          onClick={toggleCart}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold mb-4 pt-10">Your Cart</h2>

        {/* Scrollable Cart Items */}
        <div className="overflow-y-auto h-[65vh] pr-2">
          {cart.length === 0
            ? <p className="text-gray-500 text-center">Your cart is empty</p>
            : cart.map ((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg mb-2"
                >
                  {/* Product Image */}
                  <img
                    src={`http://localhost:5000${item.img}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-t-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs">Price: ₹{item.price}</p>
                    <p className="text-xs font-bold">
                      Total: ₹{(item.price * item.quantity).toFixed (2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-1 mt-1">
                      <button
                        onClick={() => updateQuantity (item._id, -1)}
                        className="p-1 bg-gray-200 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity (item._id, 1)}
                        className="p-1 bg-gray-200 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart (item._id)}
                        className="ml-2 text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Total Amount & Order Now Button */}
        <div className="flex justify-between items-center mt-3 border-t pt-3 mb-3 px-4">
          <span className="text-md font-semibold">
            Total:
            <span className="text-lg font-bold text-green-600">
              ₹{totalAmount.toFixed (2)}
            </span>
          </span>
          <button
            onClick={handleOrderNow}
            className=" bg-amber-500 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all"
          >
            🛍️ Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
