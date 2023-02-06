import "./styleItemsList.css";
//import data from "../data.js";
import ProductList from "./productList";
let data = [];
let executed = false;
function ItemsList({ catFilter, priceFilter }) {
  console.log(catFilter);
  if (!executed) {
    executed = true;
    fetchProducts();
  }
  return <Products catFilter={catFilter} priceFilter={priceFilter}></Products>;
}
function fetchProducts() {
  fetch("/productList")
    .then((response) => response.json())
    .then((res) => {
      data = res.products.slice(0, 99);
      console.log(data);
    });
}
function Products({ catFilter, priceFilter }) {
  let result;
  let productsList = [];
  console.log(catFilter);
  // const options = {
  //     method: 'GET',
  //     headers: {
  //         'X-RapidAPI-Key': '9516da75bamshe3fdf364b0ea658p1c4bb1jsn4ab231a13590',
  //         'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
  //     }
  // };

  // fetch('https://sephora.p.rapidapi.com/products/list?categoryId=cat1830033&pageSize=60&currentPage=1', options)
  //     .then(response => response.json())
  //     .then(response =>{
  //     console.log(response)
  //      let category=response.displayName;
  //      if(response.products)
  //     {
  // //         //productsList=response.products.map((product)=>(<Product item={product} category={category}></Product>));
  //            productsList=response.products.map((product)=>({id:product.productId,image:product.heroImage,name:product.brandName,price:product.currentSku.listPrice,category:category}));
  // //         console.log(productsList);
  //         console.log(JSON.stringify(productsList));
  //     }

  //     })
  //     .catch(err => console.error(err));

  return (
    <ul className="grid">
      <ProductList
        catFilter={catFilter}
        priceFilter={priceFilter}
      ></ProductList>
      {/* {productsList.length ? (
          productsList
        ) :
         (

          <li className="card">No results found</li>
        )} */}
    </ul>
  );
}

// function ProductsCards({ catFilter, priceFilter }) {
//   const [minPrice, maxPrice] = priceFilter;
//   console.log(catFilter);
//   console.log(data);
//   let productsList = data
//     .filter((item) => catFilter === "all" || catFilter === item.category)
//     .filter(
//       (item) =>
//         Number(item.price.substring(1)) >= minPrice &&
//         Number(item.price.substring(1)) <= maxPrice
//     )
//     .map((item) => (
//       <li class="card" name={item.id}>
//         <div class="product-img">
//           <img src={item.image} alt="makeup"></img>
//         </div>
//         <div class="item-name">
//           <p>{item.category}</p>
//           <h3>{item.name}</h3>
//           <p>{item.price}</p>
//           <a href="#" class="buy-btn">
//             <img
//               class="cartIcon"
//               src="https://cdn-icons-png.flaticon.com/128/2438/2438133.png"
//             ></img>
//           </a>
//         </div>
//       </li>
//     ));
//   return productsList;
// }
export default ItemsList;
