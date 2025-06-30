import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { usePost } from "../postContext";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

const SingleJournal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { journals, publicJournals, fetchJournals, fetchPublicJournals } =
    usePost();

  const journal =
    journals.find((j) => j.id === id) ||
    publicJournals.find((j) => j.id === id);

  // Showing if its loading or not found
  if (!journal) return <div className="p-10">Journal not found.</div>;

  // DELETE function
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete it?");
    if (!confirmDelete) return;

    const docRef = doc(db, "journals", id);

    // Delete image permanently from ImageKit
    if (journal.imageFileId) {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/delete-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId: journal.imageFileId }),
      });
    }

    // Delete the journal document from Firestore
    try {
      await deleteDoc(docRef);
      alert("Journal deleted!");
      navigate(location.state?.from || "/private-journals");
      fetchJournals();
      fetchPublicJournals();
    } catch (error) {
      console.error("Error deleting journal", error.message);
      alert("Failed to delete the journal");
    }
  };

  return (
    <div className="px-4 md:px-20 pb-56 p-4 h-full bg-blue-100">
      {/* BACK TO JOURNALS LINK */}
      <Link
        to={location.state?.from || "/private-journals"}
        className="w-48 md:pl-32 text-blue-600 hover:underline font-semibold"
      >
        ← Back to All Journals
      </Link>

      {/* TITLE, DATE, IMG and CONTENT */}
      <div className="flex justify-center">
        <div className="w-full md:w-7/12 lg:w-6/12 border bg-gray-50 border-gray-300 mt-3 py-6 px-5 rounded-2xl shadow-md overflow-x-scroll">
          {/* DATE, TIME and Visibility */}
          <div className="flex justify-between gap-7">
            <p className="px-2 w-fit text-xs text-gray-700 bg-gray-100 mb-2 border border-gray-300 rounded">
              {journal.createdAt?.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              , {journal.date}
            </p>
            <span className="px-2 w-fit text-xs text-gray-700 bg-gray-100 mb-2 border border-gray-300 rounded">
              {journal.visibility.toUpperCase()}
            </span>
          </div>

          {/* TITLE */}
          <h3 className="pl-2 pt-2 line-clamp-2 text-2xl font-bold text-gray-800">
            {journal.title}
          </h3>

          {/* CONTENT */}
          <div
            className="rendered-quill pt-1 pl-3 md:pl-5 text-gray-800"
            dangerouslySetInnerHTML={{ __html: journal.content }}
          ></div>

          {/* IMAGE */}
          <img className="px-2 my-3 rounded-2xl" src={journal.imageUrl} />

          {/* EDIT,DELETE btn */}
          {journal.uid === user?.uid ? (
            <div
              className="px-3 mt-10 flex justify-between"
              style={{ display: user ? "flex" : "none" }}
            >
              <Link
                to={`/edit/${id}`}
                className="px-3 py-2 text-gray-900 font-bold bg-gray-400 rounded-lg cursor-pointer shadow shadow-black hover:bg-gray-500"
              >
                Edit ✎
              </Link>
              <button
                onClick={handleDelete}
                className="px-3 py-2 font-semibold text-white bg-red-600 rounded-lg cursor-pointer shadow shadow-black hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SingleJournal;
