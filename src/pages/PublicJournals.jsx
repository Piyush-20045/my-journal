import { NavLink, Link, useLocation } from "react-router-dom";
import Search from "../components/Search";
import { useSearch } from "../SearchContext";

const PublicJournals = () => {
  const location = useLocation();
  const { publicFilteredJournals } = useSearch();

  return (
    <div className="w-full h-full lg:px-40 pt-6 pb-10 bg-gradient-to-b from-slate-400 to-stone-200">
      {/* HEADING , PRIVATE AND PUBLIC btns*/}
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-4 ml-4 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
          All Public Entries ⇩
        </h2>

        <div className="flex items-center mr-1">
          <NavLink
            to="/private-journals"
            className={({ isActive }) =>
              `px-3 py-2 rounded-l-md font-semibold ${
                isActive ? "" : "bg-gray-100 shadow shadow-black"
              }`
            }
          >
            Private
          </NavLink>
          <NavLink
            to="/public-journals"
            className={({ isActive }) =>
              `px-3 py-2 rounded-r-md ${
                isActive ? "text-white bg-blue-800 shadow shadow-black" : ""
              }`
            }
          >
            Public
          </NavLink>
        </div>
      </div>

      {/* SEARCH COMPONENT */}
      <Search mode="public" />

      {/* All journals being rendered */}
      <div className="pl-2 flex justify-center flex-wrap space-x-3 space-y-3">
        {publicFilteredJournals.length > 0 ? (
          publicFilteredJournals.map((journal) => (
            <Link
              to={`/journal/${journal.id}`}
              state={{ from: location.pathname }}
              key={journal.id}
              className="w-80 sm:w-72 border bg-gray-50 border-gray-300 rounded-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* DATE , TIME and Visibility */}
              <div className="flex justify-between">
                <p className="px-1 w-fit text-xs text-gray-700 bg-gray-100 mb-2 border border-gray-300 rounded">
                  {journal.createdAt?.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  , {journal.date}
                </p>
                <span className="px-2 w-fit text-xs text-gray-700 bg-gray-100 mb-2 border border-gray-300 rounded">
                  Public 🌎
                </span>
              </div>
              {/* TITLE */}
              <h3 className="pl-1.5 pt-2 line-clamp-2 text-xl font-bold text-gray-800">
                {journal.title}
              </h3>

              {/* CONTENT */}
              <p
                dangerouslySetInnerHTML={{ __html: journal.content }}
                className="rendered-quill pt-1 pl-2 md:pl-1 text-gray-800 line-clamp-5"
              ></p>
              {/* IMAGE */}
              <img
                className="pt-2 mx-auto my-2 w-64 rounded rounded-t-xl"
                src={journal.imageUrl}
              />
            </Link>
          ))
        ) : (
          <p className="mt-10 text-center text-gray-500 text-3xl">
            No journal entries to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicJournals;
