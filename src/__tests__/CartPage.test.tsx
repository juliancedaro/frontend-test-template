import React from 'react';
import CartPage from '@/app/cart/page';
import { CartItem } from '@/lib/types';
import { CartContext } from '@/lib/context/CartContext';
import { render, screen, fireEvent } from '@/utils/test-utils';

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

const removeFromCartMock = jest.fn();

const mockCart = [game];

const MockCartProvider = ({ children }: { children: React.ReactNode }) => {
  const mockContextValue = {
    cart: mockCart,
    addToCart: jest.fn(),
    removeFromCart: removeFromCartMock,
    isInCart: jest.fn().mockReturnValue(true),
    getTotal: jest.fn().mockReturnValue(59.99),
  };

  return (
    <CartContext.Provider value={mockContextValue}>
      {children}
    </CartContext.Provider>
  );
};

beforeEach(() => {
  jest.clearAllMocks()
});

test('renders CartPage component', () => {
  render(<MockCartProvider><CartPage /></MockCartProvider>);

  expect(screen.getByTestId("your-cart-message")).toBeInTheDocument();
  expect(screen.getByTestId("back-to-catalog")).toBeInTheDocument();
});

test('displays game in cart and removes it', () => {
  render(<MockCartProvider><CartPage /></MockCartProvider>);

  expect(screen.getByTestId('game-name')).toHaveTextContent(game.name);
  expect(screen.getByTestId('game-genre')).toHaveTextContent(game.genre);
  expect(screen.getByTestId('game-description')).toHaveTextContent(game.description);
  expect(screen.getByTestId('game-price')).toHaveTextContent(`$${game.price.toString()}`);

  fireEvent.click(screen.getByTestId('remove-button'));

  expect(removeFromCartMock).toHaveBeenCalled();
});

test('displays order summary and total', () => {
  render(<MockCartProvider><CartPage /></MockCartProvider>);

  expect(screen.getByTestId("order-summary")).toBeInTheDocument();
  expect(screen.getByTestId("summary-amount-items")).toBeInTheDocument();
  expect(screen.getByTestId("order-total")).toBeInTheDocument();
  expect(screen.getByTestId("total-price")).toBeInTheDocument();
});