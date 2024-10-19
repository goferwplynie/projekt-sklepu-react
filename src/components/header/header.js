import "./header.scss";
import CartIcon from "./cart.icon";
import React, { useState, useEffect } from "react";
import Products from "../products/products";

const Header = (props) => {
  const { cart, removeFromCart, promoCodes } = props;
  const [cartState, setCartState] = useState(false);
  const [localCart, setLocalCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [validPromoCodes, setValidPromoCodes] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setPromoCode(e.target.value);
  };

  const addPromoCodes = () => {
    promoCodes.forEach((code) => {
      let newValidCodes = [...validPromoCodes, code.name];
      setValidPromoCodes(newValidCodes);
    });
  };

  useEffect(() => {
    addPromoCodes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validPromoCodes.includes(promoCode)) {
      setMessage("Promo code applied successfully!");
    } else {
      setMessage("Invalid promo code.");
    }

    setPromoCode("");
  };

  const cartClick = () => setCartState(!cartState);

  useEffect(() => {
    const setUpCart = (cart) => {
      const item = {
        id: null,
        name: null,
        count: 0,
        price: 0,
        totalPrice: 0,
      };
      let items = [];

      cart.forEach((product) => {
        const foundItem = items.find(({ id }) => id === product.id);

        if (foundItem) {
          items = items.map((item) => {
            if (item.id === foundItem.id) {
              item.count += 1;
              item.totalPrice = item.price * item.count;
            }
            return item;
          });
        } else {
          items.push({
            id: product.id,
            name: product.name,
            count: 1,
            price: product.price,
            totalPrice: product.price,
          });
        }
      });
      let totalPrice = 0;
      items.forEach((product) => {
        totalPrice += product.totalPrice;
      });
      setTotalPrice(totalPrice.toFixed(2));
      setLocalCart(items);
    };
    setUpCart(cart);
    console.log(cart);
  }, [cart]);

  return (
    <div className="app-header-container">
      <header>
        <div className="header container">
          <h1>LOGO</h1>

          <div onClick={cartClick}>
            <CartIcon width={40} />
          </div>
        </div>
      </header>
      {cartState && (
        <div className="cart animate__animated animate__bounce">
          <h2>Koszyk</h2>
          <div className="products">
            {localCart.map((product) => {
              return (
                <div key={product.id} className="product">
                  <p className="productName">
                    {product.name} x{product.count}
                  </p>
                  <button onClick={() => removeFromCart(product)}>
                    remove
                  </button>
                  <p>price:{product.totalPrice.toFixed(2)}</p>
                </div>
              );
            })}
            <p className="totalPrice">Total: {totalPrice}</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={promoCode}
                onChange={handleInputChange}
                placeholder="Enter promo code"
              />
              <button type="submit">Apply</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
