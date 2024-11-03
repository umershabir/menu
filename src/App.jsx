// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MenuPage from "./pages/menu";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Menu route */}
//         <Route path="/menu/:id" element={<MenuPage />} />

//         {/* 404 catch-all route */}
//         <Route path="*" element={<div>Page not found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContex";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import MenuPage from "./pages/menu";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/menu/:id"
            element={
              <PrivateRoute>
                <MenuPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Redirect to login for unknown routes */}
          <Route
            path="*"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
