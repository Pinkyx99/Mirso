import React, { useState, useEffect } from 'react';

const navLinks = [
  { href: '#home', label: 'Start' },
  { href: '#projects', label: 'Projekte' },
  { href: '#about', label: 'Über Mich' },
  { href: '#contact', label: 'Kontakt' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
    isScrolled ? 'bg-white/60 backdrop-blur-sm shadow-md' : 'bg-transparent'
  }`;

  const linkClasses = `transition-colors duration-300 ${
    isScrolled ? 'text-gray-800 hover:text-gray-500' : 'text-white hover:text-gray-200'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className={`text-xl font-bold tracking-wider ${linkClasses}`}>
          MX
        </a>
        <nav>
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={`text-sm font-medium ${linkClasses}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;