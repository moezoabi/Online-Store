import "./styleItemsList.css";
import React from "react";
// import ItemsList from './itemsList'
import ProductList from "./productList";
import ComponentCart from "../cartPage/componentCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import Navbar from './navbar';
import { useEffect } from "react";

const PAGE_CART = "/cart";
const cartFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");

function List({ catFilter, priceFilter, state }) {
  const [query, setQuery] = useState("");
  const [email, setEmail] = React.useState("");
  let email1;
  useEffect(() => {
    if (state != undefined) {
      email1 = state.email;
      while (email1 != undefined && email1.email != undefined) {
        email1 = email1.email;
      }
      console.log(email1);
      setEmail(email1);
    }
  });
  const [cart, setCart] = useState(cartFromStorage);

  const addToCart = async (product) => {
    //setCart([...cart, { ...product }]);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        category: product.category,
      }),
    };
    await fetch("/addItemCart", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  const removeCart = (productToremove) => {
    setCart(cart.filter((product) => product !== productToremove));
  };

  //   useEffect(() => {
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   }, [cart]);

  const navigate = useNavigate();

  console.log(email);
  return (
    <div>
      {/* <button onClick={()=> navigate(PAGE_CART)} >cart {cart.length}</button> */}
      <div className="searchProduct">
        <input
          type="text"
          placeholder="Search....."
          className="word"
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul className="list">
          {/* {data
            .filter((item) => item.name.includes(query))
            .map((item) => (
              <li key={user.id}>{item.name}</li>
            ))} */}
        </ul>
      </div>
      <ProductList
        catFilter={catFilter}
        priceFilter={priceFilter}
        query={query}
        addToCart={addToCart}
        email={email}
      />
    </div>
  );
}

export default List;
