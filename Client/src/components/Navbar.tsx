import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/Sai_logo.png" alt="Sai Heat Treatment Solutions Logo" className="h-12 mr-3" />
          <span className={`text-xl font-semibold transition-colors duration-300 font-heading ${
            isScrolled ? 'text-black' : 'text-white'
          } hidden md:block`}>
            Sai Heat Treatment Solutions
          </span>
        </Link>
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className={`transition-all duration-300 relative ${
              isScrolled ? 'text-black hover:text-primary-orange' : 'text-white hover:text-primary-orange'
            } ${isActive('/') ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary-orange' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`transition-all duration-300 relative ${
              isScrolled ? 'text-black hover:text-primary-orange' : 'text-white hover:text-primary-orange'
            } ${isActive('/about') ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary-orange' : ''}`}
          >
            About
          </Link>
          <Link
            to="/services"
            className={`transition-all duration-300 relative ${
              isScrolled ? 'text-black hover:text-primary-orange' : 'text-white hover:text-primary-orange'
            } ${isActive('/services') ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary-orange' : ''}`}
          >
            Services
          </Link>
          <Link
            to="/projects"
            className={`transition-all duration-300 relative ${
              isScrolled ? 'text-black hover:text-primary-orange' : 'text-white hover:text-primary-orange'
            } ${isActive('/projects') ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary-orange' : ''}`}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className={`transition-all duration-300 relative ${
              isScrolled ? 'text-black hover:text-primary-orange' : 'text-white hover:text-primary-orange'
            } ${isActive('/contact') ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary-orange' : ''}`}
          >
            Contact
          </Link>
        </div>
        <div>
          <Link
            to="/contact"
            className="bg-primary-orange text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-orange/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;