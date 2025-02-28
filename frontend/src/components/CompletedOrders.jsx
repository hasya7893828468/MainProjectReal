import axios from 'axios';
import {useEffect, useState} from 'react';

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState ([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/completed-orders")
      .then((response) => {
        console.log("📥 Completed Orders Data (Frontend):", response.data);
        setCompletedOrders(response.data);
      })
      .catch((error) => console.error("❌ Error fetching completed orders:", error));
}, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center">Completed Orders</h2>
      {completedOrders.length === 0
        ? <p className="text-center text-gray-500">No completed orders</p>
        : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {completedOrders.map (order => (
              <div
                key={order._id}
                className="shadow-md rounded-lg p-4 bg-white"
              >
                <h3 className="font-bold text-lg text-center">
                  Order ID: {order._id}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  📅 Completed Date:
                  {' '}
                  {new Date (order.completedAt).toLocaleString ()}
                </p>
                <p className="text-md font-semibold text-center text-blue-600">
                  👤 Ordered by: {order.userName || 'Unknown User'}
                </p>
                {order.cartItems.map ((item, index) => (
                  <div key={index} className="border p-2 rounded-lg mt-2">
                    <img
                      src={`http://localhost:5000${item.img}`}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <h4 className="font-bold text-md">{item.name}</h4>
                    <p className="text-gray-600">
                      ₹{item.price} x {item.quantity}
                    </p>
                    <p className="text-green-600 font-bold">
                      Total: ₹{item.totalPrice}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>}
    </div>
  );
};

export default CompletedOrders;
