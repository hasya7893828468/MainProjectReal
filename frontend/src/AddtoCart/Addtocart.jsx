import React from 'react';
import Cards from './Cards';
import NavBar from './Navbar';
// import CartPage from './CartPage';

const AddtoCart = ({ cart, addToCart }) => {
  return (
    <>
      <NavBar cart={cart} />
        <Cards addToCart={addToCart} />
      
    </>
  );
};

export default AddtoCart;
