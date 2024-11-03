// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   User,
//   History,
//   LogOut,
//   Settings,
//   ShoppingBag,
//   Menu as MenuIcon,
//   X,
//   Home,
//   Heart,
//   Clock,
//   ChevronRight,
// } from "lucide-react";
// import supabase from "../lib/supabase";

// const NavBar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isOrderTrayOpen, setIsOrderTrayOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const orderTrayRef = useRef(null);
//   const [orderItems, setOrderItems] = useState([]);

//   // ... (keep your existing user fetch and orderItems logic)

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//       if (
//         orderTrayRef.current &&
//         !orderTrayRef.current.contains(event.target)
//       ) {
//         setIsOrderTrayOpen(false);
//       }
//     };

//     // Close sidebar on escape key
//     const handleEscKey = (event) => {
//       if (event.key === "Escape") {
//         setIsSidebarOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscKey);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscKey);
//     };
//   }, []);

//   // ... (keep your existing updateQuantity and calculateTotal functions)

//   const handleSignOut = async () => {
//     try {
//       await supabase.auth.signOut();
//       setIsSidebarOpen(false);
//       navigate("/login");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   return (
//     <>
//       <nav className="sticky top-0 z-40 bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Burger Menu */}
//             <div className="flex items-center">
//               <button
//                 onClick={() => setIsSidebarOpen(true)}
//                 className="p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
//               >
//                 <MenuIcon className="h-6 w-6" />
//               </button>
//               <button
//                 onClick={() => navigate("/")}
//                 className="ml-4 text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
//               >
//                 FoodieHub
//               </button>
//             </div>

//             {/* Keep your existing Order Tray and User Menu */}
//             <div className="flex items-center space-x-4">
//               {/* ... your existing order tray code ... */}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div className="fixed inset-0 z-50 overflow-hidden">
//           {/* Dark overlay */}
//           <div
//             className="absolute inset-0 bg-black/50 transition-opacity"
//             onClick={() => setIsSidebarOpen(false)}
//           />

//           {/* Sidebar */}
//           <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl">
//             <div className="h-full flex flex-col">
//               {/* Close button */}
//               <div className="px-4 py-3 border-b border-gray-100">
//                 <button
//                   onClick={() => setIsSidebarOpen(false)}
//                   className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* User Profile Section */}
//               {user && (
//                 <div className="px-6 py-8 border-b border-gray-100">
//                   <div className="flex items-center space-x-4">
//                     <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-orange-600">
//                       {user.profile?.avatar_url ? (
//                         <img
//                           src={user.profile.avatar_url}
//                           alt="Profile"
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <div className="h-full w-full bg-orange-100 flex items-center justify-center">
//                           <User className="h-8 w-8 text-orange-600" />
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {user.profile?.full_name || "User"}
//                       </h3>
//                       <p className="text-sm text-gray-500">{user.email}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Navigation Links */}
//               <div className="flex-1 py-4 overflow-y-auto">
//                 <div className="px-4 space-y-1">
//                   <button
//                     onClick={() => {
//                       navigate("/");
//                       setIsSidebarOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
//                   >
//                     <Home className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
//                     <span>Home</span>
//                     <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
//                   </button>

//                   <button
//                     onClick={() => {
//                       navigate("/profile");
//                       setIsSidebarOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
//                   >
//                     <Settings className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
//                     <span>Profile Settings</span>
//                     <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
//                   </button>

//                   <button
//                     onClick={() => {
//                       navigate("/orders");
//                       setIsSidebarOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
//                   >
//                     <History className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
//                     <span>Order History</span>
//                     <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
//                   </button>

//                   <button
//                     onClick={() => {
//                       navigate("/favorites");
//                       setIsSidebarOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
//                   >
//                     <Heart className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
//                     <span>Favorites</span>
//                     <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
//                   </button>
//                 </div>
//               </div>

//               {/* Sign Out Button */}
//               <div className="p-4 border-t border-gray-100">
//                 <button
//                   onClick={handleSignOut}
//                   className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
//                 >
//                   <LogOut className="h-5 w-5" />
//                   <span>Sign Out</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NavBar;
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   User,
//   History,
//   LogOut,
//   Settings,
//   ShoppingBag,
//   Menu as MenuIcon,
//   X,
//   Home,
//   Heart,
//   Clock,
//   ChevronRight,
//   ChefHat,
// } from "lucide-react";
// import supabase from "../lib/supabase";

// const NavBar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [isOrderTrayOpen, setIsOrderTrayOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const orderTrayRef = useRef(null);
//   const [orderItems, setOrderItems] = useState([]);

//   // ... (keep your existing user fetch and orderItems logic)
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//       if (
//         orderTrayRef.current &&
//         !orderTrayRef.current.contains(event.target)
//       ) {
//         setIsOrderTrayOpen(false);
//       }
//     };

//     // Close sidebar on escape key
//     const handleEscKey = (event) => {
//       if (event.key === "Escape") {
//         setIsSidebarOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscKey);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscKey);
//     };
//   }, []);

//   // ... (keep your existing updateQuantity and calculateTotal functions)

//   const handleSignOut = async () => {
//     try {
//       await supabase.auth.signOut();
//       setIsSidebarOpen(false);
//       navigate("/login");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };
//   return (
//     <>
//       <nav className="sticky top-0 z-40 bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="h-16 flex items-center justify-between">
//             {/* Left Side - Burger Menu */}
//             <div className="flex-none">
//               <button
//                 onClick={() => setIsSidebarOpen(true)}
//                 className="p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
//                 aria-label="Menu"
//               >
//                 <MenuIcon className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Center - Restaurant Name */}
//             <div className="flex-1 flex justify-center">
//               <button
//                 onClick={() => navigate("/")}
//                 className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors transform hover:scale-105 duration-200"
//               >
//                 FoodieHub
//               </button>
//             </div>

//             {/* Right Side - Order Tray */}
//             <div className="flex-none">
//               <div className="relative" ref={orderTrayRef}>
//                 <button
//                   onClick={() => setIsOrderTrayOpen(!isOrderTrayOpen)}
//                   className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
//                   aria-label="Order Tray"
//                 >
//                   <ShoppingBag className="h-6 w-6" />
//                   {orderItems.length > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                       {orderItems.length}
//                     </span>
//                   )}
//                 </button>

//                 {/* Order Tray Dropdown */}
//                 {isOrderTrayOpen && (
//                   <div className="absolute right-0 mt-2 w-96 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden">
//                     {/* ... (keep your existing order tray dropdown content) ... */}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div className="fixed inset-0 z-50 overflow-hidden">
//           {/* Dark overlay */}
//           <div
//             className="absolute inset-0 bg-black/50 transition-opacity"
//             onClick={() => setIsSidebarOpen(false)}
//           />

//           {/* Sidebar */}
//           <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
//             <div className="h-full flex flex-col">
//               {/* Close button */}
//               <div className="px-4 py-3 border-b border-gray-100">
//                 <button
//                   onClick={() => setIsSidebarOpen(false)}
//                   className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* User Profile Section */}
//               {user && (
//                 <div className="px-6 py-8 border-b border-gray-100 bg-orange-50">
//                   <div className="flex items-center space-x-4">
//                     <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-orange-600 shadow-lg">
//                       {user.profile?.avatar_url ? (
//                         <img
//                           src={user.profile.avatar_url}
//                           alt="Profile"
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <div className="h-full w-full bg-orange-100 flex items-center justify-center">
//                           <User className="h-8 w-8 text-orange-600" />
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {user.profile?.full_name || "User"}
//                       </h3>
//                       <p className="text-sm text-gray-500">{user.email}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Navigation Links */}
//               <div className="flex-1 py-4 overflow-y-auto">
//                 <div className="px-4 space-y-1">
//                   <button
//                     onClick={() => {
//                       navigate("/");
//                       setIsSidebarOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
//                   >
//                     <Home className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
//                     <span>Home</span>
//                     <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
//                   </button>

//                   <button
//                     onClick={() => {
//                       navigate("/profile");
//                       setIsSidebarOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
//                   >
//                     <Settings className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
//                     <span>Profile Settings</span>
//                     <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
//                   </button>

//                   <button
//                     onClick={() => {
//                       navigate("/orders");
//                       setIsSidebarOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
//                   >
//                     <History className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
//                     <span>Order History</span>
//                     <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
//                   </button>

//                   <button
//                     onClick={() => {
//                       navigate("/favorites");
//                       setIsSidebarOpen(false);
//                     }}
//                     className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
//                   >
//                     <Heart className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
//                     <span>Favorites</span>
//                     <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
//                   </button>
//                 </div>
//               </div>

//               {/* Sign Out Button */}
//               <div className="p-4 border-t border-gray-100">
//                 <button
//                   onClick={handleSignOut}
//                   className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
//                 >
//                   <LogOut className="h-5 w-5" />
//                   <span>Sign Out</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NavBar;
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  History,
  LogOut,
  Settings,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Home,
  Heart,
  ChevronRight,
  ChefHat,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import supabase from "../lib/supabase";

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOrderTrayOpen, setIsOrderTrayOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const orderTrayRef = useRef(null);
  const sidebarRef = useRef(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      // Fetch user data
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setUser({ ...user, profile });

        // Fetch order items
        const { data: orders } = await supabase
          .from("order_items")
          .select("*, menu_items(*)")
          .eq("user_id", user.id)
          .eq("status", "pending");

        setOrderItems(orders || []);
      }
    };

    fetchUserAndOrders();

    // Handle clicks outside components
    const handleClickOutside = (event) => {
      if (
        orderTrayRef.current &&
        !orderTrayRef.current.contains(event.target)
      ) {
        setIsOrderTrayOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    // Handle escape key
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsOrderTrayOpen(false);
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const updateQuantity = async (itemId, increment) => {
    const item = orderItems.find((i) => i.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + increment;

    try {
      if (newQuantity < 1) {
        // Remove item
        await supabase.from("order_items").delete().eq("id", itemId);

        setOrderItems(orderItems.filter((i) => i.id !== itemId));
      } else {
        // Update quantity
        await supabase
          .from("order_items")
          .update({ quantity: newQuantity })
          .eq("id", itemId);

        setOrderItems(
          orderItems.map((i) =>
            i.id === itemId ? { ...i, quantity: newQuantity } : i
          )
        );
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const calculateTotal = () => {
    return orderItems
      .reduce((total, item) => {
        return total + parseFloat(item.menu_items.price) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setIsSidebarOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Left - Burger Menu */}
            <div className="flex-none">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                aria-label="Menu"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Center - Restaurant Name */}
            <div className="flex-1 flex justify-center">
              <button
                onClick={() => navigate("/")}
                className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors transform hover:scale-105 duration-200"
              >
                FoodieHub
              </button>
            </div>

            {/* Right - Order Tray */}
            <div className="flex-none">
              <div className="relative" ref={orderTrayRef}>
                <button
                  onClick={() => setIsOrderTrayOpen(!isOrderTrayOpen)}
                  className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
                  aria-label="Order Tray"
                >
                  <ShoppingBag className="h-6 w-6" />
                  {orderItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {orderItems.length}
                    </span>
                  )}
                </button>

                {/* Order Tray Dropdown */}
                {isOrderTrayOpen && (
                  <div className="absolute right-0 mt-2 w-96 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 bg-orange-50">
                      <div className="flex items-center">
                        <ChefHat className="h-5 w-5 text-orange-600 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order Tray
                        </h3>
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {orderItems.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p>Your order tray is empty</p>
                          <button
                            onClick={() => {
                              navigate("/menu");
                              setIsOrderTrayOpen(false);
                            }}
                            className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                          >
                            Browse Menu
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="divide-y divide-gray-100">
                            {orderItems.map((item) => (
                              <div
                                key={item.id}
                                className="p-4 hover:bg-gray-50"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">
                                      {item.menu_items.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                      ${item.menu_items.price}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() =>
                                        updateQuantity(item.id, -1)
                                      }
                                      className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="text-sm font-medium w-8 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        updateQuantity(item.id, -item.quantity)
                                      }
                                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Total and Checkout */}
                          <div className="p-4 bg-gray-50 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-sm font-medium text-gray-900">
                                Total
                              </span>
                              <span className="text-lg font-semibold text-orange-600">
                                ${calculateTotal()}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                navigate("/checkout");
                                setIsOrderTrayOpen(false);
                              }}
                              className="w-full bg-orange-600 text-white rounded-lg px-4 py-2 hover:bg-orange-700 transition-colors"
                            >
                              Proceed to Checkout
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
          >
            <div className="h-full flex flex-col">
              {/* Close button */}
              <div className="px-4 py-3 border-b border-gray-100">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* User Profile Section */}
              {user && (
                <div className="px-6 py-8 border-b border-gray-100 bg-orange-50">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-orange-600 shadow-lg">
                      {user.profile?.avatar_url ? (
                        <img
                          src={user.profile.avatar_url}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-orange-100 flex items-center justify-center">
                          <User className="h-8 w-8 text-orange-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.profile?.full_name || "User"}
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="flex-1 py-4 overflow-y-auto">
                <div className="px-4 space-y-1">
                  <button
                    onClick={() => {
                      navigate("/");
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
                  >
                    <Home className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
                    <span>Home</span>
                    <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
                  </button>

                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
                  >
                    <Settings className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
                    <span>Profile Settings</span>
                    <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
                  </button>

                  <button
                    onClick={() => {
                      navigate("/orders");
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
                  >
                    <History className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
                    <span>Order History</span>
                    <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
                  </button>

                  <button
                    onClick={() => {
                      navigate("/favorites");
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg group transition-colors"
                  >
                    <Heart className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
                    <span>Favorites</span>
                    <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-orange-600" />
                  </button>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
