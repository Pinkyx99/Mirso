import * as React from 'react';
// Fix: Import 'types.ts' for its side-effect of augmenting the global JSX namespace.
// This resolves "Property '...' does not exist on type 'JSX.IntrinsicElements'" errors across the app.
import '../types';
import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Contact: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-[var(--bg-primary)]">
      <div ref={ref} className="container mx-auto px-6">
        <div className={`text-center mb-12 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)]">Kontakt aufnehmen</h2>
          <p className="text-[var(--text-secondary)] mt-2">Haben Sie ein Projekt im Sinn? Lassen Sie uns reden.</p>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <div className={`w-full md:w-1/2 transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition-all duration-300 text-[var(--text-primary)] placeholder-[var(--text-secondary)]"/>
              </div>
              <div className="mb-4">
                <input type="email" name="email" placeholder="E-Mail" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition-all duration-300 text-[var(--text-primary)] placeholder-[var(--text-secondary)]"/>
              </div>
              <div className="mb-4">
                <textarea name="message" placeholder="Nachricht" rows={5} value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition-all duration-300 text-[var(--text-primary)] placeholder-[var(--text-secondary)]"></textarea>
              </div>
              <button type="submit" className="w-full bg-[var(--accent-color)] text-[var(--accent-text-color)] font-semibold py-3 px-8 rounded-full hover:opacity-80 transition-opacity duration-300">Senden</button>
              {isSubmitted && <p className="mt-4 text-green-500 text-center">Vielen Dank! Ihre Nachricht wurde gesendet.</p>}
            </form>
          </div>
          <div className={`w-full md:w-1/2 transition-all duration-700 ease-in-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Kontaktdetails</h3>
              <div className="space-y-3 text-[var(--text-secondary)]">
                <p><strong>E-Mail:</strong> <a href="mailto:contact@mirsoxhaferi.com" className="hover:text-[var(--text-primary)]">contact@mirsoxhaferi.com</a></p>
                <p><strong>Telefon:</strong> <a href="tel:+12345678900" className="hover:text-[var(--text-primary)]">+1 (234) 567-8900</a></p>
                <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/mirso-xhaferi-3aa769246/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)]">/in/mirso-xhaferi</a></p>
                <p><strong>Instagram:</strong> <a href="https://www.instagram.com/mirso.xhaferi/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)]">@mirso.arch</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;