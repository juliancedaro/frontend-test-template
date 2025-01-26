import React from 'react';
import { render, screen } from './test-utils';
import CartCard from '@/app/components/CartCard';
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

test('renders CartCard component', () => {
  render(<CartCard game={game} />);

  expect(screen.getByTestId('game-name')).toHaveTextContent(game.name);
  expect(screen.getByTestId('game-genre')).toHaveTextContent(game.genre);
  expect(screen.getByTestId('game-description').textContent).toBe(game.description)
  expect(screen.getByTestId('game-price').textContent).toBe(`$${game.price.toString()}`);
  expect(screen.getByTestId('remove-button')).toBeInTheDocument();
  expect(screen.getByTestId('game-image')).toBeInTheDocument();
});