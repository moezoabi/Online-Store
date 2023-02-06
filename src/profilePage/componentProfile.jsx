import { useState } from "react";
import Login from "../loginPage/componentLogin";
import "./styleProfile.css";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CorrectNavbar } from "../homePage/componentHome";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
let executed = false;
async function fetchProfile(email) {
  let user;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email: { email } }),
  };
  await fetch("/profile", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.user);
      user = data.user;
    });
  console.log(user);
  return user;
}

function Profile() {
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenum] = useState("");
  const [password, setPass] = useState("");

  const location = useLocation();
  const state = location.state;
  console.log(state);
  {
    if (state == null) {
      return (
        <main>
          <section>{CorrectNavbar(state)}</section>
          <form className="profileForm">
            <h1>You must login!</h1>
          </form>
        </main>
      );
    }
    if (state.email != null) {
      const { email } = state;
      console.log(email);
      return UserProfile(email, state);
    } else
      return (
        <main>
          <section>{CorrectNavbar(state)}</section>
          <form className="profileForm">
            <h1>You must login!</h1>
          </form>
        </main>
      );
  }
}
function GuestProfile() {
  const navigate = useNavigate();
  return navigate("/signin");
}

function UserProfile(emailUser, state) {
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenum] = useState("");
  const [password, setPass] = useState("");
  const [user, setUserFetch] = useState("");
  let res;
  console.log(user);
  if (user == "") {
    fetchProfile(emailUser).then((result) => {
      res = result;
      setUserFetch(res);
    });
    executed = true;
  }

  console.log(user);

  return (
    <>
      <section>{CorrectNavbar(state)}</section>
      <form className="profileForm">
        <h1> Profile</h1>
        <label className="user" for="username">
          Username
        </label>
        <br />
        <input
          value={username}
          onChange={(e) => setUser(e.target.value)}
          type="user"
          placeholder={user.username}
          className="word"
        />
        <br />
        <br />
        <label className="user" for="email">
          Email
        </label>
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={user.email}
          className="word"
        />
        <br />
        <br />
        <label className="user" for="phonenumber">
          Phone Number
        </label>
        <br />
        <input
          value={phonenumber}
          onChange={(e) => setPhonenum(e.target.value)}
          type="phonenum"
          placeholder={user.phonenumber}
          className="word"
        />
        <br />
        <br />

        <br />
        <button
          type="submit"
          onClick={() => {
            SaveChanges(user.id, username, email, phonenumber);
          }}
          className="signup"
        >
          save changes
        </button>
      </form>
    </>
  );
}
function SaveChanges(id, username, email, phonenumber) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      id: id,
      username: username,
      email: email,
      phonenumber: phonenumber,
    }),
  };
  fetch("/updateProfile", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
export default Profile;
