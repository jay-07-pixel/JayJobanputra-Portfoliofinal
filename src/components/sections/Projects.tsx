import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaPlay, FaTimesCircle } from 'react-icons/fa';
import ScrollAnimationWrapper from '../layout/ScrollAnimationWrapper';
import TextReveal from '../layout/TextReveal';

type ProjectCategory = 'Freelance / Client Work' | 'Personal Project';

interface ProjectCaseStudy {
  problem: string;
  solution: string;
  how: string[];
  whyBetter: string[];
}

interface Project {
  id: string;
  number: string;
  title: string;
  category: ProjectCategory;
  description: string;
  caseStudy: ProjectCaseStudy;
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
      'Workforce operations platform for owners, admins, and employees — web Task Manager plus Android Kalpanik Reminder. Isolated multi-tenant deployments (domain, database, uploads) with tasks, proof, chat, live GPS attendance, geofenced check-in, and plan renewal on kalpanik.in.',
    caseStudy: {
      problem:
        'Companies were running field work through chats, calls, and scattered notes. Tasks got lost, ownership was unclear, proof was hard to verify, attendance was manual, and web vs mobile often meant disconnected tools. Each customer also needed isolated data — not one shared database for every company.',
      solution:
        'Kalpanik Task Manager (web PWA) and Kalpanik Reminder (Android) share one REST API and session auth. One GitHub codebase powers every customer site; each company gets its own VPS folder, PM2 process, MySQL database, uploads, and trial. Core workflow: employee submits proof → Submitted → owner Mark as reviewed → recurring series spawns the next due card. Critical work 6+ days overdue is gated until submit or postpone — same rules on web and Android.',
      how: [
        'Built the web app with Vite, Bootstrap, and a Node.js + Express + Prisma + MySQL API (session cookies, gzip, multi-tenant env per site).',
        'Shipped Kalpanik Reminder (native Android) against the same API: tasks, mixed proof uploads, chat SSE, FCM + on-device alarms, attendance gates.',
        'Implemented lists, All Tasks, recurrence spawn-per-occurrence, mixed proof files, team chat (DM/groups), deadline extensions, and owner/admin KPIs.',
        'Added live GPS attendance and geofenced daily check-in/out, plus commercial flow: 30-day trial, in-app plans (₹299 / ₹349), renew on kalpanik.in with bill + UPI QR.',
        'Deployed multi-tenant production (e.g. sugandhshoppee.kalpanik.in and other *.kalpanik.in sites) — one repo, isolated DB/files/sessions per company.',
      ],
      whyBetter: [
        'Better than WhatsApp/spreadsheet ops because tasks, proof, chat, and attendance live in one structured system with clear owner review.',
        'Better than a single shared SaaS DB because each company instance is isolated (domain, MySQL, uploads, trial) while features stay in one codebase.',
        'Better than separate web and mobile products because one API and the same business rules keep web and Android in parity.',
        'Better than generic to-do tools because it is built for workforce ops: geofencing, live location, overdue gates, recurrence, and admin review.',
      ],
    },
    features: [
      'Web Task Manager + Android Kalpanik Reminder',
      'Multi-tenant: one repo, isolated DB per company',
      'Lists, All Tasks, recurrence, high priority',
      'Mixed proof: photos, PDFs, video, audio',
      'Owner review workflow + overdue color tiers',
      '6+ day overdue gate (submit or postpone)',
      'Team chat (DM + groups) with SSE',
      'Live GPS attendance + geofenced check-in/out',
      'Owner dashboard, reports, employee management',
      'Web Push + FCM reminders / alarms',
      'EN / HI / MR / TA + PWA install',
      'Trial + renew plans on kalpanik.in',
    ],
    technologies: [
      'Vite',
      'Bootstrap 5',
      'Node.js',
      'Express.js',
      'Prisma',
      'MySQL',
      'Android (Java)',
      'Retrofit / OkHttp',
      'Firebase Cloud Messaging',
      'Server-Sent Events',
      'Web Push (VAPID)',
      'Google Maps',
      'Chart.js',
      'nginx / PM2',
    ],
    image: null,
    demoVideo: null,
    githubUrl: 'https://github.com/jay-07-pixel/Task_manager',
    liveUrl: 'https://sugandhshoppee.kalpanik.in',
  },
  {
    id: 'kailash-masale',
    number: '02',
    title: 'Kailash Masale',
    category: 'Freelance / Client Work',
    description:
      'Business management dashboard and Android field application built around a shared real-time Firebase backend.',
    caseStudy: {
      problem:
        'The business needed a practical way to track attendance, distributor orders, and operational KPIs while field teams worked away from the office — without waiting on delayed manual reports.',
      solution:
        'A React business dashboard paired with an Android field app, both connected to the same Firebase backend for real-time sync of attendance, orders, and analytics.',
      how: [
        'Built a Vite + React dashboard with Recharts for KPI and analytics views.',
        'Created an Android field application for on-ground attendance and order workflows.',
        'Used Firebase as the shared real-time backend so web and mobile stay synchronized.',
        'Designed the UI around day-to-day business operations instead of generic CRM complexity.',
      ],
      whyBetter: [
        'Better than spreadsheet tracking because updates sync in real time across office and field.',
        'Better than building two disconnected systems because one Firebase backend reduces duplication and sync bugs.',
        'Better than heavy enterprise software because it focuses on the exact workflows this business actually uses.',
      ],
    },
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
      'Full-stack e-commerce for natural incense and fragrance products — React storefront, Express REST API, and MySQL (Prisma). Browse catalog, cart and wishlist, COD or UPI checkout, reviews, order tracking, and an admin dashboard for products, inventory, and payment verification.',
    caseStudy: {
      problem:
        'A fragrance brand needed a real online store — not a static catalog. Customers needed search, cart, wishlist, and checkout that fit Indian UPI habits, while packaging QR codes required stable product URLs. Admins needed inventory, orders, and a way to verify UPI claims without a heavy payment-gateway setup on day one.',
      solution:
        'AromaWrap is a full-stack shop at aromawrap.co.in: React storefront + Express API + MySQL via Prisma (no Firebase). Session auth, server-side cart/wishlist, slug product URLs for packaging QR codes, COD and dynamic UPI QR checkout with admin confirm/reject, plus star ratings and reviews.',
      how: [
        'Built the storefront with React 18, TypeScript, Vite, Tailwind, shadcn/ui, Framer Motion, and TanStack Query.',
        'Implemented Express 5 + Prisma + MySQL for auth, products, reviews, cart, wishlist, orders, profile, addresses, and uploads.',
        'Added permanent slug URLs (/product/lavender) so packaging QR codes stay valid across price/image updates.',
        'Shipped UPI flow: dynamic QR + deep link → customer “I Have Paid” → admin approve/reject in the dashboard; COD as the alternative.',
        'Delivered admin CRUD (multi-image products, inventory, order status) and password-reset OTP via SMTP; deployed with nginx + PM2.',
      ],
      whyBetter: [
        'Better than a static catalog because customers can buy end-to-end — cart, checkout, orders, and reviews.',
        'Better than Firebase-only storefronts when catalog, cart, and orders need a proper MySQL-backed API.',
        'Better than heavy gateway integrations when UPI QR + admin verification matches how the business actually gets paid.',
        'Better than fragile product ID links because slug URLs keep printed packaging QR codes stable.',
      ],
    },
    features: [
      'Home: New Arrivals & Best Sellers',
      'Categories, search, pagination',
      'Slug product URLs for packaging QR',
      'Cart & wishlist (server-side)',
      'Checkout: COD + UPI QR',
      'Admin UPI payment verify',
      'Star ratings & reviews',
      'Account, addresses, order tracking',
      'Admin product CRUD & inventory',
      'Multi-image product uploads',
      'Password reset via email OTP',
    ],
    technologies: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'shadcn/ui',
      'TanStack Query',
      'Framer Motion',
      'Node.js',
      'Express.js',
      'Prisma',
      'MySQL',
      'express-session',
      'Nodemailer',
      'nginx / PM2',
    ],
    image: null,
    demoVideo: null,
    githubUrl: 'https://github.com/jay-07-pixel/AROMAWRAP.git',
    liveUrl: 'https://aromawrap.co.in',
  },
  {
    id: 'election-survey-system',
    number: '04',
    title: 'Election Survey System',
    category: 'Freelance / Client Work',
    description:
      'End-to-end election field data platform for location-aware survey collection and ward-level reporting.',
    caseStudy: {
      problem:
        'Field survey data was hard to collect accurately across wards. Paper forms and disconnected apps made it difficult to know where responses came from and to aggregate results quickly.',
      solution:
        'An Android field survey app connected to REST APIs and MySQL, with location-aware ward/area collection and ward-level aggregated reporting.',
      how: [
        'Built an Android survey app for text, single-choice, and multiple-choice questions.',
        'Captured location-aware area/ward context during collection.',
        'Created Node.js + Express REST APIs backed by MySQL for storage and reporting.',
        'Aggregated responses into ward-level reports for faster analysis.',
      ],
      whyBetter: [
        'Better than paper surveys because data is structured, searchable, and report-ready.',
        'Better than generic form tools because ward/location context is built into the workflow.',
        'Better than offline-only collection because a central API + database enables aggregation across teams.',
      ],
    },
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
    caseStudy: {
      problem:
        'Many MSMEs still receive orders through WhatsApp in natural language. Manually converting those messages into structured orders, schedules, and inventory updates is slow and error-prone.',
      solution:
        'A multi-agent AI operations platform that parses WhatsApp-style orders with LLMs, manages workforce/inventory workflows, predicts delay risk with ML, and exposes a terminal-style dashboard.',
      how: [
        'Designed a multi-agent workflow for order intake, parsing, scheduling, and tracking.',
        'Used LLM/NLP agents to extract product, quantity, deadline, and priority from natural language.',
        'Added Python + scikit-learn for ML-based delay-risk prediction.',
        'Built a Node/Express + vanilla JS terminal-style dashboard and deployed it on Railway.',
      ],
      whyBetter: [
        'Better than manual chat handling because orders become structured operational data.',
        'Better than a single chatbot demo because it connects parsing to scheduling, inventory, and risk prediction.',
        'Better than spreadsheet ops tools when the input is messy natural language from WhatsApp.',
      ],
    },
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
    caseStudy: {
      problem:
        'Traditional attendance systems are easy to misuse through proxy marking. A single check (face, QR, or location alone) is usually not enough for trustworthy attendance.',
      solution:
        'A multi-factor Android attendance platform combining face recognition, GPS geofencing, and time-limited QR verification, with reporting and automated email distribution.',
      how: [
        'Used Google ML Kit for on-device face recognition.',
        'Added GPS geofencing so attendance only works within allowed locations.',
        'Implemented time-limited QR scanning with ZXing as an extra verification layer.',
        'Stored data with Firebase Auth/Firestore/Storage and supported Excel export plus automated email distribution.',
      ],
      whyBetter: [
        'Better than punch-card or single QR systems because proxy attendance is much harder.',
        'Better than face-only solutions because location and time-bound QR add stronger verification.',
        'Better than manual registers because late detection, exports, and email distribution are automated.',
      ],
    },
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

const CaseStudySection: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="rounded-lg border border-primary/15 bg-dark-bg/40 p-4 md:p-5">
    <h4 className="text-xs font-semibold tracking-wider uppercase text-primary mb-2">
      {label}
    </h4>
    <div className="text-sm md:text-[15px] text-light-text/80 leading-relaxed">
      {children}
    </div>
  </div>
);

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
          View Case Study →
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
                      Project Brief
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-light-text/70 bg-glow-effect border border-primary/15 rounded-md">
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

              <p className="text-light-text/75 mb-6 leading-relaxed text-sm md:text-base">
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

              <div className="mb-6 space-y-3">
                <CaseStudySection label="Problem">
                  <p>{selectedProject.caseStudy.problem}</p>
                </CaseStudySection>

                <CaseStudySection label="Solution">
                  <p>{selectedProject.caseStudy.solution}</p>
                </CaseStudySection>

                <CaseStudySection label="How we built it">
                  <ul className="space-y-2">
                    {selectedProject.caseStudy.how.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CaseStudySection>

                <CaseStudySection label="Why this approach is better">
                  <ul className="space-y-2">
                    {selectedProject.caseStudy.whyBetter.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CaseStudySection>
              </div>

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
