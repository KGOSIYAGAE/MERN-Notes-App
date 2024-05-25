import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

export default function App() {
  const routes = (
    <Router>
      <Routes>
        <Route path="/" exact element={<div>Notes App</div>} />
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
      </Routes>
    </Router>
  );

  return <div>{routes}</div>;
}
