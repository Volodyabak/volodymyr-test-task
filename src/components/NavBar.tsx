'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white py-4 shadow">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">MyApp</Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="block sm:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex space-x-6">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/userProfile" className="hover:underline">
              User Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="sm:hidden bg-blue-500 text-white py-4 space-y-4">
          <li>
            <Link href="/" className="block px-4 hover:underline" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/contact" className="block px-4 hover:underline" onClick={toggleMenu}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/userProfile" className="block px-4 hover:underline" onClick={toggleMenu}>
              User Profile
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
