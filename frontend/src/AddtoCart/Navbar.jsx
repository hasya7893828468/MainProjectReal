import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = ({cart, onSearch}) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">BLuxury</div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        onChange={e => onSearch (e.target.value)}
        className="p-2 rounded text-black w-64"
      />

      {/* Cart Icon */}
      <Link to="/cart" className="relative">
        <button className="text-white">Cart</button>
        {cart.length > 0 &&
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
            {cart.length}
          </span>}
      </Link>
    </nav>
  );
};

export default NavBar;
