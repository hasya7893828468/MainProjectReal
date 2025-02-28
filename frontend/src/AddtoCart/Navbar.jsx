import { useEffect, useState } from 'react';
import { ShoppingCart, ShoppingBag, X, Plus, Minus, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrderDetails from '../../../components/OrderDetails';

const NavBar = ({ cart, updateQuantity, removeFromCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [orderData, setOrderData] = useState([]);
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || 'Guest');
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (vendorId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/vendor-cart/${vendorId}`);
          setOrderData(response.data);
          localStorage.setItem('orderData', JSON.stringify(response.data));
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };
    fetchOrders();
  }, [vendorId]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orderData');
    if (storedOrders) {
      setOrderData(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      setOrderData(cart);
      localStorage.setItem('cartData', JSON.stringify(cart));
    }
  }, [cart]);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="fixed top-0 w-full z-50 bg-white shadow-lg py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-black" />
            <span className="font-bold text-xl text-amber-500">ShivaStore</span>
            <span className="text-gray-600 text-sm ml-3">👤 {userName}</span>
          </div>

          <div className="relative">
            <ShoppingCart
              className="w-10 h-10 cursor-pointer text-black"
              onClick={toggleCart}
            />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </nav>

      <OrderDetails
        orderData={orderData}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default NavBar;