import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContex";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import MenuPage from "./pages/menu";
import Login from "./pages/login";
import Profile from "./pages/profile";
import SearchPage from "./pages/search";

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <Routes>
// //           {/* Public routes */}
// //           <Route
// //             path="/login"
// //             element={
// //               <PublicRoute>
// //                 <Login />
// //               </PublicRoute>
// //             }
// //           />

// //           {/* Protected routes */}
// //           <Route
// //             path="/menu/:id"
// //             element={
// //               <PrivateRoute>
// //                 <MenuPage />
// //               </PrivateRoute>
// //             }
// //           />
// //           <Route
// //             path="/menu"
// //             element={
// //               <PrivateRoute>
// //                 <MenuPage />
// //               </PrivateRoute>
// //             }
// //           />
// //           <Route
// //             path="/search"
// //             element={
// //               <PrivateRoute>
// //                 <SearchPage />
// //               </PrivateRoute>
// //             }
// //           />

// //           <Route
// //             path="/profile"
// //             element={
// //               <PrivateRoute>
// //                 <Profile />
// //               </PrivateRoute>
// //             }
// //           />
// //           <Route
// //             path="/menu/:id"
// //             element={
// //               <PrivateRoute>
// //                 <MenuPage />
// //               </PrivateRoute>
// //             }
// //           />
// //           {/* Redirect to login for unknown routes */}
// //           <Route
// //             path="*"
// //             element={
// //               <PublicRoute>
// //                 <Login />
// //               </PublicRoute>
// //             }
// //           />
// //         </Routes>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContex";
// import PrivateRoute from "./components/PrivateRoute";
// import PublicRoute from "./components/PublicRoute";
// import MenuPage from "./pages/menu";
// import Login from "./pages/login";
// import Profile from "./pages/profile";
// import SearchPage from "./pages/search";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public routes */}
//           {/* <Route
//             path="/login"
//             element={
//               <PublicRoute>
//                 <Login />
//               </PublicRoute>
//             }
//           /> */}

//           {/* Protected routes */}
//           <Route
//             path="/menu/:id"
//             element={
//               <PrivateRoute>
//                 <MenuPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/menu"
//             element={
//               <PrivateRoute>
//                 <MenuPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/search"
//             element={
//               <PrivateRoute>
//                 <SearchPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <PrivateRoute>
//                 <Profile />
//               </PrivateRoute>
//             }
//           />

//           {/* Root path redirect */}
//           <Route path="/" element={<Navigate to="/menu/default" replace />} />

//           {/* Redirect unknown routes to menu instead of login */}
//           <Route path="*" element={<Navigate to="/menu/default" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// import { AuthProvider } from "./context/AuthContex";
// import MenuPage from "./pages/menu";
// import Profile from "./pages/profile";
// import SearchPage from "./pages/search";

// App.js
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContex";
// import MenuPage from "./pages/menu";
// import Profile from "./pages/profile";
// import SearchPage from "./pages/search";
import PrivacyPolicy from "./pages/privacy_policy";
import TermsOfService from "./pages/terms_service";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Main menu route that handles both authenticated and non-authenticated states */}
          <Route path="/menu/:id" element={<MenuPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* Protected routes that require authentication */}
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPage />
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

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/menu/:id" replace />} />
          <Route path="*" element={<Navigate to="/menu/:id" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
