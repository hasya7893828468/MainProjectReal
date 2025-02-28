import {useEffect, useState} from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState ([]);
  const vendorId = localStorage.getItem ('vendorId');
  const userId = localStorage.getItem ('userId'); // Get the logged-in user ID
  const userName = localStorage.getItem ('userName'); // Get the logged-in user name
  // Function to check if the order is older than 3 minutes
  // const isOrderOlderThanThreeMinutes = (orderDate) => {
  //     const currentDate = new Date();
  //     const orderDateObj = new Date(orderDate);
  //     const differenceInTime = currentDate - orderDateObj;
  //     const differenceInMinutes = differenceInTime / (1000 * 60); // Convert time to minutes
  //     return differenceInMinutes > 3; // Return true if the order is older than 3 minutes
  //   };

  // Fetch orders when component mounts
  //   useEffect(() => {
  //     if (vendorId && userId && userName) {
  //       axios
  //         .get(`http://localhost:5000/api/vendor-cart/${vendorId}`)
  //         .then((response) => {
  //           // Filter orders to only show those that belong to the current logged-in user
  //           const userOrders = response.data.filter(
  //             (order) => order.userId === userId && order.userName === userName
  //           );

  //           // Remove orders that are older than 3 minutes
  //           const filteredOrders = userOrders.filter(
  //             (order) => !isOrderOlderThanThreeMinutes(order.createdAt)
  //           );
  //           setOrders(filteredOrders);
  //         })
  //         .catch((error) => console.error('❌ Error fetching orders:', error));
  //     }
  //   }, [vendorId, userId, userName]);

  // Function to check if the order is older than 2 days
  const isOrderOlderThanTwoDays = orderDate => {
    const currentDate = new Date ();
    const orderDateObj = new Date (orderDate);
    const differenceInTime = currentDate - orderDateObj;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert time to days
    return differenceInDays > 2;
  };

  // Fetch orders when component mounts
  useEffect (
    () => {
      if (vendorId && userId && userName) {
        axios
          .get (`http://localhost:5000/api/vendor-cart/${vendorId}`)
          .then (response => {
            // Filter orders to only show those that belong to the current logged-in user
            const userOrders = response.data.filter (
              order => order.userId === userId && order.userName === userName
            );

            // Remove orders that are older than 2 days
            const filteredOrders = userOrders.filter (
              order => !isOrderOlderThanTwoDays (order.createdAt)
            );
            setOrders (filteredOrders);
          })
          .catch (error => console.error ('❌ Error fetching orders:', error));
      }
    },
    [vendorId, userId, userName]
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>

      {/* Orders List */}
      {orders.length === 0
        ? <p className="text-center text-gray-500">No orders placed yet</p>
        : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map (order => (
              <div
                key={order._id}
                className="shadow-md rounded-lg p-4 bg-white border border-gray-200"
              >
                <h3 className="font-semibold text-lg text-center mb-2">
                  Order ID: {order._id}
                </h3>
                <p className="text-center text-sm text-gray-500 mb-4">
                  📅 Order Date: {new Date (order.createdAt).toLocaleString ()}
                </p>

                <p className="text-center font-semibold mb-4">
                  <span className="text-blue-600">Ordered by: </span>
                  {order.userName || 'Unknown User'}
                </p>

                {/* Order Items */}
                <div className="space-y-2">
                  {order.cartItems.map ((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                    >
                      <img
                        src={`http://localhost:5000${item.img}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 ml-4">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          ₹{item.price} x {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-green-600">
                        ₹{item.totalPrice}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="mt-4 p-2 bg-gray-100 rounded-md text-center">
                  <p className="text-lg font-semibold">
                    🛍️ Total:
                    <span className="text-green-600">
                      ₹
                      {order.cartItems
                        .reduce ((sum, item) => sum + item.totalPrice, 0)
                        .toFixed (2)}
                    </span>
                  </p>
                </div>

                {/* Order Status */}
                <p
                  className={`mt-3 text-center font-medium ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-500'}`}
                >
                  Status: {order.status}
                </p>
              </div>
            ))}
          </div>}
    </div>
  );
};

export default MyOrders;
