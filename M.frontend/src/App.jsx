import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Login/Home";
import PrivateRoute from "./Routes/PrivateRoute";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
);
}
