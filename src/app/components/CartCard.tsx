'use client';

import Image from 'next/image';
import { Game } from '@/lib/types';
import { useCart } from '@/lib/hooks/useCart';

interface GameCardProps {
  game: Game;
}

export default function GameCart({ game }: GameCardProps) {
  const { removeFromCart } = useCart();


  return (
    <div
      key={game.id}
      className="flex gap-4 bg-white p-4 border-b-0.5 border-b-cart-card-border-color"
    >
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">{game.genre}</p>
            <h3 className="font-semibold">{game.name}</h3>
          </div>
          <button
            onClick={() => removeFromCart(game.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            X
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {game.description}
        </p>
        <div className="mt-auto pt-2 text-right font-semibold">
          ${game.price}
        </div>
      </div>
    </div>
  );
}