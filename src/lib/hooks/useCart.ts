'use client';

import { useState, useEffect } from 'react';
import { Game, CartItem } from '@/lib/types';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

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

  const removeFromCart = (gameId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== gameId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const isInCart = (gameId: string) => {
    return cart.some(item => item.id === gameId);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    isInCart,
    getTotal
  };
}