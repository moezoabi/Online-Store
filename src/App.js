import Home from "./homePage/componentHome";
import Signup from "./signupPage/componentSignup";
import Login from "./loginPage/componentLogin";
import Profile from "./profilePage/componentProfile";
import Cart from "./cartPage/componentCart";
import History from "./historyPage/componentHistory";
import Payment from "./paymentPage/componentPayment";
import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import data from "./data.js";
import Navbar from "./components/navbar";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
let executed = false;
async function fetchSaveProducts() {
  if (!executed) {
    executed = true;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ products: data }),
    };
    await fetch("/saveProductList", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
}
function App() {
  //fetchSaveProducts();
  return (
    <main>
      <Routes>
        <Route exact path="/app" element={<App />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/history" element={<History />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/payment" element={<Payment />} />
      </Routes>
    </main>
  );
}

export default App;
