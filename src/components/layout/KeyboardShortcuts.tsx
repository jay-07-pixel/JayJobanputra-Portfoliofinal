import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DESKTOP_QUERY = '(min-width: 1024px)';

const KeyboardShortcuts: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Current portfolio flow order
  const shortcuts = [
    { key: 'h', description: 'Go to Home', section: 'hero' },
    { key: 'a', description: 'Go to About', section: 'about' },
    { key: 's', description: 'Go to Skills', section: 'skills' },
    { key: 'e', description: 'Go to Education', section: 'education' },
    { key: 'p', description: 'Go to Projects', section: 'projects' },
    { key: 'r', description: 'Go to Research', section: 'research' },
    { key: 'c', description: 'Go to Contact', section: 'contact' },
    { key: '/', description: 'Show/Hide Keyboard Shortcuts' },
    { key: 'Ctrl+`', description: 'Toggle Terminal' },
    { key: 'Esc', description: 'Close Modals/Popups' },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);

    const updateDesktop = () => {
      const desktop = mediaQuery.matches;
      setIsDesktop(desktop);
      if (!desktop) {
        setShowHelp(false);
      }
    };

    updateDesktop();
    mediaQuery.addEventListener('change', updateDesktop);

    return () => {
      mediaQuery.removeEventListener('change', updateDesktop);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const scrollToSection = (section: string) => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case '/':
          e.preventDefault();
          setShowHelp((prev) => !prev);
          break;
        case 'h':
          scrollToSection('hero');
          break;
        case 'a':
          scrollToSection('about');
          break;
        case 's':
          scrollToSection('skills');
          break;
        case 'e':
          scrollToSection('education');
          break;
        case 'p':
          scrollToSection('projects');
          break;
        case 'r':
          scrollToSection('research');
          break;
        case 'c':
          scrollToSection('contact');
          break;
        case 'Escape':
          setShowHelp(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDesktop]);

  // Tip popup — desktop/laptop only
  useEffect(() => {
    if (!isDesktop) return;

    const hasSeenTip = localStorage.getItem('hasSeenKeyboardShortcutTip');
    if (hasSeenTip) return;

    const timer = setTimeout(() => {
      setShowHelp(true);
      localStorage.setItem('hasSeenKeyboardShortcutTip', 'true');
    }, 3000);

    return () => clearTimeout(timer);
  }, [isDesktop]);

  if (!isDesktop) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowHelp((prev) => !prev)}
        className="fixed bottom-20 right-6 z-30 w-10 h-10 rounded-full bg-dark-bg border border-primary/50 flex items-center justify-center tech-glow"
        aria-label="Keyboard shortcuts"
        title="Press / for keyboard shortcuts"
      >
        <span className="text-primary font-mono text-xs">/</span>
      </button>

      <AnimatePresence>
        {showHelp && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="relative w-96 bg-dark-bg border border-primary/40 rounded-lg p-4 shadow-lg tech-glow z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-primary text-lg font-mono">Keyboard Shortcuts</h3>
                <button
                  className="text-light-text/50 hover:text-primary"
                  onClick={() => setShowHelp(false)}
                  aria-label="Close shortcuts"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-2 gap-y-2 font-mono">
                {shortcuts.map((shortcut) => (
                  <React.Fragment key={shortcut.key}>
                    <div className="flex items-center">
                      <kbd className="bg-glow-effect px-2 py-0.5 text-xs rounded border border-primary/20 text-primary mr-2">
                        {shortcut.key}
                      </kbd>
                    </div>
                    <div className="text-light-text text-sm">
                      {shortcut.description}
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-light-text/60 text-xs">
                  Press{' '}
                  <kbd className="bg-glow-effect px-1 py-0.5 rounded text-primary">
                    Esc
                  </kbd>{' '}
                  to close
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts;
