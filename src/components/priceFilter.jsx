import React from "react";
import "./stylePriceFilter.css";
function PriceFilter({ priceFilter, setPriceFilter }) {
  return (
    <fieldset>
      <legend>
        <strong>Price</strong>
      </legend>
      <label htmlFor="min-price">
        Min price
        <input
          type="range"
          id="min-price"
          min="0"
          max="100"
          step="20"
          value={priceFilter[0]}
          onChange={(e) => setPriceFilter([e.target.value, priceFilter[1]])}
        />
      </label>
      <label htmlFor="max-price">
        Max price
        <input
          type="range"
          id="max-price"
          min="10"
          max="100"
          step="20"
          value={priceFilter[1]}
          onChange={(e) => setPriceFilter([priceFilter[0], e.target.value])}
        />
      </label>
    </fieldset>
  );
}

export default PriceFilter;
