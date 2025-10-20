import React, { useEffect, useState } from 'react';

interface LightboxProps {
  imageUrl: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageUrl, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setIsVisible(true);
    document.body.style.overflow = 'hidden';

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to finish before calling parent onClose
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Bilder-Lightbox"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-out ${
          isVisible ? 'opacity-80' : 'opacity-0'
        }`}
        onClick={handleClose}
      ></div>

      {/* Content */}
      <div
        className={`relative max-w-4xl max-h-full transform transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imageUrl} alt="Vergrößerte Projektansicht" className="max-w-full max-h-[90vh] object-contain rounded-sm" />
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 h-9 w-9 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl font-bold hover:bg-gray-600 transition-colors"
          aria-label="Lightbox schließen"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Lightbox;