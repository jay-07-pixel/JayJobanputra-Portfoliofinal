import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaPlay, FaTimesCircle } from 'react-icons/fa';
import ScrollAnimationWrapper from '../layout/ScrollAnimationWrapper';
import TextReveal from '../layout/TextReveal';

type ProjectCategory = 'Freelance / Client Work' | 'Personal Project';

interface Project {
  id: string;
  number: string;
  title: string;
  category: ProjectCategory;
  description: string;
  features: string[];
  technologies: string[];
  image: string | null;
  demoVideo: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
}

const freelanceProjects: Project[] = [
  {
    id: 'kalpanik-task-manager',
    number: '01',
    title: 'Kalpanik Task Manager',
    category: 'Freelance / Client Work',
    description:
      'Full-stack task management platform for business owners and field employees, with a web admin dashboard and companion Android application.',
    features: [
      'KPI dashboard',
      'Task management',
      'Employee assignment',
      'Drag-and-drop task ordering',
      'Real-time team chat',
      'Daily employee task list',
      'Proof submission',
      'FCM-based reminders and alarms',
      'Shared backend between web and Android',
    ],
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'Prisma',
      'MySQL',
      'Java (Android)',
      'Retrofit',
      'OkHttp',
      'Firebase Cloud Messaging',
      'Server-Sent Events',
    ],
    image: null,
    demoVideo: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 'kailash-masale',
    number: '02',
    title: 'Kailash Masale',
    category: 'Freelance / Client Work',
    description:
      'Business management dashboard and Android field application built around a shared real-time Firebase backend.',
    features: [
      'KPI dashboard',
      'Recharts-based analytics',
      'Attendance management',
      'Distributor order management',
      'Android field application',
      'Real-time data synchronization',
    ],
    technologies: [
      'React.js',
      'Vite',
      'Recharts',
      'Java (Android)',
      'Firebase',
      'Material Components',
    ],
    image: null,
    demoVideo: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 'aromawrap',
    number: '03',
    title: 'AromaWrap',
    category: 'Freelance / Client Work',
    description:
      'Full-featured e-commerce platform with product browsing, cart, wishlist, orders and an admin payment management workflow.',
    features: [
      'Product catalog',
      'Shopping cart',
      'Wishlist',
      'Orders',
      'UPI QR payment flow',
      'Firebase backend',
      'Admin payment confirmation/rejection',
      'Responsive modern UI',
    ],
    technologies: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Firebase Auth',
      'Firestore',
      'Storage',
      'TanStack Query',
      'Framer Motion',
    ],
    image: null,
    demoVideo: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 'election-survey-system',
    number: '04',
    title: 'Election Survey System',
    category: 'Freelance / Client Work',
    description:
      'End-to-end election field data platform for location-aware survey collection and ward-level reporting.',
    features: [
      'Android field survey application',
      'Location-aware area/ward collection',
      'Text questions',
      'Single-choice questions',
      'Multiple-choice questions',
      'REST APIs',
      'Ward-level aggregated reporting',
    ],
    technologies: [
      'Java (Android)',
      'Node.js',
      'Express.js',
      'MySQL',
      'OkHttp',
      'Material Design',
    ],
    image: null,
    demoVideo: null,
    githubUrl: null,
    liveUrl: null,
  },
];

const personalProjects: Project[] = [
  {
    id: 'kalpanik-operations-ai',
    number: '01',
    title: 'KALPANIK Operations AI',
    category: 'Personal Project',
    description:
      'Multi-agent AI platform for MSME operations covering order management, workforce scheduling, inventory tracking and delay-risk prediction.',
    features: [
      'Multi-agent AI workflow',
      'WhatsApp order processing',
      'LLM-based natural language order parsing',
      'Product, quantity, deadline and priority extraction',
      'Workforce scheduling',
      'Inventory tracking',
      'ML-based delay-risk prediction',
      'Terminal-style web dashboard',
      'Live deployment on Railway',
    ],
    technologies: [
      'Node.js',
      'Express',
      'Vanilla JavaScript',
      'Python',
      'scikit-learn',
      'LLM / NLP Agents',
      'Railway',
    ],
    image: null,
    demoVideo: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 'faceattend',
    number: '02',
    title: 'FaceAttend',
    category: 'Personal Project',
    description:
      'Smart attendance platform combining facial recognition, GPS geofencing and time-limited QR verification for location-aware attendance.',
    features: [
      'Face recognition',
      'GPS geofencing',
      'Time-limited QR scanning',
      'Multi-factor attendance verification',
      'User management',
      'Late arrival detection',
      'Excel export',
      'Automated email distribution',
    ],
    technologies: [
      'Java (Android)',
      'Firebase Auth',
      'Firestore',
      'Storage',
      'Google ML Kit',
      'ZXing',
      'MPAndroidChart',
    ],
    image: null,
    demoVideo:
      'https://drive.google.com/file/d/1K26cBzgWWWqtkoj3sV_yshhWkGXbVgE7/view?usp=sharing',
    githubUrl: 'https://github.com/jay-07-pixel/FACEATTEND--FINAL-PUSH.git',
    liveUrl: null,
  },
];

const getEmbedVideoUrl = (url: string): string => {
  const driveMatch = url.match(/\/file\/d\/([^/]+)/);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  const youtubeMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  return url;
};

const ProjectCard: React.FC<{
  project: Project;
  onOpenDetails: (project: Project) => void;
  onWatchDemo: (project: Project) => void;
  delay?: number;
}> = ({ project, onOpenDetails, onWatchDemo, delay = 0 }) => {
  const visibleTechs = project.technologies.slice(0, 6);
  const remainingCount = project.technologies.length - visibleTechs.length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4, borderColor: 'rgba(0, 255, 231, 0.4)' }}
      className="bg-surface border border-glow-effect rounded-lg p-5 md:p-6 h-full flex flex-col transition-colors duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-sm font-mono text-primary/80">{project.number}</span>
        <span className="inline-flex items-center px-2.5 py-1 text-[10px] md:text-xs font-semibold tracking-wider uppercase text-primary bg-glow-effect border border-primary/25 rounded-md">
          {project.category === 'Freelance / Client Work' ? 'Client Work' : 'Personal'}
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-light-text mb-3 leading-snug">
        {project.title}
      </h3>

      <p className="text-light-text/70 text-sm md:text-[15px] leading-relaxed mb-5 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {visibleTechs.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-xs text-light-text/85 bg-glow-effect border border-primary/15 rounded-md"
          >
            {tech}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="px-2.5 py-1 text-xs text-primary/80 bg-glow-effect border border-primary/15 rounded-md">
            +{remainingCount}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-auto pt-1">
        <button
          type="button"
          onClick={() => onOpenDetails(project)}
          className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
        >
          View Details →
        </button>

        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-light-text border border-primary/25 rounded-md hover:border-primary/50 hover:text-primary transition-colors"
            >
              <FaExternalLinkAlt size={10} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-light-text border border-primary/25 rounded-md hover:border-primary/50 hover:text-primary transition-colors"
            >
              <FaGithub size={12} />
              View Code
            </a>
          )}
          {project.demoVideo && (
            <button
              type="button"
              onClick={() => onWatchDemo(project)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-light-text border border-primary/25 rounded-md hover:border-primary/50 hover:text-primary transition-colors"
            >
              <FaPlay size={9} />
              Watch Demo
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (selectedProject || showVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, showVideo]);

  const openDetails = (project: Project) => {
    setShowVideo(false);
    setSelectedProject(project);
  };

  const openVideo = (project: Project) => {
    setSelectedProject(project);
    setShowVideo(true);
  };

  const closeModals = () => {
    setSelectedProject(null);
    setShowVideo(false);
  };

  return (
    <section id="projects" className="py-20 bg-dark-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/0 via-glow-effect/5 to-dark-bg/0 opacity-50" />

      <div className="container-section relative z-10">
        <ScrollAnimationWrapper animation="fadeIn">
          <TextReveal
            text="Projects"
            tag="h2"
            className="section-title"
            staggerChildren={0.08}
          />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fadeIn" delay={0.12}>
          <p className="text-center text-light-text/70 max-w-2xl mx-auto -mt-4 mb-14 text-sm md:text-base">
            Things I've built — for clients, for myself, and to explore ideas.
          </p>
        </ScrollAnimationWrapper>

        {/* Freelance & Client Work */}
        <div className="mb-16 md:mb-20">
          <ScrollAnimationWrapper animation="fadeIn">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <h3 className="text-lg md:text-xl font-semibold text-primary tracking-wide uppercase">
                  Freelance &amp; Client Work
                </h3>
              </div>
              <p className="text-light-text/60 text-sm md:text-base max-w-2xl pl-4">
                Real-world products and applications I've built for businesses and clients.
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {freelanceProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={openDetails}
                onWatchDemo={openVideo}
                delay={index * 0.08}
              />
            ))}
          </div>
        </div>

        {/* Personal Projects */}
        <div>
          <ScrollAnimationWrapper animation="fadeIn">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <h3 className="text-lg md:text-xl font-semibold text-primary tracking-wide uppercase">
                  Personal Projects
                </h3>
              </div>
              <p className="text-light-text/60 text-sm md:text-base max-w-2xl pl-4">
                Things I built to explore ideas, solve problems, and push my technical skills.
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {personalProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={openDetails}
                onWatchDemo={openVideo}
                delay={index * 0.08}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Standalone video modal */}
      <AnimatePresence>
        {showVideo && selectedProject?.demoVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={closeModals}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="bg-surface border border-glow-effect rounded-lg overflow-hidden max-w-4xl w-full aspect-video relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModals}
                className="absolute top-3 right-3 text-white/80 hover:text-primary transition-colors z-10"
                aria-label="Close video"
              >
                <FaTimesCircle size={22} />
              </button>
              <iframe
                src={getEmbedVideoUrl(selectedProject.demoVideo)}
                title={`${selectedProject.title} demo`}
                className="w-full h-full"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project details modal */}
      <AnimatePresence>
        {selectedProject && !showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4"
            onClick={closeModals}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="bg-surface border border-glow-effect rounded-lg p-5 md:p-7 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start gap-4 mb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm font-mono text-primary/80">
                      {selectedProject.number}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-primary bg-glow-effect border border-primary/25 rounded-md">
                      {selectedProject.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-light-text">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeModals}
                  className="text-light-text/70 hover:text-primary transition-colors shrink-0 mt-1"
                  aria-label="Close modal"
                >
                  <FaTimesCircle size={20} />
                </button>
              </div>

              <p className="text-light-text/80 mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

              {selectedProject.demoVideo && (
                <div className="mb-6 rounded-lg overflow-hidden border border-glow-effect aspect-video bg-black/40">
                  <iframe
                    src={getEmbedVideoUrl(selectedProject.demoVideo)}
                    title={`${selectedProject.title} demo`}
                    className="w-full h-full"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {selectedProject.image && !selectedProject.demoVideo && (
                <div className="mb-6 rounded-lg overflow-hidden border border-glow-effect">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-primary font-semibold mb-3">Key Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-light-text/75"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-7">
                <h4 className="text-primary font-semibold mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs md:text-sm text-light-text/85 bg-glow-effect border border-primary/15 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(selectedProject.liveUrl ||
                selectedProject.githubUrl ||
                selectedProject.demoVideo) && (
                <div className="flex flex-wrap gap-3">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2"
                    >
                      <FaExternalLinkAlt size={12} />
                      Live Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2"
                    >
                      <FaGithub />
                      View Code
                    </a>
                  )}
                  {selectedProject.demoVideo && (
                    <button
                      type="button"
                      onClick={() => setShowVideo(true)}
                      className="btn-primary flex items-center gap-2"
                    >
                      <FaPlay size={11} />
                      Watch Demo
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
