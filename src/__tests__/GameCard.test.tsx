import React from 'react';
import { render, screen, fireEvent } from './test-utils';
import GameCard from '@/app/components/GameCard';
import { Game } from '@/lib/types';

const game: Game = {
  id: '1',
  genre: 'Action',
  image: '/game-images/sample.jpeg',
  name: 'Sample Game',
  description: 'Sample Description',
  price: 59.99,
  isNew: true,
};

test('renders GameCard component', () => {
  render(<GameCard game={game} />);

  expect(screen.getByText(game.name)).toBeInTheDocument();
  expect(screen.getByText(game.genre)).toBeInTheDocument();
  expect(screen.getByText(`$${game.price}`)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Add to Cart/i })).toBeInTheDocument();
});

test('adds and removes game from cart', () => {
  const { getByRole } = render(<GameCard game={game} />);

  const button = getByRole('button', { name: /Add to Cart/i });
  fireEvent.click(button);
  expect(button).toHaveTextContent('Remove');

  fireEvent.click(button);
  expect(button).toHaveTextContent('Add to Cart');
});