import * as React from 'react';
// Fix: Import 'types.ts' for its side-effect of augmenting the global JSX namespace.
// This resolves "Property '...' does not exist on type 'JSX.IntrinsicElements'" errors across the app.
import '../types';
import { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
          <iframe 
            src='https://my.spline.design/architecturalstudiowebdesignherosection-Sc82YTcU9VxEwVcTkBHaj7q3/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="absolute inset-0 w-full h-full"
            title="Interactive 3D architectural model background"
          ></iframe>
      </div>
       <div className="absolute top-0 left-0 w-full h-full bg-black/30 dark:bg-black/60"></div>
      <div className="relative z-10 px-4 text-[var(--text-primary-on-dark)]">
        <h1
          className={`text-4xl md:text-6xl font-bold tracking-tight transition-all duration-1000 ease-in-out ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.5)' }}
        >
          Mirso Xhaferi — Architekt
        </h1>
        <p
          className={`mt-4 text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 ease-in-out delay-200 ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
           style={{ textShadow: '0px 2px 8px rgba(0,0,0,0.5)' }}
        >
          Zeitlose Räume gestalten, die inspirieren und Bestand haben.
        </p>
        <div
          className={`transition-all duration-1000 ease-in-out delay-400 ${
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