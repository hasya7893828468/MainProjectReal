import { useEffect, useState } from "react";
import axios from "axios";

const VendorDashboard = () => {
  const [orders, setOrders] = useState([]);
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    if (vendorId) {
      axios
        .get(`http://localhost:5000/api/vendor-cart/${vendorId}`)
        .then((response) => {
          console.log("📥 Orders received:", response.data); // ✅ Debugging Step
          setOrders(response.data);
        })
        .catch((error) => console.error("❌ Error fetching orders:", error));
    }
  }, [vendorId]);

  // ✅ Calculate the grand total price of all orders
  const mainTotal = orders.reduce((total, order) => {
    return total + order.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, 0);

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-bold text-center">Vendor Dashboard</h2>
                {/* ✅ Display the grand total at the bottom */}
                <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
            <h3 className="text-xl font-bold">
              🛒 Grand Total of All Orders: 
              <span className="text-green-600"> ₹{mainTotal.toFixed(2)}</span>
            </h3>
          </div>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders placed</p>
      ) : (
        <>
          {/* ✅ Display all orders in a grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5  ">
            {orders.map((order) => {
              // ✅ Calculate the total price of a single order
              const orderTotal = order.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

              return (
                <div key={order._id} className="shadow-md rounded-lg p-4 bg-white">
                  <h3 className="font-bold text-lg text-center">
                    Order ID: {order._id}
                  </h3>
                  <p className="text-sm text-gray-500 text-center">
                    📅 Order Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="text-md font-semibold text-center text-blue-600">
                    👤 Ordered by: {order.userName || "Unknown User"}
                  </p>

                  {order.cartItems.map((item, index) => (
                    <>
                      <div>
                        <div key={index} className="border p-2  rounded-lg mt-2 ">
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
                    </div>
                    </>
                  ))}

                  {/* ✅ Show total for this single order */}
                  <div className="mt-3 p-2 bg-gray-200 text-center rounded-lg">
                    <p className="font-semibold text-lg">
                      🛍️ Order Total: <span className="text-green-600">₹{orderTotal.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div> 
        </>
      )}
    </div>
  );
};

export default VendorDashboard;
