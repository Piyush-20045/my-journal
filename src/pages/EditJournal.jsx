import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import Upload from "../components/Upload";
import { usePost } from "../postContext";
import { useAuth } from "../AuthContext";

const EditJournal = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchJournals, fetchPublicJournals, loading, setLoading } = usePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("");
  const [image, setImage] = useState(null);

  // handleUpload function for image upload
  const handleUpload = async () => {
    if (!image) return;

    const authRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth`);
    const auth = await authRes.json();

    const formData = new FormData();

    formData.append("file", image);
    formData.append("fileName", image.name);
    formData.append("publicKey", auth.publicKey);
    formData.append("signature", auth.signature);
    formData.append("expire", auth.expire);
    formData.append("token", auth.token);

    try {
      const response = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // fetching the data
  useEffect(() => {
    const fetchJournal = async () => {
      const docRef = doc(db, "journals", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setContent(data.content);
        setVisibility(data.visibility);
        setImage(data.imageUrl || "");
      } else {
        alert("Journal not found.");
      }
    };
    fetchJournal();
  }, []);

  //   Update handling function
  const handleUpdate = async (e) => {
    e.preventDefault();
    // executing handleUpload function
    setLoading(true);

    const imageUrl = await handleUpload();

    try {
      await updateDoc(doc(db, "journals", id), {
        title,
        content,
        visibility,
        ...(imageUrl && { imageUrl }),
      });
      alert("Journal updated!");
      fetchJournals();
      fetchPublicJournals();
      navigate(`/journal/${id}`);
    } catch (error) {
      alert("Failed to update journal.");
      console.error("Error in saving the journal", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-5 h-full w-full bg-blue-100">
      {/* BACK TO JOURNALS LINK */}
      <Link
        to={`/journal/${id}`}
        className="w-full md:pl-48 text-blue-600 hover:underline font-semibold"
      >
        ←Back to Journal
      </Link>

      {/* Journal */}
      <div className="mt-3 flex justify-center">
        <div className="h-fit px-6 md:px-9 py-8 pt-5 md:w-7/12 bg-gray-50 rounded-2xl">
          {/* heading and Visibility */}
          <div className="flex gap-5 md:gap-12 mb-5 mt-1">
            <h2 className="text-2xl font-bold text-gray-700">Edit Journal</h2>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="h-10 px-1 text-sm bg-gray-50 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="private">Private 🔐</option>
              <option value="public">Public 🌎</option>
            </select>
          </div>

          {/* IMAGE */}
          <div>
            <Upload image={image} setImage={setImage} />
          </div>

          {/* TITLE */}
          <div className="mt-4 flex flex-col">
            <label htmlFor="title" className="font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter your journal title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-800"
              required
            />
          </div>

          {/* CONTENT , REACTQUILL */}
          <div className="mt-4 flex flex-col justify-between">
            <label htmlFor="content" className="mb-2 font-medium text-gray-700">
              Write your thoughts...
            </label>
            <ReactQuill
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline"],
                  ["link"],
                  [{ list: "ordered" }],
                  ["clean"],
                ],
              }}
              id="content"
              placeholder="Write more here..."
              className="h-60 max-h-[400px] mb-2 text-gray-800 bg-white"
              value={content}
              onChange={setContent}
            />
          </div>
          {/* Save BTN */}
          {user ? (
            <div className="flex justify-center">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white mt-24 md:mt-16 px-4 py-2 rounded-md cursor-pointer"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EditJournal;
