'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CartItem } from '@/lib/types';

export default function Header() {
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-header-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-700 text-header-text">
          GamerShop
        </Link>
        <Link href="/cart" className="relative">
          <div className="flex min-h-screen items-center justify-center bg-white" />
        </Link>
      </div>
    </header>
  );
}