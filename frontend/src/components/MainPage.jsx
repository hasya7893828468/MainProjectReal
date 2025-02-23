import React, {useState} from 'react';
import Navbar from '../assets/component/NavBar/NavBar.jsx';
import CardAdd from './CardAdd.jsx';

const MainPage = () => {
  const [cart, setCart] = useState ([]);
  const [searchValue, setSearchValue] = useState ('');

  const addToCart = item => {
    setCart (prevCart => {
      const existingItem = prevCart.find (
        cartItem => cartItem._id === item._id
      );
      return existingItem
        ? prevCart.map (
            cartItem =>
              cartItem._id === item._id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
          )
        : [...prevCart, {...item, quantity: 1}];
    });
  };

  // const addToCart = (item) => {
  //   setCart((prevCart) => [...prevCart, { ...item, uniqueId: Date.now() }]);
  // };

  const updateQuantity = (id, delta) => {
    setCart (prevCart =>
      prevCart.map (
        item =>
          item._id === id
            ? {...item, quantity: Math.max (1, item.quantity + delta)}
            : item
      )
    );
  };

  const removeFromCart = id => {
    setCart (prevCart => prevCart.filter (item => item._id !== id));
  };

  return (
    <div>
      <Navbar
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <CardAdd addToCart={addToCart} searchValue={searchValue} />
    </div>
  );
};

export default MainPage;
