import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollAnimationWrapper from '../layout/ScrollAnimationWrapper';
import TextReveal from '../layout/TextReveal';

interface Publication {
  title: string;
  authors: string;
  venue: string;
  location: string;
  status: string;
  doi: string;
  description: string;
  publicationUrl: string;
  googleScholarUrl: string;
}

const publication: Publication = {
  title:
    'Optimized Feature Selection And Machine Learning Techniques for Early Detection of Chronic Kidney Disease',
  authors: 'Jay Nilesh Jobanputra · K. Vengatesan · V.D. Ambeth Kumar et al.',
  venue: 'IEEE GITCON 2025',
  location: 'Belagavi, India',
  status: 'Published in IEEE Xplore',
  doi: '10.1109/GITCON65266.2025.11377145',
  description:
    'Developed a machine learning framework for early detection of Chronic Kidney Disease using Recursive Feature Elimination (RFE) and Mutual Information Gain.',
  publicationUrl: '',
  googleScholarUrl: '',
};

const metrics = [
  { value: '400', label: 'Patient Records' },
  { value: '26', label: 'Clinical Features' },
  { value: '7+', label: 'ML Algorithms' },
  { value: 'RFE', label: 'Feature Selection' },
];

const keyPoints = [
  'Feature selection using RFE + Mutual Information Gain',
  '7+ ML algorithms evaluated',
  'Random Forest, XGBoost, SVM & Naive Bayes',
];

const Research: React.FC = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    threshold: 0.12,
    once: false,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 16 },
    },
  };

  return (
    <section id="research" className="py-8 md:py-10 bg-dark-bg/50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/0 via-glow-effect/10 to-dark-bg/0 opacity-50" />

      <div ref={sectionRef} className="max-w-[1200px] mx-auto px-4 relative z-10">
        <ScrollAnimationWrapper animation="fadeIn">
          <TextReveal
            text="Research & Publications"
            tag="h2"
            className="text-3xl md:text-4xl font-bold mb-3 text-center relative after:content-[''] after:absolute after:w-16 after:h-1 after:bg-primary after:left-1/2 after:-translate-x-1/2 after:bottom-[-8px]"
            staggerChildren={0.06}
          />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fadeIn" delay={0.08}>
          <p className="text-center text-light-text/70 max-w-2xl mx-auto mt-5 mb-7 text-sm md:text-base">
            Exploring machine learning through research and real-world problems.
          </p>
        </ScrollAnimationWrapper>

        <motion.div
          className="max-w-5xl mx-auto flex flex-col gap-3 md:gap-4"
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Paper identity */}
          <motion.article
            variants={item}
            whileHover={{ borderColor: 'rgba(0, 255, 231, 0.4)' }}
            className="bg-surface border border-primary/30 rounded-lg px-5 py-4 md:px-6 md:py-5 transition-colors duration-300"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                  Research Publication
                </span>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] md:text-xs font-semibold tracking-wider uppercase text-primary bg-glow-effect border border-primary/30 rounded-md">
                IEEE Xplore
              </span>
            </div>

            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-light-text leading-snug mb-2">
              {publication.title}
            </h3>

            <p className="text-sm text-light-text/70 mb-3">
              {publication.authors}
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs text-primary bg-glow-effect border border-primary/25 rounded-md">
                {publication.venue}
              </span>
              <span className="px-2.5 py-1 text-xs text-light-text/75 bg-surface border border-glow-effect rounded-md">
                {publication.location}
              </span>
              <span className="px-2.5 py-1 text-xs text-light-text/75 bg-surface border border-glow-effect rounded-md">
                {publication.status}
              </span>
            </div>
          </motion.article>

          {/* Compact metrics */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3"
          >
            {metrics.map((metric) => (
              <motion.div
                key={metric.label}
                whileHover={{ borderColor: 'rgba(0, 255, 231, 0.4)', y: -1 }}
                className="bg-surface border border-glow-effect rounded-lg px-3 py-2.5 md:py-3 text-center transition-colors duration-300"
              >
                <p className="text-xl md:text-2xl font-bold text-primary leading-none mb-1">
                  {metric.value}
                </p>
                <p className="text-[11px] md:text-xs text-light-text/65 leading-snug">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Combined overview + access */}
          <motion.article
            variants={item}
            whileHover={{ borderColor: 'rgba(0, 255, 231, 0.35)' }}
            className="bg-surface border border-glow-effect rounded-lg px-5 py-4 md:px-6 md:py-5 transition-colors duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6 items-start">
              <div className="lg:col-span-3">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-primary mb-2.5">
                  Research Overview
                </h4>
                <p className="text-light-text/80 text-sm leading-relaxed mb-3">
                  {publication.description}
                </p>
                <ul className="space-y-1.5">
                  {keyPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-light-text/70"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2 lg:border-l lg:border-primary/15 lg:pl-6">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-primary mb-2.5">
                  Publication &amp; Access
                </h4>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-light-text font-medium">
                      IEEE GITCON 2025
                    </p>
                    <p className="text-sm text-light-text/65">
                      Presented at Belagavi, India
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-light-text font-medium">
                      Published &amp; Indexed
                    </p>
                    <p className="text-sm text-light-text/65">
                      IEEE Xplore · Google Scholar
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-light-text/45 mb-0.5">
                      DOI
                    </p>
                    <p className="text-xs font-mono text-primary/80 break-all leading-relaxed">
                      {publication.doi}
                    </p>
                  </div>
                </div>

                {(publication.publicationUrl || publication.googleScholarUrl) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {publication.publicationUrl && (
                      <a
                        href={publication.publicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm py-1.5 px-4"
                      >
                        View Paper
                      </a>
                    )}
                    {publication.googleScholarUrl && (
                      <a
                        href={publication.googleScholarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm py-1.5 px-4"
                      >
                        Google Scholar
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
