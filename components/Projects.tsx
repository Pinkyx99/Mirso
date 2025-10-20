import React, { useState } from 'react';
import type { Project } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import Lightbox from './Lightbox';

const projects: Project[] = [
  { id: 1, title: 'Das Glashaus', location: 'Oslo, Norwegen', imageUrl: 'https://picsum.photos/seed/p1/800/600', width: 800, height: 600 },
  { id: 2, title: 'Betontraum', location: 'Berlin, Deutschland', imageUrl: 'https://picsum.photos/seed/p2/600/800', width: 600, height: 800 },
  { id: 3, title: 'Skyline Turm', location: 'New York, USA', imageUrl: 'https://picsum.photos/seed/p3/800/600', width: 800, height: 600 },
  { id: 4, title: 'Minimalistischer Rückzugsort', location: 'Kyoto, Japan', imageUrl: 'https://picsum.photos/seed/p4/800/1000', width: 800, height: 1000 },
  { id: 5, title: 'Küstenresidenz', location: 'Sydney, Australien', imageUrl: 'https://picsum.photos/seed/p5/800/600', width: 800, height: 600 },
  { id: 6, title: 'Urbane Oase', location: 'Singapur', imageUrl: 'https://picsum.photos/seed/p6/600/800', width: 600, height: 800 },
];

const ProjectCard: React.FC<{ project: Project; onClick: () => void; isVisible: boolean, delay: number }> = ({ project, onClick, isVisible, delay }) => {
  return (
    <div
      className={`relative group overflow-hidden cursor-pointer transform transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms`}}
      onClick={onClick}
    >
      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-500 ease-out flex items-end p-6">
        <div className="text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-300">{project.location}</p>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-12 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-gray-50">Unsere Arbeit</h2>
          <p className="text-gray-400 mt-2">Eine Auswahl unserer besten Projekte.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedImage(project.imageUrl)}
              isVisible={isVisible}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
      {selectedImage && <Lightbox imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
    </section>
  );
};

export default Projects;