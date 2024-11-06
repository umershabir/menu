import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2, X, LogIn } from "lucide-react";
import supabase from "../lib/supabase";
import NavBar from "../components/Navbar";
import { useAuth } from "../context/AuthContex";
import { Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const MenuPage = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  const {
    user,
    signInWithGoogle,
    loading: authLoading,
    isAuthenticated,
  } = useAuth();
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add this computed value for the selected category data
  const selectedCategoryData = menuData?.categories?.find(
    (category) => category.id === selectedCategory
  );
  useEffect(() => {
    if (!isAuthenticated || !id) {
      setLoading(false);
      return;
    }

    const fetchMenu = async () => {
      try {
        const { data, error } = await supabase
          .from("menus")
          .select(`*, categories (*, items(*))`)
          .eq("restaurant_id", id)
          .eq("is_active", true)
          .single();

        if (error) throw error;

        if (data) {
          setMenuData(data);
          setSelectedCategory(data.categories[0]?.id);
        }
      } catch (error) {
        console.error("Menu fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id, isAuthenticated]);

  // Sign in handler
  const handleSignIn = () => {
    signInWithGoogle().catch((error) => {
      console.error("Sign in failed:", error);
    });
  };

  // Auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center flex h-[90vh] flex-col justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Sign in screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative overflow-hidden bg-gray-900 text-white min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-red-900/90" />
          <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
            <div className="text-center max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Welcome to Our Menu
              </h1>
              <p className="text-xl text-gray-300 mb-12">
                Sign in to view our delicious menu and explore our offerings
              </p>
              <button
                onClick={handleSignIn}
                className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 font-medium text-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl transform hover:-translate-y-1"
              >
                <LogIn className="w-6 h-6 mr-3" />
                Sign in with Google
              </button>
            </div>
            <div className="mt-4 text-center text-sm text-white">
              <p>
                By signing in, you agree to our{" "}
                <Link
                  to="/terms-of-service"
                  className="font-medium text-white underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="font-medium text-white underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Render loading state while fetching menu
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="text-center flex h-[90vh] flex-col justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Loading menu...</p>
        </div>
      </div>
    );
  }

  // Render no menu found state
  if (!menuData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="text-center max-w-md mx-auto px-4 h-[90vh] flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Menu Found
          </h2>
          <p className="text-gray-600">
            We couldn't find the menu you're looking for. Please check the URL
            and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-red-900/90" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 capitalize">
            {menuData.name}
          </h1>
          <p className="text-xl text-gray-300">{menuData.description}</p>
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto py-4 gap-4 no-scrollbar text-nowrap px-2">
            {menuData.categories
              .sort((a, b) => a.display_order - b.display_order)
              .map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 capitalize
                    ${
                      selectedCategory === category.id
                        ? "bg-orange-600 text-white shadow-lg transform scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {category.name}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Category Description */}
      {selectedCategoryData && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
              {selectedCategoryData.name}
            </h2>
            <p className="text-gray-600">{selectedCategoryData.description}</p>
          </div>
        </div>
      )}

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedCategoryData?.items
            .sort((a, b) => a.display_order - b.display_order)
            .filter((item) => item.is_available)
            .map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setIsModalOpen(true);
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-block px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-900">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-medium text-gray-900 capitalize">
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold text-orange-600">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="absolute inset-0 bg-black opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="relative h-96">
                <img
                  src={selectedItem.image_url}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2 capitalize">
                    {selectedItem.name}
                  </h3>
                  <p className="text-2xl font-semibold text-orange-400">
                    {selectedItem.price}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  {selectedItem.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {selectedItem.is_available ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800">
                      Not Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
