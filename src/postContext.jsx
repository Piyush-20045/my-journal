import { useEffect, useState, createContext, useContext } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./AuthContext";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // for Text data
  const todayDate = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(todayDate);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("private");

  // For all journals
  const [journals, setJournals] = useState([]);  //private Journals
  const [publicJournals, setPublicJournals] = useState([]);

  // Fetching All private journals
  const fetchJournals = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, "journals"),
        where("uid", "==", user.uid),
        where("visibility", "==", "private"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setJournals(data);
    } catch (error) {
      console.error("Error fetching journals:", error.message);
      alert("Failed to load journals.");
    }
  };
  useEffect(() => {
    // CHECKING if USER IS LOADED THEN PASSING THE UID because before loading the user, the uid value is showing null and no journal is rendered
    if (user) {
      fetchJournals();
    }
  }, [user]);

  // Fetching All public journals
  const fetchPublicJournals = async () => {
    try {
      const q = query(
        collection(db, "journals"),
        where("visibility", "==", "public"),
        orderBy("createdAt", "desc")
      );

      const snapShot = await getDocs(q);
      const data = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPublicJournals(data);
    } catch (error) {
      console.error("Error fetching journals:", error.message);
      alert("Failed to load journals.");
    }
  };
  useEffect(() => {
    fetchPublicJournals();
  }, [user]);

  return (
    <PostContext.Provider
      value={{
        loading,
        setLoading,
        date,
        title,
        content,
        visibility,
        setTitle,
        setContent,
        setDate,
        setVisibility,
        journals,
        setJournals,
        fetchJournals,  //function for fetching private journals
        fetchPublicJournals, //function for fetching public journals
        publicJournals,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export function usePost() {
  return useContext(PostContext);
}
