import React from "react";
import data from "../data.js";

export default function ProductList({
  addToCart,
  priceFilter,
  query,
  catFilter,
  email,
}) {
  const [minPrice, maxPrice] = priceFilter;
  console.log(email);
  if (query.length != 0) {
    return (
      <>
        <div className="container">
          {data
            .filter((product) => product.name.includes(query))
            .map((product, idx) => (
              <div class="card" key={idx}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
                <p>{product.category}</p>
                <UserOrGuest
                  email={email}
                  addToCart={addToCart}
                  product={product}
                ></UserOrGuest>
              </div>
            ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container">
        {data
          .filter((item) => catFilter === "all" || catFilter === item.category)
          .filter(
            (item) =>
              Number(item.price) >= minPrice && Number(item.price) <= maxPrice
          )
          .map((product, idx) => (
            <div class="card" key={idx}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <h4>${product.price}</h4>
              <p>{product.category}</p>
              <UserOrGuest
                email={email}
                addToCart={addToCart}
                product={product}
              ></UserOrGuest>
            </div>
          ))}
      </div>
    </>
  );
}
function UserOrGuest({ email, addToCart, product }) {
  //console.log(email);
  if (email != undefined && email != "") {
    return <button onClick={() =>  addToCart(product)}>add</button>;
  } else {
    return null;
  }
}
