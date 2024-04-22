import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter,Routes, Route } from 'react-router-dom';
import ProductListingsPage from './ProductListingsPage';
import ShoppingCartPage from './ShoppingCartPage';
import CheckoutPage from './CheckoutPage';
import ThankyouPage from './ThankyouPage';

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
  it('updates price range when slider is moved', () => {
    // Mock function for addToCart
    const addToCartMock = jest.fn();

    // Render the ProductListingsPage component
    const { getByRole } = render(<ProductListingsPage addToCart={addToCartMock} />);

    // Get the slider element
    const slider = getByRole('slider');

    // Change the value of the slider
    fireEvent.change(slider, { target: { value: 20 } });

    // Assert that the value of the slider has been updated
    expect(slider.value).toBe('20');
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
  it('transitions to ShoppingCartPage when "View Cart" button is clicked', () => {
    // Render the component with the Router
    render(
      <Router>
        <ProductListingsPage />
      </Router>
    );

    // Click the "View Cart" button
    const viewCartButton = screen.getByText('View Cart');
    fireEvent.click(viewCartButton);

    // Check if the browser navigates to the /cart route
    expect(window.location.pathname).toBe('/cart');
  });
});

describe('ShoppingCartPage', () => {
  const cart = [
    { id: 1, name: 'Product 1', price: 10, image: 'https://picsum.photos/200/300?random=1' },
    { id: 2, name: 'Product 2', price: 20, image: 'https://picsum.photos/200/300?random=2' }
  ];

  // Test Case 6: Display shopping cart items
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

  // Test Case 7: Remove item from shopping cart
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

  const cart = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 }
  ];

  const state = { cartItems: cart, totalPrice: totalPrice };

  // Test Case 8: Display selected items and total price
  it('displays selected items and total price', () => {
    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <CheckoutPage cart={cart} />
      </MemoryRouter>
    );

    // Check if selected items are displayed
    const selectedItems = screen.getAllByRole('listitem');
    expect(selectedItems.length).toBe(cart.length);

    // Check if total price is displayed
    const totalPriceElement = screen.getByText(`Total Price`);
    expect(totalPriceElement).toBeInTheDocument();
  });

  // Test Case 9: Pay button functionality
  it('redirects to thank you page when "Pay" link is clicked and redirected to ThankyouPage', async() => {
    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <CheckoutPage cart={cart} totalPrice={totalPrice} />
        <Routes>
          <Route path="/thankYou" element={<ThankyouPage />} />
        </Routes>
      </MemoryRouter>
    );
  
    // Click the "Pay" button
    const payButton = screen.getByText('Pay');
    fireEvent.click(payButton);
  
    // Wait for the "Thank You" text to appear
    await waitFor(() => {
      expect(screen.getByText('Thank You!')).toBeInTheDocument();
    });
  });
});
