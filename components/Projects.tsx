import * as React from 'react';
import { useState, useCallback } from 'react';
import type { Project } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import Lightbox from './Lightbox';

const projects: Project[] = [
  { id: 1, title: 'Das Glashaus', location: 'Oslo, Norwegen', description: 'Eine Vision für gehobenes Wohnen: Dieses Projekt vereint anspruchsvolle Ästhetik mit natürlichen Elementen. Das elegante, terrassierte Profil mit auskragenden Geschossplatten maximiert das Tageslicht und schafft einzigartige Ausblicke. Eine harmonische Mischung aus hellen Bändern und warmen Holzlatten sorgt für eine zeitlose Eleganz. Großzügige, integrierte Begrünung verbessert nicht nur die Luftqualität, sondern schafft auch private, ruhige Oasen im Freien, die den Wohnraum nahtlos erweitern und zur Entspannung einladen.', imageUrl: 'https://i.imgur.com/qLid3gj.jpg', width: 1600, height: 900 },
  { id: 2, title: 'Kulturzentrum "Clover"', location: 'Berlin, Deutschland', description: 'Architekturmodell eines städtischen Eingriffs, dargestellt als isometrische Luftaufnahme. Das Herzstück ist die "Clover"-Struktur, ein fließendes, biomorphes Kulturgebäude mit leuchtenden Konturen und heller Materialität. Eingebettet in ein orthogonales Raster aus dunkleren Holzbauten, die das städtische Umfeld symbolisieren, entsteht ein Dialog zwischen Form und Kontext. Ausgedehnte Baumkronen auf einer hellen Bodenebene unterstreichen den fußgängerfreundlichen öffentlichen Raum und machen das Projekt zu einem leuchtenden Mittelpunkt für die Gemeinschaft.', imageUrl: 'https://i.imgur.com/I7638ZT.jpg', width: 900, height: 1200 },
  { id: 3, title: 'Skyline Turm', location: 'New York, USA', description: 'Ein ikonisches Hochhaus, das die Skyline neu definiert. Nachhaltige Technologie und eine dynamische Fassade schaffen ein Wahrzeichen für die Zukunft.', imageUrl: 'https://i.imgur.com/VJacCuk.jpg', width: 1600, height: 900 },
  { id: 4, title: 'Minimalistischer Rückzugsort', location: 'Kyoto, Japan', description: 'Inspiriert von japanischer Ästhetik, bietet dieses Haus einen ruhigen und harmonischen Lebensraum, der sich auf das Wesentliche konzentriert.', imageUrl: 'https://i.imgur.com/SMLfW0q.jpg', width: 900, height: 1200 },
];

const ProjectItem: React.FC<{ project: Project; index: number; onSelect: (imageUrl: string) => void; }> = React.memo(({ project, index, onSelect }) => {
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
    const isEven = index % 2 === 0;

    const handleClick = () => onSelect(project.imageUrl);

    const imageClasses = `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isEven ? '-translate-x-8' : 'translate-x-8'}`}`;
    const textClasses = `transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isEven ? 'translate-x-8' : '-translate-x-8'}`}`;

    return (
        <div ref={ref} className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className={`w-full md:w-1/2 cursor-pointer group overflow-hidden rounded-lg ${imageClasses}`} onClick={handleClick}>
                 <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" decoding="async" />
            </div>
            <div className={`w-full md:w-1/2 ${textClasses}`}>
                <p className="text-sm font-semibold text-[var(--text-secondary)] tracking-widest uppercase">{project.location}</p>
                <h3 className="text-3xl font-bold mt-2 text-[var(--text-primary)]">{project.title}</h3>
                <p className="text-[var(--text-secondary)] mt-4 leading-relaxed">{project.description}</p>
                <button onClick={handleClick} className="mt-6 text-sm font-bold text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
                    Projekt ansehen &rarr;
                </button>
            </div>
        </div>
    );
});
ProjectItem.displayName = "ProjectItem";

const Projects: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();

  const handleSelectProject = useCallback((imageUrl: string) => {
    setSelectedImage(imageUrl);
}, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)]">Ausgewählte Projekte</h2>
          <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto">Eine kuratierte Auswahl unserer Arbeiten, die unser Engagement für Design, Innovation und Nachhaltigkeit zeigt.</p>
        </div>
        <div className="space-y-24">
            {projects.map((project, index) => (
                 <ProjectItem 
                    key={project.id} 
                    project={project} 
                    index={index} 
                    onSelect={handleSelectProject} 
                />
            ))}
        </div>
      </div>
      {selectedImage && <Lightbox imageUrl={selectedImage} onClose={handleCloseLightbox} />}
    </section>
  );
};

export default Projects;