import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-between items-center h-screen w-full bg-[url(https://ik.imagekit.io/ypiyush/MyJournal/myJournalBgg.jpg?updatedAt=1751129873537)] bg-cover bg-center">
      <div className="md:ml-12 w-full md:w-3/5 flex flex-col items-center mt-16 text-center">
        {/* HEADING */}
        <h2 className="mt-4 md:mt-8 text-3xl md:text-4xl font-extrabold shadow font-mono bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
          Capture Your Thoughts, One Day at a Time
        </h2>
        <p className="mt-3 text-2xl md:text-3xl font-bold shadow bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
          Your Trusted Journaling Companion
        </p>
        {/* START BUTTON */}
        <Link
          to="/write"
          className="mt-3 md:mr-8 px-5 py-2 text-xl font-bold border rounded text-gray-800 border-gray-600 transition-all bg-gray-100 hover:bg-blue-700 hover:text-white shadow shadow-black cursor-pointer"
        >
          Start ➯
        </Link>
      </div>

      {/* FOOTER */}
      <p className="mb-2 flex justify-center w-full font-bold text-gray-700 bg-transparent">
        Made with ❤️ by Piyush Yadav.
      </p>
    </div>
  );
};
export default Home;
