import React from 'react';
import CartPage from '@/app/cart/page';
import { CartItem } from '@/lib/types';
import { CartContext } from '@/lib/context/CartContext';
import { render, screen, fireEvent } from './test-utils';

const game: CartItem = {
  id: '1',
  genre: 'Action',
  image: '/game-images/sample.jpeg',
  name: 'Sample Game',
  description: 'Sample Description',
  price: 59.99,
  isNew: true,
  quantity: 1
};

const mockCart = [game];

const MockCartProvider = ({ children }: { children: React.ReactNode }) => {
  const mockContextValue = {
    cart: mockCart,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    isInCart: jest.fn().mockReturnValue(true),
    getTotal: jest.fn().mockReturnValue(59.99),
  };

  return (
    <CartContext.Provider value={mockContextValue}>
      {children}
    </CartContext.Provider>
  );
};


test('renders CartPage component', () => {
  render(<CartPage />);

  expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();
  expect(screen.getByText(/Back to Catalog/i)).toBeInTheDocument();
});

test('displays game in cart and removes it', () => {
  render(<CartPage />);

  // Check if game is displayed in cart
  expect(screen.getByTestId('game-name')).toHaveTextContent(game.name);
  expect(screen.getByTestId('game-genre')).toHaveTextContent(game.genre);
  expect(screen.getByTestId('game-description')).toHaveTextContent(game.description);
  expect(screen.getByTestId('game-price')).toHaveTextContent(`$${game.price.toString()}`);

  // Remove game from cart
  fireEvent.click(screen.getByTestId('remove-button'));

  // Check if cart is empty
  expect(screen.getByText(/Your cart is empty./i)).toBeInTheDocument();
});

test('displays order summary and total', () => {
  render(<CartPage />);

  // Check order summary
  expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
  expect(screen.getByText(/1 items/i)).toBeInTheDocument();
  expect(screen.getByText(`$${game.price.toString()}`)).toBeInTheDocument();
  expect(screen.getByText(/Order Total/i)).toBeInTheDocument();
  expect(screen.getByText(`$${game.price.toFixed(2)}`)).toBeInTheDocument();
});