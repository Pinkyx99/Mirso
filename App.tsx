import * as React from 'react';
// Fix: Import 'types.ts' for its side-effect of augmenting the global JSX namespace.
// This resolves "Property '...' does not exist on type 'JSX.IntrinsicElements'" errors across the app.
import './types';
import { useTheme } from './contexts/ThemeContext';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StaggeredMenu from './components/StaggeredMenu';
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from './components/StaggeredMenu';


const menuItems: StaggeredMenuItem[] = [
  { label: 'Start', ariaLabel: 'Gehe zum Start', link: '#home' },
  { label: 'Projekte', ariaLabel: 'Gehe zu den Projekten', link: '#projects' },
  { label: 'Über Mich', ariaLabel: 'Gehe zum Über-Mich-Abschnitt', link: '#about' },
  { label: 'Kontakt', ariaLabel: 'Gehe zum Kontaktformular', link: '#contact' }
];

const socialItems: StaggeredMenuSocialItem[] = [
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/mirso-xhaferi-3aa769246/' },
  { label: 'Instagram', link: 'https://www.instagram.com/mirso.xhaferi/' },
  { label: 'X', link: '#' }
];

function App() {
  const { theme } = useTheme();

  const menuColors = theme === 'dark' ? ['#374151', '#111827'] : ['#e2e8f0', '#ffffff'];
  const menuButtonColor = theme === 'dark' ? '#f9fafb' : '#0f172a';
  const openMenuButtonColor = theme === 'dark' ? '#0f172a' : '#f9fafb';

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
       <StaggeredMenu
        position="left"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        colors={menuColors}
        logoUrl="/logo.svg"
        menuButtonColor={menuButtonColor}
        openMenuButtonColor={openMenuButtonColor}
        changeMenuColorOnOpen={true}
        accentColor="#4f46e5" /* Indigo 600 */
        isFixed={true}
      />
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