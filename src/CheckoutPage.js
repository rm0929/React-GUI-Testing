import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = ({ cart }) => {
  const location = useLocation();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="selected-items">
        <h3>Selected Items</h3>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="total-price">
        <h3>Total Price</h3>
        <p>${totalPrice}</p>
      </div>
      <div className="feedback">
        <h3>Feedback</h3>
        <textarea
          className="feedback-textbox"
          placeholder="Leave your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
        />
      </div>
      <form className="checkout-form">
        <input type="text" placeholder="Enter your name" />
        <input type="text" placeholder="Enter your address" />
        <input type="text" placeholder="Enter your email" />
      </form>
      <Link to="./thankYou"><button className="pay-button">Pay</button></Link>
      <textarea
        className="feedback-textbox"
        placeholder="Leave your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
    </div>
  );
};

export default CheckoutPage;


