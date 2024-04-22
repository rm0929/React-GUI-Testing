import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductListingsPage from './ProductListingsPage';
import ShoppingCartPage from './ShoppingCartPage';
import CheckoutPage from './CheckoutPage';

describe('ProductListingsPage', () => {
  // Test Case 1: Display products correctly
  it('displays products correctly', () => {
    render(
      <MemoryRouter>
        <ProductListingsPage addToCart={() => {}} />
      </MemoryRouter>
    );

    // Check if product images are rendered
    const productImages = screen.getAllByAltText(/Product \d/i);
    expect(productImages.length).toBeGreaterThan(0);

    // Check if product names are rendered
    const productNames = screen.getAllByRole('heading');
    expect(productNames.length).toBeGreaterThan(0);

    // Check if product prices are rendered
    const productPrices = screen.getAllByText(/^\$\d+$/);
    expect(productPrices.length).toBeGreaterThan(0);
  });

  // Test Case 2: Update product list based on price slider
  it('updates product list based on price slider', () => {
    render(
      <MemoryRouter>
        <ProductListingsPage addToCart={() => {}} />
      </MemoryRouter>
    );

    // Move the price slider
    const priceSlider = screen.getByRole('slider');
    fireEvent.change(priceSlider, { target: { value: 40 } });

    // Check if products are filtered based on the slider value
    const filteredProductNames = screen.queryAllByRole('heading');
    expect(filteredProductNames.length).toBeGreaterThan(0);
    expect(filteredProductNames.every(product => parseInt(product.textContent.split(' ')[1]) <= 40)).toBeTruthy();
  });

  // Test Case 3: Call addToCart function when "Add to Cart" button is clicked
  it('calls addToCart function when "Add to Cart" button is clicked', () => {
    const addToCartMock = jest.fn();
    render(
      <MemoryRouter>
        <ProductListingsPage addToCart={addToCartMock} />
      </MemoryRouter>
    );

    // Click the "Add to Cart" button for the first product
    const addToCartButton = screen.getAllByText('Add to Cart')[0];
    fireEvent.click(addToCartButton);

    // Check if addToCart function is called with the correct product
    expect(addToCartMock).toHaveBeenCalled();
  });

  // Test Case 4: Display "Product added to the cart" message when product is added
  it('displays "Product added to the cart" message when product is added', () => {
    render(
      <MemoryRouter>
        <ProductListingsPage addToCart={() => {}} />
      </MemoryRouter>
    );

    // Click the "Add to Cart" button for the first product
    const addToCartButton = screen.getAllByText('Add to Cart')[0];
    fireEvent.click(addToCartButton);

    // Check if the "Product added to the cart" message is displayed
    const addedToCartMessage = screen.getByText(/Product \d+ added to the cart/i);
    expect(addedToCartMessage).toBeInTheDocument();
  });

  // Test Case 5: Navigate to cart page when "View Cart" button is clicked
  it('navigates to cart page when "View Cart" button is clicked', () => {
    render(
      <MemoryRouter>
        <ProductListingsPage addToCart={() => {}} />
      </MemoryRouter>
    );

    // Click the "View Cart" button
    const viewCartButton = screen.getByText('View Cart');
    fireEvent.click(viewCartButton);

    // Check if the browser history changed to '/cart'
    expect(window.location.pathname).toBe('/cart');
  });
});

describe('ShoppingCartPage', () => {
  const cart = [
    { id: 1, name: 'Product 1', price: 10, image: 'https://picsum.photos/200/300?random=1' },
    { id: 2, name: 'Product 2', price: 20, image: 'https://picsum.photos/200/300?random=2' }
  ];

  // Test Case 1: Display shopping cart items
  it('displays shopping cart items', () => {
    render(
      <MemoryRouter>
        <ShoppingCartPage cart={cart} removeFromCart={() => {}} />
      </MemoryRouter>
    );

    // Check if cart items are displayed
    const cartItems = screen.getAllByRole('img');
    expect(cartItems.length).toBe(cart.length);
  });

  // Test Case 2: Remove item from shopping cart
  it('removes item from shopping cart when "Remove" button is clicked', () => {
    const removeFromCartMock = jest.fn();
    render(
      <MemoryRouter>
        <ShoppingCartPage cart={cart} removeFromCart={removeFromCartMock} />
      </MemoryRouter>
    );

    // Click the "Remove" button for the first item
    const removeButton = screen.getAllByText('Remove')[0];
    fireEvent.click(removeButton);

    // Check if removeFromCart function is called with the correct item
    expect(removeFromCartMock).toHaveBeenCalled();
  });
});

describe('CheckoutPage', () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 }
  ];
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Test Case 1: Display selected items and total price
  it('displays selected items and total price', () => {
    render(
      <MemoryRouter>
        <CheckoutPage cartItems={cartItems} totalPrice={totalPrice} />
      </MemoryRouter>
    );

    // Check if selected items are displayed
    const selectedItems = screen.getAllByRole('listitem');
    expect(selectedItems.length).toBe(cartItems.length);

    // Check if total price is displayed
    const totalPriceElement = screen.getByText(`Total Price: $${totalPrice}`);
    expect(totalPriceElement).toBeInTheDocument();
  });

  // Test Case 2: Pay button functionality
  it('redirects to thank you page when "Pay" button is clicked', () => {
    render(
      <MemoryRouter>
        <CheckoutPage cartItems={cartItems} totalPrice={totalPrice} />
      </MemoryRouter>
    );

    // Click the "Pay" button
    const payButton = screen.getByText('Pay');
    fireEvent.click(payButton);

    // Check if redirected to thank you page
    expect(window.location.href).toBe('http://localhost/thank-you');
  });
});
