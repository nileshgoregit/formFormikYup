import React from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CombineForm from "./components/CombineForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CombineForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
