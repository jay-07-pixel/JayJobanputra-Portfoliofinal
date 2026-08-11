import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollAnimationWrapper from '../layout/ScrollAnimationWrapper';
import TextReveal from '../layout/TextReveal';

interface SkillCategory {
  title: string;
  technologies: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    technologies: ['React.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Backend',
    technologies: ['Node.js', 'Express.js', 'REST APIs', 'Server-Sent Events'],
  },
  {
    title: 'AI / Machine Learning',
    technologies: [
      'Python',
      'Scikit-learn',
      'TensorFlow',
      'Keras',
      'XGBoost',
      'Pandas',
      'NumPy',
      'Google ML Kit',
    ],
  },
  {
    title: 'Mobile Development',
    technologies: ['Android (Java)', 'Flutter', 'Retrofit', 'OkHttp'],
  },
  {
    title: 'Database & Cloud',
    technologies: [
      'Firebase',
      'Firestore',
      'MySQL',
      'MongoDB',
      'SQLite',
      'Railway',
      'Netlify',
      'Vercel',
    ],
  },
  {
    title: 'Tools & Data',
    technologies: [
      'Git',
      'GitHub',
      'Cursor',
      'Android Studio',
      'VS Code',
      'Postman',
      'Insomnia',
      'Matplotlib',
      'Seaborn',
      'Plotly',
      'Recharts',
      'Tableau',
    ],
  },
];

const Skills: React.FC = () => {
  const skillsRef = useRef(null);
  const inView = useInView(skillsRef, {
    threshold: 0.1,
    once: false,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 },
    },
  };

  return (
    <section id="skills" className="py-20 bg-dark-bg/50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/0 via-glow-effect/10 to-dark-bg/0 opacity-50" />

      <div ref={skillsRef} className="container-section relative z-10">
        <ScrollAnimationWrapper animation="fadeIn">
          <TextReveal
            text="What I Work With"
            tag="h2"
            className="section-title"
            staggerChildren={0.08}
          />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fadeIn" delay={0.15}>
          <p className="text-center text-light-text/70 max-w-2xl mx-auto -mt-4 mb-12 text-sm md:text-base">
            Tools and technologies I use to turn ideas into working products.
          </p>
        </ScrollAnimationWrapper>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch"
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {skillCategories.map((category) => (
            <motion.article
              key={category.title}
              variants={card}
              className="flex flex-col min-h-[200px] lg:min-h-[220px] bg-surface border border-glow-effect rounded-lg p-5 md:p-6 hover:border-primary/40 transition-colors duration-300 group h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:shadow-[0_0_8px_rgba(0,255,231,0.6)] transition-shadow duration-300" />
                <h3 className="text-sm md:text-base font-semibold tracking-wide uppercase text-primary">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 content-start">
                {category.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{
                      y: -2,
                      backgroundColor: 'rgba(0, 255, 231, 0.16)',
                      borderColor: 'rgba(0, 255, 231, 0.45)',
                    }}
                    transition={{ duration: 0.2 }}
                    className="inline-block px-3 py-1.5 text-xs md:text-sm text-light-text/85 bg-glow-effect border border-primary/15 rounded-md cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
