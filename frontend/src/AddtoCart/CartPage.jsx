import React from 'react';

const CartPage = ({cart}) => {
  // Calculate the total price of items in the cart
  const totalPrice = (cart || [])
    .reduce ((total, item) => total + item.price, 0);

  return (
    <a className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0
        ? <p>Your cart is empty</p>
        : <div>
            <div className="flex flex-wrap">
              {cart.map ((item, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                >
                  <div className="border p-4 rounded-lg shadow-md">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-60 object-cover rounded-t-lg"
                    />
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">
                        Rs. {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>Rs. {totalPrice}</span>
              </div>
            </div>
          </div>}
    </a>
  );
};

export default CartPage;
