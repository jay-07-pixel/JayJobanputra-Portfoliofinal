import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-scroll';
import FloatingAnimation from '../layout/FloatingAnimation';
import ParallaxEffect from '../layout/ParallaxEffect';

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="Jay Jobanputra — portfolio introduction"
      className="h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Corner decorations — stronger, still clear of center text */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <FloatingAnimation
          x={6}
          y={8}
          duration={14}
          className="absolute top-24 left-4 md:left-8 opacity-45 dark:opacity-40 hidden sm:block"
        >
          <div className="p-3 border border-primary/45 rounded bg-surface/50 dark:bg-dark-bg/40 font-mono text-[10px] md:text-xs max-w-[160px]">
            <pre className="text-primary">{`init() {
  return true;
}`}</pre>
          </div>
        </FloatingAnimation>

        <FloatingAnimation
          x={6}
          y={8}
          duration={16}
          delay={1}
          className="absolute top-24 right-4 md:right-8 opacity-45 dark:opacity-40 hidden sm:block"
        >
          <div className="p-3 border border-primary/45 rounded bg-surface/50 dark:bg-dark-bg/40 font-mono text-[10px] md:text-xs max-w-[160px]">
            <pre className="text-primary">{`export default App;`}</pre>
          </div>
        </FloatingAnimation>

        <div className="absolute inset-0 bg-grid-pattern opacity-25 dark:opacity-20" />

        <FloatingAnimation
          x={5}
          y={5}
          rotate={8}
          duration={10}
          className="absolute bottom-28 left-8 hidden lg:block opacity-70 dark:opacity-60"
        >
          <div className="w-10 h-10 border-2 border-primary/50 rounded-sm grid grid-cols-2 grid-rows-2">
            <div className="border-r border-b border-primary/40" />
            <div className="border-b border-primary/40" />
            <div className="border-r border-primary/40" />
            <div />
          </div>
        </FloatingAnimation>

        <FloatingAnimation
          x={5}
          y={5}
          rotate={10}
          duration={12}
          delay={0.4}
          className="absolute bottom-28 right-8 hidden lg:block opacity-70 dark:opacity-60"
        >
          <div className="w-12 h-12 border-2 border-primary/50">
            <div className="relative w-full h-full">
              <div className="absolute top-2 left-2 w-2.5 h-2.5 bg-primary/55" />
              <div className="absolute bottom-2 right-2 w-5 h-1 bg-primary/55" />
            </div>
          </div>
        </FloatingAnimation>
      </div>

      <div className="container mx-auto px-4 z-10 text-center relative">
        <ParallaxEffect direction="up" offset={50} className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-medium text-primary"
          >
            Welcome to my portfolio
          </motion.p>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-light-text"
            >
              Jay Jobanputra
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mt-3"
            >
              AI &amp; Data Science Developer
            </motion.p>

            <div className="h-14 md:h-20 flex items-center justify-center mt-2" aria-hidden="true">
              <Typewriter
                options={{
                  strings: [
                    'A B.Tech AI & Data Science student.',
                    'A Frontend Developer.',
                    'A Backend Developer.',
                    'A App Developer.',
                    'A Startup Enthusiast.',
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-lg md:text-xl max-w-2xl mx-auto text-light-text/80"
          >
            Creating what you see. Calculating what you don’t.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 pt-6"
          >
            <Link
              to="projects"
              href="#projects"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              className="btn-primary"
            >
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                View My Work
              </motion.span>
            </Link>
            <Link
              to="contact"
              href="#contact"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              className="border-b-2 border-primary text-light-text hover:text-primary transition-colors duration-300"
            >
              Contact Me
            </Link>
          </motion.div>
        </ParallaxEffect>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-light-text/80 text-sm mb-2">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15] }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 1,
            }}
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
