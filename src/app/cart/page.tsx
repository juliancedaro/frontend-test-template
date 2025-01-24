'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/lib/types';
import { useCart } from '@/lib/hooks/useCart';
import GameCart from '@/app/components/CartCard';

export default function CartPage() {
  const { cart, removeFromCart, getTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-block text-custom-text-color"
      >
        ← Back to Catalog
      </Link>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <span className="text-sm text-custom-text-color">{cart.length} items</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item: Game) => (
                <GameCart game={item} key={`${item.id}-${item.name}`} />
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="mb-8">
            <h2 className="text-l text-custom-text-color">Order Summary</h2>
            <span className="text-sm text-custom-text-color">{cart.length} items</span>
          </div>
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
          <button disabled={!cart.length} className="mt-6 w-full rounded bg-special-gray py-2 text-white hover:bg-gray-700 disabled:bg-special-gray">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}