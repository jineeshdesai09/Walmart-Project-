import { useEffect, useState } from "react";

export function Products(props) {
  let { search } = props;
  let [data, setData] = useState([
    {
      name: "name",
      brand: "Brand",
      tags: "Category",
      img: "",
      price: ""
    }
  ]);

  useEffect(() => {
    fetch("http://localhost:9999/product/" + search)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  }, [search]);

  const addToCart = (prod) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let existingProduct = cartItems.find(item => item.name === prod.name);
  
    if (existingProduct) {
      existingProduct.count += 1;
    } else {
      
      cartItems.push({ ...prod, count: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); 
    alert("Product added to cart!");
  };
  

  let formattedData = data.map((prod, index) => (
    <div className="card col-3 m-3" style={{ width: "18rem", height: "60vh" }} key={index}>
      <img
        src={prod.img}
        style={{ height: "50%", objectFit: "contain", background: "rgb(0,0,0)" }}
        className="card-img-top"
        alt={prod.name}
      />
      <div className="card-body">
        <h4 className="card-title">{prod.name}</h4>
        <h5 className="card-title">$ {prod.price}</h5>
        <div className="d-flex justify-content-evenly">
          <p className="card-text">
            {prod.brand}
            <hr />
          </p>
          <p className="card-text">
            {prod.tags}
            <hr />
          </p>
        </div>
        <button className="btn btn-outline-primary" onClick={() => addToCart(prod)}>
          Add to Cart
        </button>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="row">{formattedData}</div>
    </div>
  );
}
