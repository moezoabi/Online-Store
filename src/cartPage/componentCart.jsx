import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styleCart.css";
import Navbar from "../components/navbar";
import { useLocation } from "react-router-dom";
import { CorrectNavbar } from "../homePage/componentHome";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Cart() {
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
  const cartFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const historyFromStorage = JSON.parse(
    localStorage.getItem("history") || "[]"
  );
  const [cart, setCart] = useState(cartFromStorage);
  const [history, setHistory] = useState(historyFromStorage);
  const removeCart = async (productToremove) => {
    //setCart(cart.filter((product) => product !== productToremove));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        id: productToremove.id,
      }),
    };
    await fetch("/deleteItemCart", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  //   useEffect(() => {
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   }, [cart]);

  let getCart = async () => {
    //console.log(email);
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
    await fetch("/getCart", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cart);
      });
  };

  //********************newwwwww****** */
  const addToHistory = async () => {
    console.log("hi");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        cart: cart,
      }),
    };
    await fetch("/addCartToHistory", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    clearCart();
  };
  const clearCart = async () => {
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
    await fetch("/clearCart", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const getTotalsum = () => {
    return cart.reduce((sum, { price }) => sum + +price, 0);
  };
  //************************************ */
  //useEffect(() => {
  getCart();
  // });
  return (
    <>
      <section>{CorrectNavbar(state)}</section>
      <main>
        <h1></h1>
        <h1>Your cart</h1>
        <table className="cart">
          <tr>
            {cart.map((product, idx) => (
              <div key={idx}>
                <td className="timg">
                  <img src={product.image} alt={product.name} />
                </td>
                <td className="tdis">
                  {product.name}${product.price}
                  {product.category}
                  <button onClick={() => removeCart(product)}>remove</button>
                </td>
              </div>
            ))}
          </tr>
        </table>
        {cart.length > 0 && (
          <button className="button3" onClick={clearCart}>
            Clear Cart
          </button>
        )}{" "}
        <div className="bottom">
          <p className="total">Total : ${getTotalsum()} </p>
          <button className="buttons button1">Continue Shopping</button>
          <button
            onClick={() => {
              addToHistory().then(setredirect(true));
            }}
            className="buttons button2"
          >
            Check Out
          </button>
          <AnotherPage redirect={redirect} email={email} />
          <p className="terms">
            By selecting ‘Check Out’ you are agreeing to our Terms & Conditions
          </p>
        </div>
      </main>
    </>
  );
}
function AnotherPage({ redirect, email }) {
  const navigate = useNavigate();
  if (redirect == true) {
    return navigate("/payment", { state: { email: email } });
  } else {
    return null;
  }
}
