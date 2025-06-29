import { useState } from "react";
import { Link } from "react-router-dom";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { usePost } from "../postContext";
import Upload from "../components/Upload";
import "../styles/write.css";
import imageCompression from "browser-image-compression";

const Write = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);

  const {
    date,
    title,
    content,
    setTitle,
    setContent,
    setDate,
    fetchJournals,
    fetchPublicJournals,
    loading,
    setLoading,
    visibility,
    setVisibility,
  } = usePost();

  // handleUpload function for image upload
  const handleUpload = async () => {
    if (!image) return null;

    try {
      // Compress image before upload
      const compressedFile = await imageCompression(image, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const authRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth`);
      const auth = await authRes.json();

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("fileName", compressedFile.name);
      formData.append("publicKey", auth.publicKey);
      formData.append("signature", auth.signature);
      formData.append("expire", auth.expire);
      formData.append("token", auth.token);

      const response = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Image upload failed");
      return data;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // handleSubmit function for text Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !content) {
      alert("Title and content both are required!");
      setLoading(false);
      return;
    }

    // executing handleUpload function
    const imageData = await handleUpload();
    const imageUrl = imageData?.url;
    const fileId = imageData?.fileId;

    try {
      await addDoc(collection(db, "journals"), {
        date,
        visibility,
        title,
        content,
        ...(fileId && { imageFileId: fileId }),
        ...(imageUrl && { imageUrl }),
        createdAt: Timestamp.now(),
        uid: user.uid,
      });
      alert("Journal saved!");
      fetchJournals();
      fetchPublicJournals();
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error saving journal:", error);
      alert("Failed to save journal.");
    }
    setLoading(false);
  };

  return (
    <div className="h-full w-full px-5 sm:px-20 md:px-40 lg:px-60 pt-5 pb-12 bg-gradient-to-b from-slate-400 to-stone-200">
      <div className="flex items-center md:gap-6">
        <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-6 mr-1 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
          Create New Post ✎
        </h1>

        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="h-10 px-1 text-sm bg-gray-50 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="private">Private 🔐</option>
          <option value="public">Public 🌎</option>
        </select>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* DATE */}
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-2 text-gray-700 font-medium">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
          />
        </div>

        {/* IMAGE */}
        <div>
          <Upload image={image} setImage={setImage} />
        </div>

        {/* TITLE */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-medium text-gray-700">
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
        <div className="flex flex-col justify-between">
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
            className="customQuill"
            value={content}
            onChange={setContent}
          />
        </div>

        {/* SUBMIT */}
        <div className="flex justify-center">
          {user ? (
            <button
              type="submit"
              disabled={loading}
              className="p-2 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition cursor-pointer shadow shadow-black"
            >
              {loading ? "Adding..." : "Create Journal"}
            </button>
          ) : (
            <div className="font-semibold text-lg">
              <Link className="underline text-blue-700" to="/login">
                Login
              </Link>{" "}
              to save it!
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Write;
