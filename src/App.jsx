import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/menu";

function App() {
  return (
    <Router>
      <Routes>
        {/* Menu route */}
        <Route path="/menu/:id" element={<MenuPage />} />

        {/* 404 catch-all route */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
