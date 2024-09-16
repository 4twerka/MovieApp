import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MoviePage from "./moviePage/MoviePage";
import Popular from "./popular/Popular";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviePage />} />
        <Route path="/popular" element={<Popular />} />
      </Routes>
    </Router>
  );
}

export default App;
