import React from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaInstagram, FaChevronUp } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <footer className="bg-dark-bg pt-12 pb-6" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex justify-center -mt-16 mb-10">
          <Link
            to="hero"
            href="#hero"
            spy={true}
            smooth={true}
            duration={500}
            className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-1"
            aria-label="Back to top — Jay Jobanputra portfolio"
          >
            <FaChevronUp size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-glow-effect pb-8 mb-8">
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Jay Jobanputra</h2>
            <p className="text-light-text/70 mb-4">
              Portfolio of Jay Jobanputra — AI &amp; Data Science developer. Turning ideas into projects
              across machine learning, software, and intelligent applications.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    href={`#${item.to}`}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="text-light-text/70 hover:text-primary transition-colors cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Connect With Me</h2>
            <div className="flex space-x-4">
              <a
                href="https://github.com/jay-07-pixel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-glow-effect text-light-text rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
                aria-label="Jay Jobanputra on GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/jay-jobanputra-1b442931b"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-glow-effect text-light-text rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
                aria-label="Jay Jobanputra on LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/jay_jobanputra07/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-glow-effect text-light-text rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
                aria-label="Jay Jobanputra on Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-light-text/50 text-sm">
            © {currentYear} Jay Jobanputra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
