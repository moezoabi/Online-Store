import "./styleNavbar.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
function Navbar(email) {
  
  return (
    <div className="Page">
      <div className="Container">
        <div className="Wrapper ">
          <div className="Frame">
            <div className="Left">
              <h1 className="logo1" Style="text-align:left;float:left;">
                .Fairy
              </h1>
              <h2 className="logo2" Style="text-align:right;float:right;">
                skins
              </h2>
            </div>
            <div className="Center">
              <Link to="/" state={email} className="MenuItem">
                Products
              </Link>
              <Link to="/profile" state={email} className="MenuItem">
                My Profile
              </Link>
              <Link to="/history" state={email} className="MenuItem">
                History
              </Link>
            </div>
            <RightIcons email={email} />
          </div>
        </div>
      </div>
    </div>
  );
}
function RightIcons(email) {
  if (email.email.email == undefined) {
    //console.log("righticon");
    return (
      <div className="Right">
        <img
          className="signupimage"
          src="https://cdn-icons-png.flaticon.com/128/748/748137.png"
        ></img>
        <Link to="/signup">
          <button className="userb" variant="contained">
            Signup
          </button>
        </Link>

        <img
          className="loginimage"
          src="https://cdn-icons-png.flaticon.com/128/3596/3596092.png"
        ></img>
        <Link to="/login">
          <button className="userb" variant="contained">
            Login
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="Right">
        <img
          className="signupimage"
          src="https://cdn-icons-png.flaticon.com/128/2838/2838895.png"
        ></img>
        <Link to="/cart" state={email} className="MenuItem">
          <button className="userb" variant="contained">
            Your cart
          </button>
        </Link>

        <img
          className="loginimage"
          src="https://cdn-icons-png.flaticon.com/128/992/992680.png"
        ></img>
        <Link state={null} to="/" onClick={() => window.location.reload()}>
          <button className="userb" variant="contained">
            log out
          </button>
        </Link>
      </div>
    );
  }
}
export default Navbar;
