import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-footer-background py-6 w-full">
      <div className="container mx-auto px-4">
        <Link href="/" className="flex justify-center">
          <div className="text-white">Apply Digital</div>
        </Link>
      </div>
    </footer>
  );
}