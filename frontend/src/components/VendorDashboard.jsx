import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const VendorDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendorLocation, setVendorLocation] = useState(null);
  const vendorId = localStorage.getItem("vendorId");

  // ✅ Fetch Vendor's Exact Location
  const fetchVendorLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
            accuracy: position.coords.accuracy, // Debugging accuracy
          };

          console.log("📍 Accurate Vendor Location Fetched:", location);
          setVendorLocation(location);

          // Send vendor location to backend
          axios
            .post("http://localhost:5000/api/vendor/update-location", location)
            .then(() => console.log("✅ Vendor location updated"))
            .catch((error) => console.log("❌ Error updating location:", error));
        },
        (error) => console.log("❌ Error getting location:", error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.log("❌ Geolocation is not supported by this browser.");
    }
  };

  // Update vendor location every 10 seconds
  useEffect(() => {
    fetchVendorLocation();
    const interval = setInterval(fetchVendorLocation, 10000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch Orders with Exact Customer Location
  useEffect(() => {
    const controller = new AbortController();
    const fetchOrders = async () => {
      if (vendorId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/vendor-cart/${vendorId}`,
            { signal: controller.signal }
          );
          console.log("📍 Orders with Customer Locations:", response.data);
          setOrders(response.data);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("❌ Error fetching orders:", error);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
    return () => controller.abort();
  }, [vendorId]);

  // ✅ Complete Order Function
  const handleCompleteDelivery = useCallback((orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: "Completed" } : order
      )
    );

    axios
      .post("http://localhost:5000/api/vendor-cart/complete-order", { orderId })
      .then(() => {
        console.log("✅ Order Successfully Completed");
      })
      .catch((error) => {
        console.error("❌ Error completing order:", error);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Pending" } : order
          )
        );
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Vendor Dashboard</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders placed yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="shadow-md rounded-lg p-4 bg-white border border-gray-200"
            >
              <h3 className="font-semibold text-lg text-center mb-2">
                Order ID: {order._id}
              </h3>
              <p className="text-center text-sm text-gray-500 mb-4">
                📅 Order Date: {new Date(order.createdAt).toLocaleString()}
              </p>

              <p className="text-center font-semibold mb-4">
                <span className="text-blue-600">Ordered by: </span>
                {order.userName || "Unknown User"}
              </p>

              <div className="space-y-2">
                {order.cartItems?.map((item, index) => (
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

              <div className="mt-4 p-2 bg-gray-100 rounded-md text-center">
                <p className="text-lg font-semibold">
                  🛍️ Total:{" "}
                  <span className="text-green-600">
                    ₹
                    {order.cartItems
                      ?.reduce((sum, item) => sum + item.totalPrice, 0)
                      .toFixed(2)}
                  </span>
                </p>
              </div>

             {/* ✅ Exact Customer Location */}
{order.userLocation?.latitude && order.userLocation?.longitude && (
  <div className="mt-2 text-center">
    <p className="text-sm text-gray-600">
      📍 Customer Location:
      <span className="font-bold text-blue-600">
        {order.userLocation.latitude}, {order.userLocation.longitude}
      </span>
    </p>
    <a
      href={`https://www.google.com/maps?q=${order.userLocation.latitude},${order.userLocation.longitude}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-500 text-white px-3 py-1 rounded mt-2 inline-block"
    >
      🌍 View Customer Location
    </a>
  </div>
)}


              {/* ✅ Get Directions */}
{vendorLocation && order.userLocation?.latitude && order.userLocation?.longitude && (
  <div className="text-center mt-3">
    <p className="text-sm text-gray-600">
      Your Location:{" "}
      <span className="font-bold text-blue-600">
        {vendorLocation.latitude}, {vendorLocation.longitude}
      </span>
    </p>
    <a
      href={`https://www.google.com/maps/dir/?api=1&origin=${vendorLocation.latitude},${vendorLocation.longitude}&destination=${order.userLocation.latitude},${order.userLocation.longitude}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 text-white px-3 py-1 rounded mt-2 inline-block"
    >
      🚗 Get Directions to Customer
    </a>
  </div>
)}


              <p
                className={`mt-3 text-center font-medium ${
                  order.status === "Completed"
                    ? "text-green-600"
                    : "text-yellow-500"
                }`}
              >
                Status: {order.status}
              </p>

              {order.status === "Pending" && (
                <button
                  onClick={() => handleCompleteDelivery(order._id)}
                  className="mt-4 w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-700"
                >
                  ✅ Complete Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
