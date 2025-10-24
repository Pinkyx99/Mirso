import * as React from 'react';
// Fix: Import 'types.ts' for its side-effect of augmenting the global JSX namespace.
// This resolves "Property '...' does not exist on type 'JSX.IntrinsicElements'" errors across the app.
import '../types';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '#home', label: 'Start' },
  { href: '#projects', label: 'Projekte' },
  { href: '#about', label: 'Über Mich' },
  { href: '#modell', label: '3D Modell' },
  { href: '#contact', label: 'Kontakt' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
    isScrolled ? 'bg-[var(--bg-secondary-translucent)] backdrop-blur-sm shadow-md' : 'bg-transparent'
  }`;
  
  const linkClasses = `transition-colors duration-300 ${
    isScrolled ? 'text-[var(--text-primary)] hover:text-[var(--text-secondary)]' : 'text-[var(--text-primary-on-dark)] hover:text-gray-300'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className={`text-2xl font-bold tracking-wider ${linkClasses}`}>
          MX
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={`text-sm font-medium ${linkClasses}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
           <ThemeToggle />
        </nav>
         <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`ml-4 ${linkClasses}`}
                aria-label="Menü öffnen"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
            </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-[var(--bg-secondary-translucent)] backdrop-blur-sm`}>
          <ul className="flex flex-col items-center py-4">
               {navLinks.map((link) => (
              <li key={link.href} className="py-2">
                <a href={link.href} className={`text-lg font-medium ${linkClasses}`} onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
      </div>
    </header>
  );
};

export default Header;