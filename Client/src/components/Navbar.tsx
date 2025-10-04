import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateNavHeight = () => {
      const h = navRef.current?.offsetHeight ?? 64;
      document.documentElement.style.setProperty('--nav-h', `${h}px`);
    };
    updateNavHeight();
    const onResize = () => updateNavHeight();
    window.addEventListener('resize', onResize);
    // Observe size changes of the nav itself
    let ro: ResizeObserver | undefined;
    if ('ResizeObserver' in window && navRef.current) {
      ro = new ResizeObserver(() => updateNavHeight());
      ro.observe(navRef.current);
    }
    return () => {
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
  }, []);

  return (
    <>
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-neutral-gray)] shadow-lg border-b border-[var(--color-light-gray)]"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
  <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-14 sm:min-h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2 min-w-0 flex-1">
          <img
            src="/Sai_logo.png"
            alt="Sai Heat Treatment Solutions Logo"
            className="h-9 sm:h-11 shrink-0"
          />
          <span className="text-lg sm:text-xl md:text-2xl leading-tight font-semibold font-heading text-[var(--color-dark)] whitespace-nowrap overflow-hidden text-ellipsis">
            Sai Heat Treatment Solutions
          </span>
        </Link>

        {/* Desktop Menu */}
  <div className="hidden lg:flex items-center space-x-6 shrink-0">
          {['/', '/services', '/projects', '/gallery', '/contact'].map((path, idx) => {
            const label = ['Home', 'Services', 'Projects', 'Gallery', 'Contact'][idx];
            return (
              <Link
                key={path}
                to={path}
                className="text-[var(--color-dark)] hover:text-[var(--color-primary-orange)] transition-colors duration-300 font-medium"
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Get a Quote button */}
        <div className="hidden lg:block shrink-0">
          <Link
            to="/quote"
            className="bg-[var(--color-primary-orange)] text-[var(--color-dark)] font-semibold py-2 px-4 rounded-full hover:bg-[var(--color-primary-orange)]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden relative z-50 shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="h-10 w-10 flex items-center justify-center rounded-md text-[var(--color-dark)] focus:outline-none"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[var(--color-neutral-gray)] shadow-lg transition-all duration-300 fixed left-0 right-0 z-40 top-[var(--nav-h)]">
          <div className="flex flex-col items-center justify-center px-6 py-6 space-y-4">
            {['/', '/services', '/projects', '/gallery', '/contact'].map((path, idx) => {
              const label = ['Home', 'Services', 'Projects', 'Gallery', 'Contact'][idx];
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className="text-[var(--color-dark)] hover:text-[var(--color-primary-orange)] font-medium text-lg transition-colors duration-300 text-center w-full"
                >
                  {label}
                </Link>
              );
            })}
            <Link
              to="/quote"
              onClick={() => setMenuOpen(false)}
              className="bg-[var(--color-primary-orange)] text-[var(--color-dark)] font-semibold py-2 px-4 rounded-full hover:bg-[var(--color-primary-orange)]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  {/* Spacer to offset fixed navbar height */}
  <div style={{ height: 'var(--nav-h, 64px)' }} aria-hidden="true" />
    </>
  );
};

export default Navbar;
