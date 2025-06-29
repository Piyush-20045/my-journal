import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Write from "./pages/Write";
import PrivateJournals from "./pages/PrivateJournals";
import SingleJournal from "./pages/SingleJournal";
import Support from "./pages/Support";
import EditJournal from "./pages/EditJournal";
import Profile from "./pages/Profile";
import PublicJournals from "./pages/PublicJournals";
import NotFound from "./pages/NotFound"
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/write" element={<Write />} />
        <Route path="/private-journals" element={<PrivateJournals />} />
        <Route path="/public-journals" element={<PublicJournals />} />
        <Route path="/journal/:id" element={<SingleJournal />} />
        <Route path="/support" element={<Support />} />
        <Route path="/edit/:id" element={<EditJournal />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
