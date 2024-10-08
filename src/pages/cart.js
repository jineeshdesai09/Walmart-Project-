import { useEffect, useState } from "react";
export default function Cart() {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setProducts(cartItems);
  };

  const updateProductCount = (product, countChange) => {
    const updatedCartItems = products.map((item) => {
      if (item.name === product.name) {
        let newCount = item.count + countChange;
        if (newCount < 1) newCount = 1; 
        return { ...item, count: newCount };
      }
      return item;
    });
    setProducts(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const removeProduct = (product) => {
    const updatedCartItems = products.filter((item) => item.name !== product.name);
    setProducts(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Your Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.tags}</td>
              <td>${product.price}</td>
              <td><img src={product.img} width="100" alt={product.name} /></td>
              <td>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateProductCount(product, -1)}>
                    -
                  </button>
                  <span className="mx-2">{product.count || 1}</span> {}
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateProductCount(product, 1)}>
                    +
                  </button>
                </div>
              </td>
              <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                <button
                  onClick={() => removeProduct(product)}
                  type="button"
                  className="btn btn-danger btn-sm">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
