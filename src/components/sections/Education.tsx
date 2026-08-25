import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollAnimationWrapper from '../layout/ScrollAnimationWrapper';

const Education: React.FC = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    threshold: 0.15,
    once: false,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 },
    },
  };

  return (
    <section id="education" className="py-10 md:py-12 bg-dark-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/0 via-glow-effect/5 to-dark-bg/0 opacity-50" />

      <div ref={sectionRef} className="container-section relative z-10">
        <ScrollAnimationWrapper animation="fadeIn">
          <h2 className="section-title">Education</h2>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fadeIn" delay={0.15}>
          <p className="text-center text-light-text/70 max-w-2xl mx-auto -mt-4 mb-12 text-sm md:text-base">
            Academic background of Jay Jobanputra in Artificial Intelligence and Data Science.
          </p>
        </ScrollAnimationWrapper>

        <motion.div
          className="flex flex-col gap-5 md:gap-6 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Featured B.Tech card */}
          <motion.article
            variants={item}
            whileHover={{ borderColor: 'rgba(0, 255, 231, 0.4)' }}
            className="bg-surface border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary/50 transition-colors duration-300 group"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="text-sm text-primary font-medium tracking-wide">
                2024 – 2028
              </span>
              <span className="inline-flex items-center px-2.5 py-1 text-[11px] md:text-xs font-semibold tracking-wider uppercase text-primary bg-glow-effect border border-primary/30 rounded-md">
                Current
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-light-text mb-2 group-hover:text-primary/95 transition-colors duration-300">
              B.Tech — Artificial Intelligence &amp; Data Science
            </h3>
            <p className="text-light-text/70 text-sm md:text-base">
              Sanjivani University, Kopargaon
            </p>
          </motion.article>

          {/* XII + X cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <motion.article
              variants={item}
              whileHover={{ borderColor: 'rgba(0, 255, 231, 0.35)' }}
              className="bg-surface border border-glow-effect rounded-lg p-5 md:p-6 hover:border-primary/40 transition-colors duration-300 h-full"
            >
              <span className="text-sm text-primary font-medium tracking-wide">
                2024
              </span>
              <h3 className="text-lg md:text-xl font-bold text-light-text mt-3 mb-2">
                Senior Secondary (XII) — Science
              </h3>
              <p className="text-light-text/70 text-sm mb-4">
                K. B. Rohmare Jr. College, Kopargaon
              </p>
              <p className="text-light-text/60 text-sm">
                MSBSHSE · 63%
              </p>
            </motion.article>

            <motion.article
              variants={item}
              whileHover={{ borderColor: 'rgba(0, 255, 231, 0.35)' }}
              className="bg-surface border border-glow-effect rounded-lg p-5 md:p-6 hover:border-primary/40 transition-colors duration-300 h-full"
            >
              <span className="text-sm text-primary font-medium tracking-wide">
                2022
              </span>
              <h3 className="text-lg md:text-xl font-bold text-light-text mt-3 mb-2">
                Secondary (X)
              </h3>
              <p className="text-light-text/70 text-sm mb-4">
                Shri Sharda English Medium School, Kopargaon
              </p>
              <p className="text-light-text/60 text-sm">
                MSBSHSE · 91.40%
              </p>
            </motion.article>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
