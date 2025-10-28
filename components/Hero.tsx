import * as React from 'react';
import { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
          <iframe 
            src='https://my.spline.design/architecturalstudiowebdesignherosection-Sc82YTcU9VxEwVcTkBHaj7q3/?logo=false' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="absolute inset-0 w-full h-full"
            title="Interactive 3D architectural model background"
          ></iframe>
      </div>
       <div className="absolute top-0 left-0 w-full h-full bg-black/30 dark:bg-black/60"></div>
      
       <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-1000 delay-500 ${
          isMounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <a
          href="#projects"
          className="text-[var(--text-primary-on-dark)] hover:opacity-75 transition-opacity"
          aria-label="Scroll to projects section"
        >
          <div className="animate-bounce w-10 h-10 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;