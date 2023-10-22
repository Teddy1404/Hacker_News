import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import PostDetail from "./components/PostPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Hacker_News" element={<Search />} />
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
