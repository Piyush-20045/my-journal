import { Link, useNavigate, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useState } from "react";
import { usePost } from "../postContext";
import { useAuth } from "../AuthContext";

const Login = () => {
  const { loading, setLoading } = usePost();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // HandleSignIn function for LOGIN
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      alert("Logged in!");
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
      <div className="mt-14 py-10 mx-4 p-5 h-fit md:p-8 bg-white rounded-lg shadow-lg w-96">
        {/* LOGIN TITLE */}
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        {/* FORM */}
        <form onSubmit={handleSignIn} className="mt-4">
          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* PASSWORD */}
          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* SUBMIT BUTTON */}
          <button
            className="w-full bg-blue-500 font-semibold text-white p-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
            type="submit"
          >
            {loading ? "Logging..." : "Login"}
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
            <img src="./src/assets/google.svg" className="inline mr-2 h-7 w-7" />
          </span>
          Continue with Google
        </button>

        {/* Paragraph AND SignUp */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
