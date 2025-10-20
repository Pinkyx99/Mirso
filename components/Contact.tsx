import React, { useState } from 'react';
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
    <section id="contact" className="py-20 bg-gray-900">
      <div ref={ref} className="container mx-auto px-6">
        <div className={`text-center mb-12 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-gray-50">Kontakt aufnehmen</h2>
          <p className="text-gray-400 mt-2">Haben Sie ein Projekt im Sinn? Lassen Sie uns reden.</p>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <div className={`w-full md:w-1/2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 ease-in-out text-gray-50 placeholder-gray-400"/>
              </div>
              <div className="mb-4">
                <input type="email" name="email" placeholder="E-Mail" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 ease-in-out text-gray-50 placeholder-gray-400"/>
              </div>
              <div className="mb-4">
                <textarea name="message" placeholder="Nachricht" rows={5} value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 ease-in-out text-gray-50 placeholder-gray-400"></textarea>
              </div>
              <button type="submit" className="w-full bg-gray-200 text-gray-900 font-semibold py-3 px-8 rounded-sm hover:bg-gray-300 transition-colors duration-300">Senden</button>
              {isSubmitted && <p className="mt-4 text-green-600 text-center">Vielen Dank! Ihre Nachricht wurde gesendet.</p>}
            </form>
          </div>
          <div className={`w-full md:w-1/2 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-50">Kontaktdetails</h3>
              <div className="space-y-3 text-gray-400">
                <p><strong>E-Mail:</strong> contact@mirsoxhaferi.com</p>
                <p><strong>Telefon:</strong> +1 (234) 567-8900</p>
                <p><strong>LinkedIn:</strong> /in/mirso-xhaferi</p>
                <p><strong>Instagram:</strong> @mirso.arch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;