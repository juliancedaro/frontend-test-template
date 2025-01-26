"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game, CartItem } from '@/lib/types';

interface CartContextProps {
  cart: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  isInCart: (gameId: string) => boolean;
  getTotal: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  console.log('cart', cart);
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

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartContext };