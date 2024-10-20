import "./App.scss";
import { Header, Products, Footer } from "./components";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);

  const addToCart = (product) => {
    const newCart = [...cart, product];

    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getProduct = async () => {
    const response = await axios.get("/products.json");
    const data = response.data;
    setProducts(data);
  };

  const getCategories = (products) => {
    const categoriesLocal = [];

    products.forEach((product) => {
      const category = product.category;
      const categoryExists = categoriesLocal.includes(category);

      if (!categoryExists) categoriesLocal.push(category);
    });
    setCategories(categoriesLocal);
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getCategories(products);
  }, [products]);

  return (
    <div className="App">
      <Header cart={cart} clearCart={clearCart} />
      <Products
        products={products}
        categories={categories}
        addToCart={addToCart}
      />
      <Footer />
    </div>
  );
}

export default App;
