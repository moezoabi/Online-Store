import Navbar from "../components/navbar";
import { CorrectNavbar } from "../homePage/componentHome";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
function Payment() {
  const [redirect, setredirect] = useState();
  const location = useLocation();
  const state = location.state;
  let email;

  if (state != null) {
    email = state.email;
    while (email != undefined && email.email != undefined) {
      email = email.email;
    }
  }
  return (
    <>
      <section>{CorrectNavbar(state)}</section>
      <form className="signupForm" onSubmit="handleSubmit">
        <h1>Payment page</h1>
        <br />
        <label className="USER" for="cardHoldersName">
          Card Holde's Name
        </label>
        <br />
        <input className="word" placeholder="cardHoldersName" />
        <br />
        <br />
        <label className="USER" for="cardNumber">
          Card Number
        </label>
        <br />
        <input className="word" placeholder="cardNumber" />
        <br />
        <br />
        <label className="USER" for="expairationDate">
          Expairation Date
        </label>
        <br />
        <input className="word" placeholder="expairationDate" />
        <br />
        <br />
        <label className="USER" for="cvc">
          CVC
        </label>
        <br />
        <input className="word" placeholder="cvc" />
        <br />
        <br />
        <br />
        <button
          className="signup"
          onClick={() => setredirect(true)}
          type="submit"
        >
          {" "}
          BUY{" "}
        </button>
        <AnotherPage redirect={redirect} email={email} />
      </form>
    </>
  );
}
function AnotherPage({ redirect, email }) {
  const navigate = useNavigate();
  if (redirect == true) {
    return navigate("/", { state: { email: email } });
  } else {
    return null;
  }
}

export default Payment;
