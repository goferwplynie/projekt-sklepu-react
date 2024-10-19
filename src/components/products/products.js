import { useState } from "react";
import "./products.scss";

const Products = (props) => {
  const { products, categories, addToCart } = props;
  const [selectedCategory, setSelectedCategory] = useState("");

  const chooseCategory = (category) => setSelectedCategory(category);

  return (
    <div className="app-products-container container">
      <div className="categories">
        <button onClick={() => chooseCategory("")}>all</button>
        {categories.map((category, index) => {
          return (
            <button
              className={selectedCategory === category ? "active" : ""}
              key={index}
              onClick={() => chooseCategory(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
      <div className="products">
        {products
          .filter((product) =>
            selectedCategory ? product.category === selectedCategory : product
          )
          .map((product) => (
            <div key={product.id} className="product">
              <div
                className="img"
                style={{
                  backgroundImage: "url(" + product.img + ")",
                  backgroundSize: "cover",
                }}
              ></div>
              <h4>{product.name}</h4>
              <p className="description" title={product.description}>
                {product.description}
              </p>
              <p className="price">{product.price} PLN</p>
              <button className="btn" onClick={() => addToCart(product)}>
                BUY
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
