import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About News Suno</h3>
            <p className="text-sm text-neutral-300">
              Bringing you the latest and most relevant news from across India in multiple languages. 
              Stay informed with real-time updates from trusted sources.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#cities" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Cities
                </Link>
              </li>
              <li>
                <Link href="#languages" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Languages
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* News Categories */}
          <div>
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="mt-4 space-y-2">
              {[
                'National', 'World', 'Business', 'Technology', 
                'Entertainment', 'Sports', 'Science', 'Health'
              ].map((category) => (
                <li key={category}>
                  <a href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <address className="mt-4 not-italic text-sm text-neutral-300 space-y-2">
              <p>123 News Street, Media City</p>
              <p>Mumbai, Maharashtra 400001</p>
              <p>Email: info@newssuno.com</p>
              <p>Phone: +91 98765 43210</p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-neutral-400">
              &copy; {currentYear} NewsSuno. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-neutral-500">
            <p>Made with ❤️ in India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
