import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // Load profile info from Firebase Auth & Firestore
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        setName(user.displayName || "");
        setEmail(user.email);
      }
    };
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name });
      } else {
        alert("Make changes first");
      }
      alert("Profile updated!");
      navigate("/");
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="px-3 pt-10 h-screen w-full bg-gradient-to-b from-slate-400 to-stone-200">
      <div className="max-w-md mx-auto p-4 border rounded-lg space-y-4 shadow-md bg-gray-100">
        <h2 className="text-2xl font-semibold">Profile</h2>

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded bg-gray-100"
            value={email}
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded bg-gray-100"
            placeholder="********"
            disabled
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
