// ProductListingsPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import InputSlider from 'react-input-slider'; // Import the slider component
import './ProductListingsPage.css';

const products = [
  { id: 1, name: 'Product 1', price: 10, image: 'https://picsum.photos/200/300?random=1' },
  { id: 2, name: 'Product 2', price: 20, image: 'https://picsum.photos/200/300?random=2' },
  { id: 3, name: 'Product 3', price: 30, image: 'https://picsum.photos/200/300?random=3' },
  { id: 4, name: 'Product 4', price: 15, image: 'https://picsum.photos/200/300?random=4' },
  { id: 5, name: 'Product 5', price: 25, image: 'https://picsum.photos/200/300?random=5' },
  { id: 6, name: 'Product 6', price: 35, image: 'https://picsum.photos/200/300?random=6' },
  { id: 7, name: 'Product 7', price: 45, image: 'https://picsum.photos/200/300?random=7' },
  { id: 8, name: 'Product 8', price: 55, image: 'https://picsum.photos/200/300?random=8' },
];

const ProductListingsPage = ({ addToCart }) => {
  const [priceRange, setPriceRange] = useState({ x: 30 }); // Initialize price range state with default value 30
  const [addedToCartMessage, setAddedToCartMessage] = useState('');

  const handlePriceChange = (value) => {
    setPriceRange(value); // Update price range state
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCartMessage(`Product ${product.id} added to the cart.`);
  };

  const filteredProducts = products.filter(product => product.price <= priceRange.x); // Filter products based on selected price range

  return (
    <div className="product-listings">
      <Link to="/cart" className="view-cart-button">
        View Cart
        <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
      </Link>
      <h2>Products</h2>
      <div className="price-slider">
        <InputSlider
          axis="x"
          x={priceRange.x}
          xmin={0}
          xmax={60}
          onChange={handlePriceChange}
        />
        <div className="price-range">
          <span>Price Range: $0 - ${priceRange.x}</span>
        </div>
      </div>
      <div className="grid-container">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={`Product ${product.id}`} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      {addedToCartMessage && <div className="added-to-cart-message">{addedToCartMessage}</div>}
    </div>
  );
};

export default ProductListingsPage;
