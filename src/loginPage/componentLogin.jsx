import { useState, onFormSwitch } from "react";
import Signup from "../signupPage/componentSignup";
import "./login.css";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getDefaultNormalizer } from "@testing-library/react";

function Login() {
  const [auth, setAuth] = useState();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(auth);
  };
  console.log(auth);
  return (
    <>
      <section>
        <Navbar email={null} />
      </section>
      <form className="signupForm" onSubmit={handleSubmit}>
        <h1> Hi, Welcome Back!</h1>
        <br />
        <label className="user" for="email">
          Email*
        </label>
        <br />
        <input
          className="word"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="enter your email"
          id="word"
        />
        <br />
        <br />
        <label className="user" for="password">
          Password*
        </label>
        <br />
        <input
          className="word"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
        />
        <br />
        <PassWrong auth={auth}></PassWrong>
        <br />

        <button
          className="signup"
          type="submit"
          onClick={() =>
            checkUser(email, password).then((result) => {
              setAuth(result);
            })
          }
        >
          Login
        </button>

        <br />

        <ForApp auth={auth} email={email}></ForApp>
        <></>
        <p className="txt">
          <Link to="/signup">Don't have an account?</Link>
        </p>
      </form>
    </>
  );
}
function PassWrong({ auth }) {
  if (auth == false) {
    return (
      <h className="PassWrong">
        Your email or password is incorrect Please try again
      </h>
    );
  }
}
async function checkUser(email, password) {
  console.log(email);
  let flag = false;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  };
  await fetch("/LogIn", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.answer == "correct Password") {
        console.log("im in");
        flag = true;
      } else {
        flag = false;
      }
    });
  return flag;
}
function ForApp(prop) {
  const navigate = useNavigate();
  console.log(prop);
  console.log(prop.auth);
  if (prop.auth === true) {
    //return(<Navigate replace to="/home"/>)
    console.log("yep!");
    console.log(prop.email);
    return navigate("/", { state: { email: prop.email } });
    //return(navigate('/home'))
  } else {
    return null;
  }
}

export default Login;
