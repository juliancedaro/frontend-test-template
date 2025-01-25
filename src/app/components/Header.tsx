'use client';

import Link from 'next/link';
import { CartIcon } from '@/assets/cart';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-header-background h-14">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-l font-700 text-special-gray">
          GamerShop
        </Link>
        <Link href="/cart">
          <CartIcon />
        </Link>
      </div>
    </header>
  );
}