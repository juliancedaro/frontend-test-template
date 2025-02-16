'use client';

import React from 'react';
import Image from 'next/image';
import { Game } from '@/lib/types';
import { useCart } from '@/lib/context/CartContext';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { addToCart, isInCart } = useCart();

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
          <span className="absolute left-2 top-2 rounded bg-new-icon-background px-2 py-1 text-xs text-custom-text-color">
            New
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{game.genre}</p>
        <div className="flex flex-row justify-between">
          <div className="text-sm text-custom-text-color">{game.name}</div>
          <span className="text-sm text-custom-text-color">${game.price}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => addToCart(game)}
            className={`rounded px-1 py-2 text-sm text-custom-text-color border-black border w-full`}
          >
            {inCart ? 'Remove' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}