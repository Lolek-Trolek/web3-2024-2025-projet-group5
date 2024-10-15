import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MemeList from "../MemeList/MemeList";
import AddMeme from "../AddMeme/AddMeme";
import SystemInfo from "../SystemInfo/SystemInfo"; // Ensure SystemInfo exists
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home"

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/meme-list" element={<MemeList />} />
        <Route path="/add-meme" element={<AddMeme />} />
        <Route path="/system-info" element={<SystemInfo />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
