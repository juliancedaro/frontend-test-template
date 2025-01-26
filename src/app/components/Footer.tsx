'use client';

import React from 'react';
import { ApplyDigital } from '@/assets/ApplyDigital';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-footer-background py-6 w-full">
      <div className="container mx-auto px-4">
        <Link href="/" className="flex justify-center">
          <ApplyDigital />
        </Link>
      </div>
    </footer>
  );
}