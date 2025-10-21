import * as React from 'react';
import { useState, useEffect } from 'react';
import LiquidChrome from './LiquidChrome';
import { useTheme } from '../contexts/ThemeContext';

const Hero: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const liquidColor: [number, number, number] = theme === 'dark' ? [0.1, 0.1, 0.1] : [0.9, 0.9, 0.9];

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
          <LiquidChrome baseColor={liquidColor} speed={0.15} amplitude={0.3} frequencyX={4} frequencyY={3} />
      </div>
       <div className="absolute top-0 left-0 w-full h-full bg-black/10 dark:bg-black/40"></div>
      <div className="relative z-10 px-4 text-[var(--text-primary-on-dark)]">
        <h1
          className={`text-4xl md:text-6xl font-bold tracking-tight transition-all duration-1000 ease-out ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.5)' }}
        >
          Mirso Xhaferi — Architekt
        </h1>
        <p
          className={`mt-4 text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 ease-out delay-200 ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
           style={{ textShadow: '0px 2px 8px rgba(0,0,0,0.5)' }}
        >
          Zeitlose Räume gestalten, die inspirieren und Bestand haben.
        </p>
        <div
          className={`transition-all duration-1000 ease-out delay-400 ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <a
            href="#projects"
            className="mt-8 inline-block bg-[var(--accent-color)] text-[var(--accent-text-color)] font-semibold py-3 px-8 rounded-full hover:opacity-80 transition-opacity duration-300"
          >
            Projekte ansehen
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;