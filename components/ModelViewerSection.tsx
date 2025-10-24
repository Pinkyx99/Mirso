import * as React from 'react';
// Fix: Import 'types.ts' for its side-effect of augmenting the global JSX namespace.
// This resolves "Property '...' does not exist on type 'JSX.IntrinsicElements'" errors across the app.
import '../types';
import ModelViewer from './ModelViewer';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ModelViewerSection: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

    return (
        <section id="modell" className="py-20 lg:py-32 bg-[var(--bg-primary)] overflow-hidden">
            <div ref={ref} className="container mx-auto px-6">
                <div className={`text-center mb-12 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)]">3D Modell Interaktiv</h2>
                    <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto">Erkunden Sie ein detailliertes 3D-Modell. Klicken und ziehen Sie, um zu drehen, und scrollen Sie, um zu zoomen.</p>
                </div>
                <div className={`transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex justify-center max-w-4xl mx-auto">
                        <ModelViewer
                            url="https://raw.githubusercontent.com/Pinkyx99/3d/main/f1_2023_ferrari_sf23_s2.glb"
                            width="100%"
                            height={450}
                            enableManualRotation={true}
                            enableManualZoom={true}
                            minZoomDistance={1.5}
                            maxZoomDistance={10}
                            autoRotate={false}
                            fadeIn={true}
                            environmentPreset="city"
                            defaultRotationX={10}
                            defaultRotationY={45}
                            defaultZoom={3}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModelViewerSection;