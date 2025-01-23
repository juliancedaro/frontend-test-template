'use client';

import Image from 'next/image';
import { Game, CartItem } from '@/lib/types';
import { useState } from 'react';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (game: Game) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === game.id);
      let newCart;

      if (existingItem) {
        newCart = prevCart.filter(item => item.id !== game.id);
      } else {
        newCart = [...prevCart, { ...game, quantity: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const isInCart = (gameId: string) => {
    return cart.some(item => item.id === gameId);
  };

  const inCart = isInCart(game.id);

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="relative aspect-[16/9] overflow-hidden rounded-md">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {game.isNew && (
          <span className="absolute left-2 top-2 rounded bg-new-icon-background px-2 py-1 text-xs text-custom-card-text">
            New
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{game.genre}</p>
        <div className="flex flex-row justify-between">
          <div className="text-sm text-custom-card-text">{game.name}</div>
          <span className="text-sm text-custom-card-text">${game.price}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => addToCart(game)}
            className={`rounded px-1 py-2 text-sm text-custom-card-text border-black border w-full`}
          >
            {inCart ? 'Remove' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}