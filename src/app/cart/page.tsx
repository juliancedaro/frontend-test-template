'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CartItem, Game } from '../../lib/types';
import { useState } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const removeFromCart = (gameId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== gameId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-block text-custom-text-color"
      >
        ← Back to Catalog
      </Link>

      <h1 className="mb-8 text-2xl font-bold">Your Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item: Game) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-lg border bg-white p-4"
                >
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.genre}</p>
                        {item.isNew && (
                          <span className="mt-1 inline-block rounded bg-blue-600 px-2 py-1 text-xs text-white">
                            New
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        X
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {item.description}
                    </p>
                    <div className="mt-auto pt-2 text-right font-semibold">
                      ${item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg text-custom-text-color">Order Summary</h2>
          <div className="space-y-2">
            {cart.map((item: Game) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-custom-text-color">{item.name}</span>
                <span className="text-custom-text-color">${item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between font-semibold">
              <span className="text-custom-text-color">Order Total</span>
              <span className="text-custom-text-color">${getTotal()}</span>
            </div>
          </div>
          <button disabled={!cart.length} className="mt-6 w-full rounded bg-gray-800 py-2 text-white hover:bg-gray-700 disabled:bg-disabled-button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}