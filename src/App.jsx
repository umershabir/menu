import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/menu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu/:id" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;
