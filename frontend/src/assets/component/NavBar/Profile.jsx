import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("❌ No userId found in localStorage");
        setLoading(false);
        return;
      }

      try {
        console.log(`🔍 Fetching user data for ID: ${userId}`);
        const response = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);

        console.log("✅ API Response:", response.data);

        if (response.data) {
          setUser(response.data);
        } else {
          setError("⚠️ No user data found.");
        }
      } catch (err) {
        console.error("❌ Error fetching user data:", err);
        setError("❌ Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading user data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h3 className="font-semibold text-2xl text-blue-600 text-center">User Profile</h3>
      <div className="mt-4 space-y-2">
        <p className="text-gray-700">
          <strong>Name:</strong> {user?.name || "Unknown"}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {user?.email || "No email provided"}
        </p>
        <p className="text-gray-700">
          <strong>Address:</strong> {user?.address || "⚠️ No address provided"}
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> {user?.phone || "⚠️ No phone provided"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
