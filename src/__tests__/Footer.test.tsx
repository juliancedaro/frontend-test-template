import React from 'react';
import { render, screen } from './test-utils';
import Footer from '@/app/components/Footer';

test('renders Footer component', () => {
  render(<Footer />);

  const link = screen.getByRole('link');
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/');
});