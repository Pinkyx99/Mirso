import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import ProfileCard from './ProfileCard';
import './ProfileCard.css';

const About: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-20 bg-gray-950">
      <div ref={ref} className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
          <div className={`w-full md:w-2/5 flex justify-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <ProfileCard
              name="Mirso Xhaferi"
              title="Architekt"
              handle="mirso.arch"
              status="Verfügbar für Projekte"
              contactText="Kontakt"
              avatarUrl="https://i.imgur.com/Wls8gtb.png"
              enableTilt={true}
              showUserInfo={true}
              onContactClick={handleContactClick}
            />
          </div>
          <div className={`w-full md:w-3/5 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h2 className="text-3xl font-bold mb-4 text-gray-50">Über Mirso Xhaferi</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Mirso Xhaferi ist ein Architekt, der sich auf moderne und nachhaltige Designs spezialisiert hat. Seine Arbeit verbindet Ästhetik und Funktionalität, um inspirierende Räume zu schaffen.
            </p>
             <p className="text-gray-400 leading-relaxed">
              Mit einem scharfen Auge für Details und einer Leidenschaft für minimalistische Eleganz strebt er danach, Umgebungen zu schaffen, die nicht nur visuell beeindruckend, sondern auch zutiefst menschlich sind. Jedes Projekt ist ein Dialog zwischen Form, Material und Licht, der darauf abzielt, das Leben derer zu bereichern, die den Raum bewohnen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;