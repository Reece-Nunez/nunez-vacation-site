import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FloridaGetaway from "./pages/FloridaGetaway";
import CoastalCottage from "./pages/CoastalCottage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/florida-getaway" element={<FloridaGetaway />} />
      <Route path="/coastal-cottage" element={<CoastalCottage />} />
    </Routes>
  );
}

export default App;
