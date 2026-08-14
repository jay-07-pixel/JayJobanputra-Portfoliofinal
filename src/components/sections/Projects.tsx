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
  /** Button label for liveUrl (default: Live Demo) */
  liveLabel?: string;
}

const freelanceProjects: Project[] = [
  {
    id: 'kalpanik-task-manager',
    number: '01',
    title: 'Kalpanik Task Manager',
    category: 'Freelance / Client Work',
    description:
      'Workforce operations platform for owners, admins, and employees — web Task Manager plus Android Kalpanik Reminder. Isolated multi-tenant deployments (domain, database, uploads) with tasks, proof, chat, live GPS attendance, geofenced check-in, and plan renewal on kalpanik.in. Live instance: Kailash Masale.',
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
        'Deployed multi-tenant production (e.g. Kailash Masale and other company sites) — one repo, isolated DB/files/sessions per company.',
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
    liveUrl: 'https://geek-prototype-precious-determined.trycloudflare.com/',
    liveLabel: 'Try UI Demo',
  },
  {
    id: 'kailash-masale',
    number: '02',
    title: 'Kailash Masale',
    category: 'Freelance / Client Work',
    description:
      'Field sales operations system for Kailash Masale — React admin dashboard plus Android field app on one Firebase project. Managers track attendance, orders, targets, leaves, TA/DA expenditure, and tasks; field staff check in/out, capture orders, and get FCM when tasks are assigned. Public UI demo (frontend only, no live backend) so visitors can click through the dashboard themselves.',
    caseStudy: {
      problem:
        'Field sales ran on paper, calls, and delayed reports. Managers could not see live check-ins, orders, or targets, and assigning work to the phone meant chasing people manually. Attendance, leaves, weekly plans, and TA/DA all lived in different places.',
      solution:
        'One Firestore-backed system: a React/Vite operations dashboard for admins and a Java Android app for employees/managers. Real-time onSnapshot sync. When an admin writes a pending task, Cloud Function notifyTaskAssigned sends FCM to the employee’s tokens — the website never calls FCM itself. A Netlify UI demo lets recruiters explore the dashboard without needing production credentials.',
      how: [
        'Built the web control plane with React 19, Vite 7, React Router, and Recharts for live KPIs, orders, attendance, approvals, and expenditure.',
        'Shipped the Android companion (Java 11): GPS check-in/out, weekly/monthly plans, orders, leave, DA/TA, performance, and a notification permission wizard for reliable FCM.',
        'Used Firebase Auth (web), Firestore, Storage, and Cloud Functions; Android stores fcmTokens on employees/{id} at login.',
        'Implemented Master Sheet geofences/routes, disbursement (salary, TA, DA, night halt, incentives), leave/Sunday approvals, stock sheets, and distributor targets.',
        'Wired task assign/edit/complete on the dashboard to Firestore tasks/{id} so notifyTaskAssigned pushes title + description to the phone.',
        'Published a frontend-only Netlify preview so people can experience the UI themselves instead of watching a video.',
      ],
      whyBetter: [
        'Better than spreadsheets and WhatsApp because attendance, orders, and tasks sync live between office dashboard and field phones.',
        'Better than two separate backends because one Firebase project keeps web and Android on the same source of truth.',
        'Better than in-app-only alerts because Cloud Functions + FCM reach employees even when the app is closed.',
        'Better than generic CRM because workflows match this business: geofenced locations, TA/DA rules, weekly plans, and stock sheets.',
      ],
    },
    features: [
      'Admin dashboard: live KPIs & charts',
      'Check-in / check-out with GPS & maps',
      'Orders, SKUs, volume tracking',
      'Pending tasks → FCM to Android',
      'My Team, Master Sheet, geofences',
      'Leaves & Sunday work approvals',
      'Weekly plans & monthly targets',
      'Expenditure: salary, TA, DA, NH',
      'Stock sheets (Storage upload)',
      'Android: employee + manager modes',
      'Distributor assignment & targets',
      'Real-time Firestore sync',
      'Public UI demo on Netlify',
    ],
    technologies: [
      'React 19',
      'Vite 7',
      'Recharts',
      'Java (Android)',
      'Firebase Auth',
      'Cloud Firestore',
      'Firebase Storage',
      'Cloud Functions',
      'Firebase Cloud Messaging',
      'Material Components',
      'Netlify',
    ],
    image: null,
    demoVideo: null,
    githubUrl: null,
    liveUrl: 'https://unrivaled-moxie-86f523.netlify.app/',
    liveLabel: 'Try UI Demo',
  },
  {
    id: 'aromawrap',
    number: '03',
    title: 'AromaWrap',
    category: 'Freelance / Client Work',
    description:
      'Full-stack e-commerce for natural incense and fragrance products. React storefront → Express REST API → MySQL (Prisma); product images on server disk at /uploads. Customers browse, cart, wishlist, COD/UPI checkout, review, and track orders; admins manage catalog, inventory, orders, and UPI verification.',
    caseStudy: {
      problem:
        'A fragrance brand needed a real online store — not a static catalog. Customers needed search, cart, wishlist, and checkout that fit Indian UPI habits, while packaging QR codes required stable product URLs. Admins needed inventory, orders, and a way to verify UPI claims without a heavy payment-gateway setup on day one.',
      solution:
        'AromaWrap at aromawrap.co.in stores catalog, cart, wishlist, orders, auth, and reviews in MySQL via Express + Prisma. Product images upload with Multer to server/uploads and serve at /uploads/*. Session cookies handle auth; slug product URLs power packaging QR codes; checkout supports COD and dynamic UPI QR with admin confirm/reject.',
      how: [
        'Built the storefront with React 18, TypeScript, Vite, Tailwind, shadcn/ui, Framer Motion, TanStack Query, and qrcode.react for UPI QR.',
        'Implemented Express 5 + Prisma + MySQL for auth, products, reviews, cart, wishlist, orders, profile, addresses, and Multer uploads.',
        'Kept core commerce data on the server (MySQL + disk); only recently viewed / recent searches stay in browser localStorage.',
        'Added permanent slug URLs (/product/lavender) so packaging QR codes stay valid across price/image updates.',
        'Shipped UPI flow: dynamic QR + deep link → “I Have Paid” → admin approve/reject; COD as the alternative; admin CRUD and SMTP password-reset OTP; nginx + PM2 deploy.',
      ],
      whyBetter: [
        'Better than a static catalog because customers can buy end-to-end — cart, checkout, orders, and reviews.',
        'Better than Firebase-backed storefronts when catalog, cart, orders, and images need a MySQL API and server disk storage.',
        'Better than heavy gateway integrations when UPI QR + admin verification matches how the business actually gets paid.',
        'Better than fragile product ID links because slug URLs keep printed packaging QR codes stable.',
      ],
    },
    features: [
      'Home: New Arrivals & Best Sellers',
      'Categories, search, quick view',
      'Slug product URLs for packaging QR',
      'Server-side cart & wishlist',
      'Checkout: COD + UPI QR',
      'Admin UPI payment verify',
      'Star ratings & reviews',
      'Account, addresses, order tracking',
      'Admin product CRUD & inventory',
      'Multi-image uploads to /uploads',
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
      'Multer',
      'Nodemailer',
      'nginx / PM2',
    ],
    image: null,
    demoVideo: null,
    githubUrl: 'https://github.com/jay-07-pixel/AROMAWRAP.git',
    liveUrl: 'https://aromawrap.co.in',
    liveLabel: 'Visit Website',
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
    title: 'Attendify',
    category: 'Personal Project',
    description:
      'Native Android (Java) smart attendance for offices — face verification, GPS geofencing, and optional time-limited QR. Admins manage users, offices, QR codes, and CSV email reports. UI in English, Hindi, and Marathi (branded Sugandh Shoppee, Nagpur).',
    caseStudy: {
      problem:
        'Manual registers and simple punch apps are easy to abuse: buddy punching, marking from the wrong site, weak late flags, and no reliable audit trail for owners or HR.',
      solution:
        'Attendify accepts a punch only after defense-in-depth checks: Firebase login + role, office assignment, GPS inside the office radius, then face match against faces/{uid}.jpg (ML Kit + weighted similarity) or a valid same-day QR — plus per-user late detection, history, and CSV email reports.',
      how: [
        'Built a full Android client (Java 17) with Firebase Auth, Firestore, and Storage — no separate REST API.',
        'Implemented on-device face pipeline with CameraX + ML Kit: enroll to Storage, live capture, quality gates (pose, eyes, size), lighting-adaptive match thresholds (0.85–0.95).',
        'Added fused-location geofencing (default 100 m) so only assigned in-range offices can be selected.',
        'Shipped time-limited QR (ZXing) as backup when lighting is poor — expiry in payload and Firestore, same-day rule, still location-aware.',
        'Delivered admin CRUD for users/offices, daily & user reports with CSV share, and runtime EN / HI / MR including localized names and place names.',
      ],
      whyBetter: [
        'Better than punch-card or single-QR apps because login, assignment, geo, and face/QR must all pass.',
        'Better than face-only systems because location and late rules block remote or late punches.',
        'Better than paper registers because history, late flags, and emailable CSV reports are built in.',
        'Better than English-only HR tools for this market — full UI and name/place display in Hindi and Marathi.',
      ],
    },
    features: [
      'Employee check-in / check-out',
      'On-device face verification (ML Kit)',
      'GPS geofencing per assigned office',
      'Time-limited QR backup punch',
      'Per-user late detection',
      'Attendance history + stats',
      'Admin: users, offices, QR generator',
      'Daily & user reports → email CSV',
      'EN / HI / MR language switch',
      'Forgot password (Firebase)',
      'Role-based User vs Admin login',
    ],
    technologies: [
      'Java 17 (Android)',
      'Firebase Auth',
      'Cloud Firestore',
      'Firebase Storage',
      'Google ML Kit Face Detection',
      'CameraX',
      'Play Services Location',
      'ZXing',
      'Material Components',
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

type DetailTab = 'overview' | 'story' | 'approach' | 'details';

const DETAIL_TABS: { id: DetailTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'story', label: 'Problem → Solution' },
  { id: 'approach', label: 'How & Why' },
  { id: 'details', label: 'Features & Stack' },
];

const ProjectLinks: React.FC<{
  project: Project;
  onWatchDemo?: () => void;
  compact?: boolean;
}> = ({ project, onWatchDemo, compact }) => {
  const btn = compact
    ? 'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-primary/30 rounded-md text-light-text hover:border-primary hover:text-primary transition-colors'
    : 'btn-primary flex items-center gap-2';

  return (
    <>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
        >
          <FaExternalLinkAlt size={compact ? 10 : 12} />
          {project.liveLabel || 'Live Demo'}
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
        >
          <FaGithub size={compact ? 12 : undefined} />
          View Code
        </a>
      )}
      {project.demoVideo && onWatchDemo && (
        <button type="button" onClick={onWatchDemo} className={btn}>
          <FaPlay size={compact ? 9 : 11} />
          Watch Demo
        </button>
      )}
    </>
  );
};

const ProjectDetailsModal: React.FC<{
  project: Project;
  onClose: () => void;
  onWatchDemo: () => void;
}> = ({ project, onClose, onWatchDemo }) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  useEffect(() => {
    setActiveTab('overview');
  }, [project.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        className="relative z-10 flex flex-col w-full sm:max-w-4xl h-[92vh] sm:h-auto sm:max-h-[88vh] bg-surface border border-primary/20 sm:rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="shrink-0 border-b border-primary/15 bg-surface/95 backdrop-blur-sm px-4 pt-4 pb-0 md:px-6 md:pt-5">
          <div className="flex justify-between items-start gap-3 mb-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono text-primary/80">{project.number}</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-primary bg-glow-effect border border-primary/25 rounded">
                  {project.category === 'Freelance / Client Work' ? 'Client Work' : 'Personal'}
                </span>
              </div>
              <h3
                id="project-detail-title"
                className="text-xl md:text-2xl font-bold text-light-text leading-tight truncate sm:whitespace-normal"
              >
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-light-text/60 hover:text-primary transition-colors shrink-0 p-1"
              aria-label="Close"
            >
              <FaTimesCircle size={22} />
            </button>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 overflow-x-auto pb-px -mx-1 px-1 scrollbar-thin"
            role="tablist"
            aria-label="Project sections"
          >
            {DETAIL_TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative shrink-0 px-3 py-2.5 text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                    active
                      ? 'text-primary'
                      : 'text-light-text/55 hover:text-light-text/85'
                  }`}
                >
                  {tab.label}
                  {active && (
                    <motion.span
                      layoutId="project-detail-tab"
                      className="absolute left-2 right-2 bottom-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab panels — only this area scrolls */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-5 md:px-6 md:py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-5">
                  <p className="text-light-text/80 text-sm md:text-[15px] leading-relaxed">
                    {project.description}
                  </p>

                  {project.demoVideo && (
                    <div className="rounded-lg overflow-hidden border border-primary/15 aspect-video bg-black/40">
                      <iframe
                        src={getEmbedVideoUrl(project.demoVideo)}
                        title={`${project.title} demo`}
                        className="w-full h-full"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {project.image && !project.demoVideo && (
                    <div className="rounded-lg overflow-hidden border border-primary/15">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      {
                        label: 'Type',
                        value:
                          project.category === 'Freelance / Client Work' ? 'Client' : 'Personal',
                      },
                      { label: 'Features', value: String(project.features.length) },
                      { label: 'Technologies', value: String(project.technologies.length) },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-lg border border-primary/12 bg-dark-bg/35 px-3 py-3 text-center"
                      >
                        <div className="text-lg font-semibold text-primary tabular-nums">
                          {stat.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-light-text/50 mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-light-text/45 mb-2">
                      Stack preview
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 8).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs text-light-text/80 bg-glow-effect border border-primary/15 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 8 && (
                        <button
                          type="button"
                          onClick={() => setActiveTab('details')}
                          className="px-2.5 py-1 text-xs text-primary border border-primary/25 rounded-md hover:bg-glow-effect"
                        >
                          +{project.technologies.length - 8} more
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-secondary/25 bg-dark-bg/40 p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/15 text-secondary text-xs font-bold">
                        01
                      </span>
                      <h4 className="text-xs font-semibold tracking-wider uppercase text-secondary">
                        The problem
                      </h4>
                    </div>
                    <p className="text-sm md:text-[15px] text-light-text/80 leading-relaxed">
                      {project.caseStudy.problem}
                    </p>
                  </div>

                  <div className="rounded-xl border border-primary/25 bg-dark-bg/40 p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
                        02
                      </span>
                      <h4 className="text-xs font-semibold tracking-wider uppercase text-primary">
                        The solution
                      </h4>
                    </div>
                    <p className="text-sm md:text-[15px] text-light-text/80 leading-relaxed">
                      {project.caseStudy.solution}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'approach' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-primary mb-4">
                      How it was built
                    </h4>
                    <ol className="space-y-0 relative">
                      {project.caseStudy.how.map((item, index) => (
                        <li key={item} className="relative flex gap-3 pb-5 last:pb-0">
                          {index < project.caseStudy.how.length - 1 && (
                            <span className="absolute left-[13px] top-7 bottom-0 w-px bg-primary/20" />
                          )}
                          <span className="relative z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-surface text-[11px] font-bold text-primary">
                            {index + 1}
                          </span>
                          <p className="text-sm text-light-text/80 leading-relaxed pt-1">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-primary mb-3">
                      Why this approach wins
                    </h4>
                    <ul className="space-y-3">
                      {project.caseStudy.whyBetter.map((item) => (
                        <li
                          key={item}
                          className="rounded-lg border border-primary/12 bg-dark-bg/35 px-4 py-3 text-sm text-light-text/80 leading-relaxed"
                        >
                          <span className="text-primary font-medium mr-1.5">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-7">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-primary mb-3">
                      Key features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 rounded-lg border border-primary/12 bg-dark-bg/30 px-3 py-2.5 text-sm text-light-text/80"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-primary mb-3">
                      Full tech stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs md:text-sm text-light-text/85 bg-glow-effect border border-primary/15 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sticky footer actions */}
        {(project.liveUrl || project.githubUrl || project.demoVideo) && (
          <div className="shrink-0 border-t border-primary/15 bg-surface/95 backdrop-blur-sm px-4 py-3 md:px-6 flex flex-wrap gap-2">
            <ProjectLinks project={project} onWatchDemo={onWatchDemo} compact />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
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
              {project.liveLabel || 'Live Demo'}
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
          <ProjectDetailsModal
            project={selectedProject}
            onClose={closeModals}
            onWatchDemo={() => setShowVideo(true)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
