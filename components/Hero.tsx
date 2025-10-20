import React, { useState, useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.pageYOffset;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (backgroundRef.current) {
            // Apply the parallax effect
            backgroundRef.current.style.transform = `translateY(${lastScrollY.current * 0.3}px)`;
          }
          ticking.current = false;
        });

        ticking.current = true;
      }
    };
    
    // Use a passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    const timer = setTimeout(() => setIsMounted(true), 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(https://picsum.photos/1920/1080?grayscale&blur=2&random=1)`,
    // Increase height and adjust position to prevent showing edges when transforming
    height: '140%', 
    top: '-20%',
    // Hint to the browser to optimize this element for transform changes
    willChange: 'transform',
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white text-center overflow-hidden">
      <div 
        ref={backgroundRef}
        className="absolute left-0 w-full bg-cover bg-center bg-no-repeat" 
        style={backgroundStyle}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>
      <div className="relative z-10 px-4">
        <h1
          className={`text-4xl md:text-6xl font-bold tracking-tight transition-all duration-1000 ease-out ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          Mirso Xhaferi — Architekt
        </h1>
        <p
          className={`mt-4 text-lg md:text-xl text-gray-200 transition-all duration-1000 ease-out delay-200 ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          Zeitlose Räume gestalten, die inspirieren.
        </p>
        <div
          className={`transition-all duration-1000 ease-out delay-400 ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <a
            href="#projects"
            className="mt-8 inline-block bg-white text-gray-800 font-semibold py-3 px-8 rounded-sm hover:bg-gray-200 transition-colors duration-300"
          >
            Projekte ansehen
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;