import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ConsoleProps {
  isVisible: boolean;
  onClose: () => void;
}

interface HistoryEntry {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

const PROMPT = 'jay@portfolio:~$';

const SECTION_MAP: Record<string, string> = {
  home: 'hero',
  hero: 'hero',
  about: 'about',
  skills: 'skills',
  education: 'education',
  projects: 'projects',
  research: 'research',
  contact: 'contact',
};

const HELP_TEXT = [
  'Available commands:',
  '',
  '  help                 Show this help message',
  '  whoami               Who am I',
  '  about                About Jay',
  '  skills               Technologies I work with',
  '  education            Academic background',
  '  projects             Freelance & personal projects',
  '  research             Research & publications',
  '  contact              Contact information',
  '  ls                   List portfolio sections',
  '  pwd                  Current location',
  '  goto <section>       Navigate to a section',
  '  open <section>       Alias for goto',
  '  clear / cls          Clear the terminal',
  '  echo <text>          Print text',
  '  date                 Show current date/time',
  '  exit / quit          Close the terminal',
  '',
  'Tip: Use ↑ / ↓ to cycle command history.',
];

const Console: React.FC<ConsoleProps> = ({ isVisible, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'system', content: 'Portfolio OS [Version 1.0.0]' },
    { type: 'system', content: 'Type "help" for available commands.' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draftInput, setDraftInput] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(focusInput, 120);
      return () => clearTimeout(timer);
    }
  }, [isVisible, focusInput]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, input]);

  const appendOutput = (lines: HistoryEntry[]) => {
    setHistory((prev) => [...prev, ...lines]);
  };

  const navigateTo = (sectionKey: string): string[] => {
    const targetId = SECTION_MAP[sectionKey];
    if (!targetId) {
      return [
        `goto: ${sectionKey}: no such section`,
        'Try: home | about | skills | education | projects | research | contact',
      ];
    }

    const element = document.getElementById(targetId);
    if (!element) {
      return [`goto: section "${sectionKey}" not found in DOM`];
    }

    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth' });
    }, 180);

    return [`Navigating to ${sectionKey}...`];
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => {
      if (prev[prev.length - 1] === trimmed) return prev;
      return [...prev, trimmed];
    });
    setHistoryIndex(-1);
    setDraftInput('');

    appendOutput([{ type: 'input', content: trimmed }]);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const argStr = args.join(' ');

    let lines: string[] = [];
    let isError = false;

    switch (cmd) {
      case 'help':
      case '?':
        lines = HELP_TEXT;
        break;

      case 'whoami':
        lines = [
          'Jay Jobanputra',
          'B.Tech AI & Data Science student · developer · entrepreneur',
          'Think it. Build it. Make it real.',
        ];
        break;

      case 'about':
        lines = [
          "Hi, I'm Jay.",
          'Think it. Build it. Make it real.',
          '',
          "I'm a B.Tech AI & Data Science student, developer, and entrepreneur",
          'who builds technology that solves real-world problems.',
          'Through freelancing and my own work, I build web apps,',
          'Android apps, AI systems, and solutions for businesses.',
          '',
          'Every idea starts with a problem. Every solution starts with an idea.',
          '',
          'Type "goto about" to open the About section.',
        ];
        break;

      case 'skills':
        lines = [
          'What I Work With',
          '',
          '  Frontend     React.js · TypeScript · JavaScript · HTML/CSS · Tailwind · Vite',
          '  Backend      Node.js · Express.js · REST APIs · Server-Sent Events',
          '  AI / ML      Python · Scikit-learn · TensorFlow · Keras · XGBoost · Pandas · NumPy · Google ML Kit',
          '  Mobile       Android (Java) · ONNX · Retrofit · OkHttp',
          '  Data/Cloud   Firebase · Firestore · MySQL · MongoDB · SQLite · Railway · Netlify · Vercel',
          '  Tools/Data   Git · GitHub · Cursor · Android Studio · VS Code · Postman · Insomnia · Matplotlib · Seaborn · Plotly · Recharts · Tableau',
          '',
          'Type "goto skills" to explore the full section.',
        ];
        break;

      case 'education':
        lines = [
          'Education',
          '',
          '  [CURRENT] B.Tech — Artificial Intelligence & Data Science',
          '            Sanjivani University, Kopargaon · 2024 – 2028',
          '',
          '  Senior Secondary (XII) — Science',
          '  K. B. Rohmare Jr. College, Kopargaon · MSBSHSE · 2024 · 63%',
          '',
          '  Secondary (X)',
          '  Shri Sharda English Medium School, Kopargaon · MSBSHSE · 2022 · 91.40%',
          '',
          'Type "goto education" to view this section.',
        ];
        break;

      case 'projects':
        lines = [
          'Projects',
          '',
          'Freelance & Client Work:',
          '  01  Kalpanik Task Manager',
          '  02  Kailash Masale',
          '  03  AromaWrap',
          '  04  Election Survey System',
          '',
          'Personal Projects:',
          '  01  Kalpanik Operations AI',
          '  02  Attendify',
          '  03  Smart Trip Planner India',
          '  04  PlantDiseaseAI',
          '',
          'Type "goto projects" to open the Projects section.',
        ];
        break;

      case 'research':
        lines = [
          'Research & Publications',
          '',
          '  Optimized Feature Selection And Machine Learning Techniques',
          '  for Early Detection of Chronic Kidney Disease',
          '',
          '  Authors: Jay Nilesh Jobanputra · K. Vengatesan · V.D. Ambeth Kumar et al.',
          '  Venue:   IEEE GITCON 2025 · Belagavi, India',
          '  Status:  Published in IEEE Xplore · Available on Google Scholar',
          '  DOI:     10.1109/GITCON65266.2025.11377145',
          '',
          '  Dataset: 400 patient records · 26 clinical features · 7+ ML algorithms',
          '  Feature selection: RFE and Mutual Information Gain',
          '',
          'Type "goto research" to open this section.',
        ];
        break;

      case 'contact':
        lines = [
          'Contact',
          '',
          '  Email:     jayjobanputra007@gmail.com',
          '  LinkedIn:  linkedin.com/in/jay-jobanputra-1b442931b',
          '  Phone:     +91 9822961688',
          '  Location:  Kopargaon, Maharashtra, India',
          '',
          'Type "goto contact" to open the contact form.',
        ];
        break;

      case 'ls':
        lines = [
          'home/  about/  skills/  education/  projects/  research/  contact/',
        ];
        break;

      case 'pwd':
        lines = ['/portfolio'];
        break;

      case 'date':
        lines = [new Date().toString()];
        break;

      case 'echo':
        lines = [argStr || ''];
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
      case 'close':
        onClose();
        return;

      case 'goto':
      case 'open':
      case 'cd': {
        if (!args[0]) {
          isError = true;
          lines = [`Usage: ${cmd} <section>`, 'Sections: home about skills education projects research contact'];
        } else {
          const result = navigateTo(args[0].toLowerCase());
          isError = result[0].startsWith('goto:');
          lines = result;
        }
        break;
      }

      default:
        isError = true;
        lines = [
          `Command not found: ${cmd}`,
          'Type "help" for available commands.',
        ];
    }

    appendOutput(
      lines.map((content) => ({
        type: isError ? 'error' : 'output',
        content,
      }))
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(input);
      setInput('');
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      if (historyIndex === -1) {
        setDraftInput(input);
        const nextIndex = commandHistory.length - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;

      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput(draftInput);
      }
      return;
    }

    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      appendOutput([
        { type: 'input', content: input ? `${input}^C` : '^C' },
      ]);
      setInput('');
      setHistoryIndex(-1);
      setDraftInput('');
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full md:w-3/4 lg:w-1/2 bg-surface border border-primary/40 rounded-t-lg shadow-lg overflow-hidden"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      style={{ maxHeight: '55vh' }}
      onClick={focusInput}
    >
      <div className="flex items-center justify-between bg-gray-900 px-3 py-2 rounded-t-lg border-b border-primary/20">
        <div className="text-sm font-mono text-primary">Portfolio Terminal</div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
          aria-label="Close console"
        >
          <span className="text-xs text-white leading-none">&times;</span>
        </button>
      </div>

      <div
        ref={scrollRef}
        className="p-4 font-mono text-sm overflow-y-auto"
        style={{ maxHeight: 'calc(55vh - 2.75rem)' }}
      >
        {history.map((entry, index) => (
          <div
            key={`${index}-${entry.content.slice(0, 12)}`}
            className={`mb-0.5 whitespace-pre-wrap break-words ${
              entry.type === 'input'
                ? 'text-primary'
                : entry.type === 'error'
                ? 'text-red-400'
                : entry.type === 'system'
                ? 'text-light-text/70'
                : 'text-light-text'
            }`}
          >
            {entry.type === 'input' ? (
              <>
                <span className="text-primary/70 select-none">{PROMPT} </span>
                {entry.content}
              </>
            ) : (
              entry.content
            )}
          </div>
        ))}

        <div className="flex items-start gap-2 mt-0.5">
          <span className="text-primary/70 select-none shrink-0">{PROMPT}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow min-w-0 bg-transparent outline-none text-primary caret-primary font-mono text-sm"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Console;
