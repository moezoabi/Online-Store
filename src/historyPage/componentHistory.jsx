// import "../cartPage/styleCart.css"; 
import "./styleHistory.css";
import Navbar from "../components/navbar";
import HistoryList from "../components/historyList";
import { useLocation } from "react-router-dom";
import { CorrectNavbar } from "../homePage/componentHome";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function History() {
  const location = useLocation();
  const state = location.state;
  const historyFromStorage = JSON.parse(
    localStorage.getItem("history") || "[]"
  );
  const [history, setHistory] = useState(historyFromStorage);
  let email;
  if (state != null && state.email != undefined) {
    email = state.email;
    while (email != undefined && email.email != undefined) {
      email = email.email;
    }
  } else {
    return (
      <main>
        <section>{CorrectNavbar(state)}</section>
        <h1>you must login!</h1>
      </main>
    );
  }
  const getHistory = async () => {
    console.log(email);
    //setCart(cart.filter((product) => product !== productToremove));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    };
    await fetch("/getHistory", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setHistory(data.history);
      });
  };
  //useEffect(() => {
  getHistory();
  // });
  return (
    <>
      <section>{CorrectNavbar(state)}</section>
      <h1></h1>
      <main className="listhistory">
        <h1>Your History</h1>

        <table className="cart">
          <tr>
            {history.map((product,idx) => (
              <div key={idx}>
                <td className="timg">
                  <img src={product.image} alt={product.name} />
                </td>
                <td className="tdis">
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                  <p>{product.category}</p>
                </td>
              </div>
            ))}
          </tr>
        </table>
      </main>
    </>
  );
}
export default History;
