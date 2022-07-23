import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home/Home";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register"; 
import Card from "./components/home/Card";
import AddProduct from "./components/addProduct/AddProduct";
import BannerAdd from "./components/addProduct/BannerAdd";
import AddCategory from "./components/addProduct/AddCategory";
import Basket from "./components/basket/Basket";
import {  Context } from "./Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import Profil from "./components/auth/profil/Profil";
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <ToastContainer />
        <Context>
        <Routes>
          <Route index element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Profil />} path="/profil" />
          <Route element={<Card />} path="/:id" />
          <Route element={<Basket />} path="/basket" />
          <Route element={<AddProduct />} path="/add" />
          <Route element={<AddCategory />} path="/category" />
          <Route element={<BannerAdd />} path="/banner" />
        </Routes>
        </Context>
      </BrowserRouter>
    </div>
  );
}

export default App;
