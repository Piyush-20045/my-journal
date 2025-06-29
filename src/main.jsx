import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import { PostProvider } from "./postContext.jsx";
import { SearchProvider } from "./SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <PostProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </PostProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
