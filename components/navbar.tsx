'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    //{ name: 'Cities', href: '#cities' },
    //{ name: 'Languages', href: '#languages' },
  ];

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white/90'
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <img
                src="/news-headline-placeholder.png"
                alt="NewsTalk logo"
                className="h-8 w-8 rounded-md"
                width={32}
                height={32}
                loading="lazy"
              />
              <h1 className="ml-2 text-lg font-semibold tracking-tight sm:text-xl">News Talk</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant="ghost"
                className="text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                <Link href={item.href}>
                  {item.name}
                </Link>
              </Button>
            ))}
            <Button 
              asChild
              variant="default" 
              className="ml-2 bg-[#FF9933] hover:bg-[#e68a2e] text-white"
            >
              <Link href="#latest-news">
                Latest News
              </Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden
          ">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-700 hover:bg-transparent focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="#latest-news"
            className="block w-full rounded-md bg-[#FF9933] px-3 py-2 text-center text-base font-medium text-white hover:bg-[#e68a2e]"
            onClick={() => setIsMenuOpen(false)}
          >
            Latest News
          </Link>
        </div>
      </div>
    </header>
  );
}
