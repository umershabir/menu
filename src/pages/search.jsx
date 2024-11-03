import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, X, Search } from "lucide-react";
import supabase from "../lib/supabase";
import NavBar from "../components/Navbar";
const SearchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // ... (keep your existing useEffect and other code)

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const { data, error } = await supabase
        .from("menus")
        .select(`*, restaurants(name, id)`)
        .ilike("name", `%${query}%`)
        .eq("is_active", true)
        .limit(5);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  // Replace your existing "No Menu Found" return statement with this:
  if (!menuData) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <NavBar />

          <div className="w-full max-w-2xl mx-auto px-3">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {` Search Restaurant's Menus to Order near by you `}
              </h2>
              <p className="text-gray-600 mb-8">
                {` Don't worry! You can search for other restaurant menus below.`}
              </p>
            </div>

            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for restaurant menus..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="w-full px-6 py-4 bg-white rounded-2xl shadow-lg focus:ring-2 focus:ring-orange-500 focus:outline-none pl-14 pr-4 text-lg"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="absolute w-full mt-2 bg-white rounded-2xl shadow-xl overflow-hidden z-50">
                  {searching ? (
                    <div className="p-4 text-center">
                      <Loader2 className="h-6 w-6 animate-spin text-orange-600 mx-auto" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {searchResults.map((menu) => (
                        <button
                          key={menu.id}
                          onClick={() =>
                            navigate(`/menu/${menu.restaurant_id}`)
                          }
                          className="w-full px-6 py-4 text-left hover:bg-orange-50 transition-colors duration-200 flex items-center justify-between group"
                        >
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 capitalize">
                              {menu.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {menu.restaurants?.name}
                            </p>
                          </div>
                          <span className="text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            View Menu →
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : searchQuery.trim() !== "" ? (
                    <div className="p-6 text-center text-gray-500">
                      {` No menus found for "${searchQuery}"`}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                {`  Can't find what you're looking for? `}
                <button
                  onClick={() => navigate("/")}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Browse all restaurants
                </button>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ... (keep the rest of your existing code)
};

export default SearchPage;
