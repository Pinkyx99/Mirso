import * as React from 'react';
// Fix: Import 'types.ts' for its side-effect of augmenting the global JSX namespace.
// This resolves "Property '...' does not exist on type 'JSX.IntrinsicElements'" errors across the app.
import '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const About: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="about" className="py-20 lg:py-32 bg-[var(--bg-secondary)]">
      <div ref={ref} className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          <div className={`w-full md:w-2/5 flex justify-center transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
             <img 
                src="https://i.imgur.com/Wls8gtb.png" 
                alt="Portrait von Mirso Xhaferi" 
                className="rounded-lg shadow-2xl w-full max-w-sm object-cover aspect-[4/5]"
             />
          </div>
          <div className={`w-full md:w-3/5 transition-all duration-700 ease-in-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[var(--text-primary)]">Über Mirso Xhaferi</h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p>
                Mirso Xhaferi ist ein Architekt, der sich auf moderne und nachhaltige Designs spezialisiert hat. Seine Arbeit verbindet Ästhetik und Funktionalität, um inspirierende Räume zu schaffen, die das menschliche Erleben in den Mittelpunkt stellen.
                </p>
                <p>
                Mit einem scharfen Auge für Details und einer Leidenschaft für minimalistische Eleganz strebt er danach, Umgebungen zu schaffen, die nicht nur visuell beeindruckend, sondern auch zutiefst menschlich sind. Jedes Projekt ist ein Dialog zwischen Form, Material und Licht, der darauf abzielt, das Leben derer zu bereichern, die den Raum bewohnen.
                </p>
            </div>
             <a
                href="#contact"
                className="mt-8 inline-block bg-[var(--accent-color)] text-[var(--accent-text-color)] font-semibold py-3 px-8 rounded-full hover:opacity-80 transition-opacity duration-300"
            >
                Kontakt aufnehmen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;