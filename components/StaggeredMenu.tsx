import * as React from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

// Type definitions for menu items.
export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

// Type definitions for social media links.
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

// Props for the StaggeredMenu component.
export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  items: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  colors?: string[];
  logoUrl?: string;
  logoAlt?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  accentColor?: string;
  isFixed?: boolean;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  items,
  socialItems,
  displaySocials = true,
  displayItemNumbering = true,
  colors = ['#374151', '#111827'],
  logoUrl,
  logoAlt = 'Logo',
  menuButtonColor = 'var(--text-primary)',
  openMenuButtonColor,
  changeMenuColorOnOpen = true,
  accentColor,
  isFixed = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const toggleTextRef = useRef<HTMLDivElement>(null);
  const iconLine1 = useRef<HTMLDivElement>(null);
  const iconLine2 = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!panelRef.current || !preLayersRef.current || !toggleTextRef.current || !iconLine1.current || !iconLine2.current) {
      return;
    }

    const panel = panelRef.current;
    const preLayers = Array.from(preLayersRef.current.children);
    const itemLabels = gsap.utils.toArray('.sm-panel-itemLabel');

    gsap.set(panel, { xPercent: position === 'left' ? -100 : 100, display: 'none' });
    gsap.set(preLayers, { xPercent: position === 'left' ? -101 : 101, display: 'none' });
    gsap.set(itemLabels, { yPercent: 100 });
    gsap.set(iconLine1.current, { transform: 'translate(-50%, calc(-50% - 3px))' });
    gsap.set(iconLine2.current, { transform: 'translate(-50%, calc(-50% + 3px))' });

    const finalOpenColor = changeMenuColorOnOpen ? (openMenuButtonColor || 'var(--bg-primary)') : menuButtonColor;

    timeline.current = gsap.timeline({
      paused: true,
      onStart: () => {
        setIsOpen(true);
        gsap.set([panel, preLayers], { display: 'flex' });
        document.body.style.overflow = 'hidden';
      },
      onReverseComplete: () => {
        setIsOpen(false);
        gsap.set([panel, preLayers], { display: 'none' });
        document.body.style.overflow = '';
      },
    })
    .to(toggleTextRef.current, { y: '-1em', duration: 0.3, ease: 'power1.inOut' })
    .to(iconLine1.current, { transform: 'translate(-50%, -50%) rotate(45deg)', duration: 0.3, ease: 'power2.inOut' }, '<')
    .to(iconLine2.current, { transform: 'translate(-50%, -50%) rotate(-45deg)', duration: 0.3, ease: 'power2.inOut' }, '<')
    .to(menuRef.current, { color: finalOpenColor, duration: 0.3 }, '<')
    .to(panel, { xPercent: 0, duration: 0.8, ease: 'power3.inOut' }, 0)
    .to(preLayers, {
      xPercent: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      stagger: 0.05,
    }, '-=0.7')
    .to(itemLabels, {
      yPercent: 0,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.07,
    }, '-=0.5');

    return () => {
        timeline.current?.kill();
    }

  }, [position, changeMenuColorOnOpen, openMenuButtonColor, menuButtonColor]);

  const toggleMenu = useCallback(() => {
    if (timeline.current) {
        timeline.current.reversed(!timeline.current.reversed());
    }
  }, []);

  const handleLinkClick = useCallback(() => {
    if (timeline.current && !timeline.current.reversed()) {
        timeline.current.reverse();
    }
  }, []);

  const wrapperClasses = `staggered-menu-wrapper ${isFixed ? 'fixed-wrapper' : ''}`;

  return (
    <div
      ref={menuRef}
      className={wrapperClasses}
      data-position={position}
      data-open={isOpen ? '' : undefined}
      style={{ '--sm-accent': accentColor, color: menuButtonColor } as React.CSSProperties}
    >
      <header className="staggered-menu-header">
         <div className="sm-header-right">
             {logoUrl && (
                 <a href="#home" className="sm-logo" aria-label="Zur Startseite">
                    <img src={logoUrl} alt={logoAlt} className="sm-logo-img"/>
                 </a>
             )}
         </div>
        <button
          className="sm-toggle"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={isOpen}
          aria-controls="staggered-menu-panel"
        >
          <span className="sm-toggle-textWrap">
            <div ref={toggleTextRef} className="sm-toggle-textInner">
              <span className="sm-toggle-line">Menü</span>
              <span className="sm-toggle-line">Schließen</span>
            </div>
          </span>
          <div className="sm-icon">
            <div ref={iconLine1} className="sm-icon-line" />
            <div ref={iconLine2} className="sm-icon-line" />
          </div>
        </button>
      </header>
      
      <div ref={preLayersRef} className="sm-prelayers">
          <div className="sm-prelayer" style={{ backgroundColor: colors[0] }} />
          <div className="sm-prelayer" style={{ backgroundColor: colors[1] }} />
      </div>

      <div id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" style={{ backgroundColor: colors[1] }} aria-hidden={!isOpen}>
        <div className="sm-panel-inner">
          <nav>
            <ul className="sm-panel-list" data-numbering={displayItemNumbering ? '' : undefined}>
              {items.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="sm-panel-item"
                    aria-label={item.ariaLabel}
                    onClick={handleLinkClick}
                  >
                    <div className="sm-panel-itemWrap">
                      <span className="sm-panel-itemLabel">{item.label}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list">
                {socialItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.link} className="sm-socials-link" target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaggeredMenu;