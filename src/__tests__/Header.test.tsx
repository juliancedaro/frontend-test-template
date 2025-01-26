import React from 'react';
import { render, screen } from './test-utils';
import Header from '@/app/components/Header';

test('renders Header component', () => {
  render(<Header />);

  const homeLink = screen.getByRole('link', { name: /GamerShop/i });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute('href', '/');

  const cartLink = screen.getByTestId('cart-link');
  expect(cartLink).toBeInTheDocument();
  expect(cartLink).toHaveAttribute('href', '/cart');
});