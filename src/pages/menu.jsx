// pages/MenuPage.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { supabase } from "../lib/supabase";
import supabase from "../lib/supabase";

const MenuPage = () => {
  const { id } = useParams();
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data, error } = await supabase
          .from("menus")
          .select(
            `
            *,
            categories (
              *,
              items(*)
            )
          `
          )
          .eq("restaurant_id", id)
          .eq("is_active", true);

        if (error) throw error;

        if (data && data.length > 0) {
          setMenuData(data[0]);
          // Set first category as default selected
          setSelectedCategory(data[0].categories[0]?.id);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No menu found</p>
      </div>
    );
  }

  const selectedCategoryData = menuData.categories.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Menu Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">{menuData.name}</h1>
          {menuData.description && (
            <p className="text-sm text-gray-600">{menuData.description}</p>
          )}
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="bg-white shadow-sm sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex overflow-x-auto py-3 gap-3 no-scrollbar">
            {menuData.categories
              .sort((a, b) => a.display_order - b.display_order)
              .map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${
                      selectedCategory === category.id
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {category.name}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Selected Category Items */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {selectedCategoryData && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedCategoryData.name}
              </h2>
              {selectedCategoryData.description && (
                <p className="text-sm text-gray-600">
                  {selectedCategoryData.description}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {selectedCategoryData.items
                .sort((a, b) => a.display_order - b.display_order)
                .filter((item) => item.is_available)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden flex"
                  >
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-24 h-24 object-cover flex-shrink-0"
                      />
                    )}
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="font-semibold text-gray-900">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
