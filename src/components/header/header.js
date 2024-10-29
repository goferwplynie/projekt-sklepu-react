import "./header.scss";
import CartIcon from "./cart.icon";
import React, { useState, useEffect } from "react";

const Header = (props) => {
  const { cart, clearCart } = props;
  const [cartState, setCartState] = useState(false);
  const [localCart, setLocalCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [promo, setPromo] = useState(1);

  const handleInputChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validPromoCodes = ["PROMO10", "PROMO20", "PROMO30"];

    if (validPromoCodes.includes(promoCode)) {
      if (promoCode === "PROMO10") {
        setPromo(0.9);
      } else if (promoCode === "PROMO20") {
        setPromo(0.8);
      } else if (promoCode === "PROMO30") {
        setPromo(0.7);
      }
    }

    setPromoCode("");
  };

  const cartClick = () => setCartState(!cartState);

  useEffect(() => {
    const setUpCart = (cart) => {
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
  }, [cart]);

  return (
    <div className="app-header-container">
      <header>
        <div className="header-container">
          <img className="logo" src="razer-logo.png" alt="Razer logo"></img>
          <div className="cartIcon" onClick={cartClick}>
            <CartIcon width={40} />
            <p className="cartCount">{cart.length}</p>
          </div>
        </div>
      </header>
      {cartState && (
        <div className="cart animate__animated animate__bounce">
          <h2>Koszyk</h2>
          <button className="clearButton" onClick={clearCart}>
            Clear
          </button>
          <div className="products">
            {localCart.map((product) => {
              return (
                <div key={product.id} className="product">
                  <p className="productName">
                    {product.name} x{product.count}
                  </p>
                  <p>price: {product.price}</p>
                </div>
              );
            })}
            <p className="totalPrice">
              <s>{promo < 1 && totalPrice}</s>
              Total:{(totalPrice * promo).toFixed(2)}
            </p>
            <form className="promoCodeForm" onSubmit={handleSubmit}>
              <input
                type="text"
                value={promoCode}
                onChange={handleInputChange}
                placeholder="Enter promo code"
              />
              <button type="submit">Apply</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
