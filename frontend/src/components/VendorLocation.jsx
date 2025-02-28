import { useEffect, useState } from "react";
import axios from "axios";

const VendorLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [vendorLocation, setVendorLocation] = useState(null);
  const [orders, setOrders] = useState([]);
  const vendorId = localStorage.getItem("vendorId");

  // Function to fetch user's exact location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(newLocation);

          // Send location to the backend
          axios
            .post("http://localhost:5000/api/update-location", newLocation, {
              headers: { "Content-Type": "application/json" },
            })
            .then((response) => console.log("✅ Location updated:", response.data))
            .catch((error) => console.log("❌ Error updating location:", error));
        },
        (error) => console.log("❌ Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  };

  useEffect(() => {
    fetchLocation();
    const interval = setInterval(fetchLocation, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (vendorId) {
      axios
        .get(`http://localhost:5000/api/vendor-cart/${vendorId}`)
        .then((response) => {
          console.log("📥 Orders received:", response.data);
          setOrders(response.data);
        })
        .catch((error) => console.error("❌ Error fetching orders:", error));
    }
  }, [vendorId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center">Vendor Dashboard</h2>

      {/* Button to manually fetch user location */}
      <button
        onClick={fetchLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        📍 Get Exact Location
      </button>

      {/* Show Google Maps Link Below the Button */}
      {userLocation && (
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-600">
            Latitude: {userLocation.latitude} | Longitude: {userLocation.longitude}
          </p>
          <a
            href={`https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2 inline-block"
          >
            🌍 View Your Location on Google Maps
          </a>
        </div>
      )}

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No orders placed</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {orders.map((order) => (
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

              {/* View Customer Location */}
              {order.userLocation?.latitude && order.userLocation?.longitude && (
                <div className="mt-2 text-center">
                  <p className="text-sm text-gray-600">
                    Latitude: {order.userLocation.latitude} | Longitude: {order.userLocation.longitude}
                  </p>
                  <a
                    href={`https://www.google.com/maps?q=${order.userLocation.latitude},${order.userLocation.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-3 py-1 rounded mt-2 inline-block"
                  >
                    📍 View Customer Location
                  </a>
                </div>
              )}

              {order.cartItems.map((item, index) => (
                <div key={index} className="border p-2 rounded-lg mt-2">
                  <img
                    src={`http://localhost:5000${item.img}`}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <h4 className="font-bold text-md">{item.name}</h4>
                  <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                  <p className="text-green-600 font-bold">Total: ₹{item.totalPrice}</p>
                </div>
              ))}

              {/* Navigate to Vendor Location */}
              {userLocation && vendorLocation && (
                <div className="text-center mt-3">
                  <p className="text-sm text-gray-600">
                    Your Location: {userLocation.latitude}, {userLocation.longitude}
                  </p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${vendorLocation.latitude},${vendorLocation.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-3 py-1 rounded mt-2 inline-block"
                  >
                    🚗 Get Directions to Vendor
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorLocation;
