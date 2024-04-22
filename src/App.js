// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductListingsPage from './ProductListingsPage';
import ShoppingCartPage from './ShoppingCartPage';
import CheckoutPage from './CheckoutPage';
import './App.css';
import ThankyouPage from './ThankyouPage';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter(product => product.id !== productToRemove.id));
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/cart">Shopping Cart ({cart.length})</Link>
            </li>
            <li>
              <Link to="/checkout" >Checkout</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ProductListingsPage addToCart={addToCart} />} />
          <Route path="/cart" element={<ShoppingCartPage cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
          <Route path="/thankYou" element={<ThankyouPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
