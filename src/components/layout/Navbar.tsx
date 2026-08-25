import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';
import { useTheme } from '../../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Education', to: 'education' },
    { name: 'Projects', to: 'projects' },
    { name: 'Research', to: 'research' },
    { name: 'Contact', to: 'contact' },
  ];

  const navbarClass = scrolled
    ? 'fixed w-full z-50 shadow-md bg-dark-bg/90 backdrop-blur-sm border-b border-primary/10'
    : 'fixed w-full z-50 bg-transparent';

  return (
    <nav className={navbarClass} aria-label="Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="hero"
              href="#hero"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer"
              aria-label="Jay Jobanputra portfolio home"
            >
              <GlitchText
                text="Portfolio"
                tag="span"
                className="text-xl font-bold text-primary"
                intensity="low"
                glitchOnHover={true}
              />
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="ml-6 flex items-center space-x-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  href={`#${link.to}`}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="cursor-pointer text-sm text-light-text hover:text-primary transition duration-300"
                  activeClass="text-primary"
                >
                  {link.name}
                </Link>
              ))}

              <button
                type="button"
                onClick={toggleDarkMode}
                className="ml-2 w-9 h-9 rounded-full border border-primary/30 bg-glow-effect text-primary flex items-center justify-center hover:border-primary/60 transition-colors"
                aria-label={darkMode ? 'Switch to day mode' : 'Switch to night mode'}
                title={darkMode ? 'Day mode' : 'Night mode'}
              >
                {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full border border-primary/30 bg-glow-effect text-primary flex items-center justify-center"
              aria-label={darkMode ? 'Switch to day mode' : 'Switch to night mode'}
            >
              {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-light-text hover:text-primary"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-bg/95 backdrop-blur-sm border-t border-primary/10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  href={`#${link.to}`}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="cursor-pointer block px-3 py-2 text-light-text hover:text-primary transition duration-300"
                  activeClass="text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
