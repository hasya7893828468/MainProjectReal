import {useEffect, useState} from 'react';
import {ShoppingCart, ShoppingBag, X, Plus, Minus} from 'lucide-react';
import {Link} from 'react-router-dom';

const NavBar = ({
  cart,
  updateQuantity,
  removeFromCart,
  searchValue,
  setSearchValue,
}) => {
  const [isCartOpen, setIsCartOpen] = useState (false);

  const toggleCart = () => {
    setIsCartOpen (prev => !prev);
  };

  useEffect (
    () => {
      const handleClickOutside = event => {
        if (
          !event.target.closest ('.cart-sidebar') &&
          !event.target.closest ('.cart-icon')
        ) {
          setIsCartOpen (false);
        }
      };

      if (isCartOpen) {
        document.addEventListener ('click', handleClickOutside);
      } else {
        document.removeEventListener ('click', handleClickOutside);
      }

      return () => document.removeEventListener ('click', handleClickOutside);
    },
    [isCartOpen]
  );

  const totalAmount = cart.reduce (
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <nav className="fixed top-0 w-full z-50 bg-white shadow-lg py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Store Logo */}
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-black" />
            <span className="font-bold text-xl text-black">ShivaStore</span>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-grow justify-center">
            <input
              type="search"
              placeholder="Search products..."
              value={searchValue}
              onChange={e => setSearchValue (e.target.value)}
              className="p-2 w-80 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login, Signup & Cart */}
          <div className="flex items-center space-x-6">
            {/* Login & Sign Up */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1 rounded-full transition-all transform hover:scale-105">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1 rounded-full transition-all transform hover:scale-105">
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
        </div>
      </nav>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4 transform transition-transform cart-sidebar ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 bg-gray-100 text-gray-600 p-2 rounded-full"
          onClick={toggleCart}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold mb-4 pt-20">Your Cart</h2>

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
                    src={`http://localhost:5000${item.img}`} // FIX: Remove extra "/"
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-t-lg"
                    //   onError={e =>
                    //     (e.target.src = 'https://via.placeholder.com/150')} // Placeholder if image fails
                    //
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

        {/* Total Amount */}
        <div className="text-md font-semibold mt-3 border-t pt-3 text-center">
          Total Amount:{' '}
          <span className="text-lg font-bold text-green-600">
            ₹{totalAmount.toFixed (2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
