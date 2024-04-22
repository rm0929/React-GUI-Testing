import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import './CheckoutPage.css';

const ThankYouPage = () => {
  return (
    <div className="thank-you-page">
      <h2>Thank you for shopping!</h2>
    </div>
  );
};

const CheckoutPage = ({ cartItems, totalPrice }) => {
  const [feedback, setFeedback] = useState('');
  const [paid, setPaid] = useState(false);

  const handlePay = () => {
    // Implement payment logic here
    // For now, just set paid to true
    setPaid(true);
  };

  if (paid) {
    return <Navigate to="/thank-you" replace />; // Use Navigate instead of Redirect
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="selected-items">
        <h3>Selected Items</h3>
        <ul>
          {cartItems?.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
      <div className="total-price">
        <h3>Total Price</h3>
        <p>${totalPrice}</p>
      </div>
      <form className="checkout-form">
        <input type="text" placeholder="Enter your name" />
        <input type="text" placeholder="Enter your address" />
        <input type="text" placeholder="Enter your email" />
      </form>
      <button className="pay-button" onClick={handlePay}>Pay</button>
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
