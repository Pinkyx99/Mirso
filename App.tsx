import React from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CardNav from './components/CardNav';
import type { CardNavItem } from './components/CardNav';

const navItems: CardNavItem[] = [
  {
    label: 'Projekte',
    bgColor: '#171321',
    textColor: '#f0f0f0',
    links: [
      { label: 'Das Glashaus', href: '#projects', ariaLabel: 'Zum Projekt Das Glashaus' },
      { label: 'Betontraum', href: '#projects', ariaLabel: 'Zum Projekt Betontraum' },
      { label: 'Skyline Turm', href: '#projects', ariaLabel: 'Zum Projekt Skyline Turm' },
    ],
  },
  {
    label: 'Über Mich',
    bgColor: '#1C1829',
    textColor: '#f0f0f0',
    links: [
      { label: 'Biografie', href: '#about', ariaLabel: 'Zur Biografie' },
      { label: 'Philosophie', href: '#about', ariaLabel: 'Zur Philosophie' },
    ],
  },
  {
    label: 'Kontakt',
    bgColor: '#262135',
    textColor: '#f0f0f0',
    links: [
      { label: 'E-Mail', href: 'mailto:contact@mirsoxhaferi.com', ariaLabel: 'E-Mail senden' },
      { label: 'LinkedIn', href: '#', ariaLabel: 'Zum LinkedIn Profil' },
      { label: 'Instagram', href: '#', ariaLabel: 'Zum Instagram Profil' },
    ],
  },
];


function App() {
   const cardNavProps = {
    logo: "https://i.imgur.com/CrlYhiH.png",
    logoAlt: "Mirso Xhaferi Logo",
    items: navItems,
    baseColor: '#111827',
    menuColor: '#f0f0f0',
    buttonBgColor: '#ffffff',
    buttonTextColor: '#111827'
  };

  return (
    <div className="bg-gray-950 text-gray-200 antialiased">
      <CardNav {...cardNavProps} />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;