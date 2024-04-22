// ShoppingCartPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ShoppingCartPage.css';

const ShoppingCartPage = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <p>{item.name} - ${item.price}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total: ${totalPrice}</p>
        <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
