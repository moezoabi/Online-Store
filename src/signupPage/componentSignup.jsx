import Login from "../loginPage/componentLogin";
import "./signup.css";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
function Signup() {
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenum] = useState("");
  const [password, setPass] = useState("");
  const [redirect, setredirect] = useState();

  return (
    <>
      <section>
        <Navbar email={null} />
      </section>
      <form className="signupForm">
        <h1> Create an account!</h1>
        <label className="user" for="username">
          Username*
        </label>
        <br />
        <input
          value={username}
          onChange={(e) => setUser(e.target.value)}
          type="user"
          placeholder="enter username"
          className="word"
        />
        <br />
        <br />
        <label className="user" for="email">
          Email*
        </label>
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="enter your email"
          className="word"
        />
        <br />
        <br />
        <label className="user" for="phonenumber">
          Phone Number*
        </label>
        <br />
        <input
          value={phonenumber}
          onChange={(e) => setPhonenum(e.target.value)}
          type="phonenum"
          placeholder=""
          className="word"
        />
        <br />
        <br />
        <label className="user" for="password">
          Password*
        </label>
        <br />
        <input
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          className="word"
        />
        <br />
        <br />
        <br />

        <button
          type="submit"
          onClick={() => {
            SaveChanges(username, email, phonenumber, password);
            setredirect(true);
          }}
          className="signup"
        >
          Signup
        </button>
        <LoginPage redirect={redirect} />
        <p className="txt">
          <Link to="/login">Already have an account?</Link>
        </p>
      </form>
    </>
  );
}
function LoginPage({ redirect }) {
  if (redirect == true) {
    return (
      <main>
        <h1>Registration Success</h1>
        <Navigate to="/login" replace={true} />
      </main>
    );
  } else {
    return null;
  }
}
function SaveChanges(username, email, phonenumber, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      username: username,
      email: email,
      phonenumber: phonenumber,
      password: password,
    }),
  };
  fetch("/SignUp", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

export default Signup;
