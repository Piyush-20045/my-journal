import { Link, Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useState } from "react";
import { usePost } from "../postContext";
import { useAuth } from "../AuthContext";

const Signup = () => {
  const { loading, setLoading } = usePost();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      navigate("/");
      alert("Successfully created account");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };
  // handleGoogleLogin for google loggin
  const handleGoogleLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      alert("Login Successfull!");
      navigate("/");
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed");
    }
  };

  // If user logged in already then login page can't be accessed!
    const { user } = useAuth();
    if(user){
      return <Navigate to="/" replace/>;
    }

  return (
    <div className="flex justify-center h-screen bg-gradient-to-b from-slate-400 to-stone-200">
      <div className="mt-12 mx-4 p-5 md:p-8 h-fit bg-white rounded-lg shadow-lg w-96">
        {/* SIGNUP TITLE */}
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>

        {/* FORM */}
        <form onSubmit={handleSignUp} className="mt-4">
          {/* NAME and INPUT */}
          <div className="mb-4">
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          {/* EMAIL and INPUT */}
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          {/* PASS and INPUT */}
          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* SignUp BUTTON */}
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <span className="my-2 text-sm flex justify-center text-gray-700 font-semibold">
          OR
        </span>

        {/* GOOGLE LOGIN */}
        <button
          onClick={() => handleGoogleLogin(googleProvider)}
          className="flex items-center justify-center p-2 w-full font-semibold border rounded hover:bg-gray-200 cursor-pointer shadow-md"
        >
          <span>
            <img src="/google.svg" className="inline mr-2 h-7 w-7" />
          </span>
          Continue with Google
        </button>

        {/* PARA and LOGIN BUTTON */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
