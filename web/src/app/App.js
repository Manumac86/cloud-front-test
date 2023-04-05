import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from '../components/Register';
import Login from '../components/Login';
import BuildingList from '../layouts/buildings_list';
import BuildingMetrics from '../layouts/buildings_metrics'
import BookmarksList from "../layouts/bookmarks_list";


function App() {
  return (
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path="/bookmarks" element={<BookmarksList />} />
        <Route path="/buildings" element={<BuildingList />} />
        <Route path="/buildings/:buildingId" element={<BuildingMetrics />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
