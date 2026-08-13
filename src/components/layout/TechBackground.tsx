import React, { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface TechBackgroundProps {
  density?: number;
}

/** Place decorations only near screen edges so center content stays clear. */
const edgePosition = (index: number, total: number) => {
  const band = index % 4;
  const t = (Math.floor(index / 4) + 1) / (Math.ceil(total / 4) + 1);

  switch (band) {
    case 0:
      return { x: 1.5 + (index % 3) * 3.5, y: 10 + t * 72 };
    case 1:
      return { x: 87 + (index % 3) * 3.5, y: 12 + t * 68 };
    case 2:
      return { x: 14 + t * 68, y: 2 + (index % 2) * 5 };
    default:
      return { x: 16 + t * 64, y: 86 + (index % 2) * 5 };
  }
};

const EDGE_LABELS = [
  { text: '01001101', x: 3, y: 30 },
  { text: 'useState()', x: 88, y: 36 },
  { text: 'npm start', x: 3, y: 58 },
  { text: '01100001', x: 89, y: 62 },
  { text: 'git push', x: 4, y: 82 },
  { text: 'React', x: 90, y: 18 },
];

const TechBackground: React.FC<TechBackgroundProps> = ({ density = 16 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const chars = '01';
    const columns = Math.floor(canvas.width / 36);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height;
    }

    const fadeColor = darkMode
      ? 'rgba(15, 15, 15, 0.05)'
      : 'rgba(243, 246, 248, 0.12)';
    const glyphColor = darkMode
      ? 'rgba(0, 255, 231, 0.4)'
      : 'rgba(0, 120, 112, 0.42)';

    const matrixRain = () => {
      ctx.fillStyle = fadeColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = glyphColor;
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 36;
        const y = drops[i];
        const xRatio = x / canvas.width;

        // Keep matrix rain on side columns only
        if (xRatio > 0.18 && xRatio < 0.82) {
          drops[i] += Math.random() * 1.3 + 0.5;
          if (drops[i] > canvas.height || Math.random() > 0.99) {
            drops[i] = Math.random() * -100;
          }
          continue;
        }

        if (y > 0 && Math.random() > 0.85) {
          ctx.fillText(char, x, y);
        }

        drops[i] += Math.random() * 1.3 + 0.5;

        if (drops[i] > canvas.height || Math.random() > 0.99) {
          drops[i] = Math.random() * -100;
        }
      }
    };

    const interval = setInterval(matrixRain, 55);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [darkMode]);

  const count = Math.min(density, 16);

  const elements = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const pos = edgePosition(i, count);
      return {
        id: i,
        x: pos.x,
        y: pos.y,
        size: 0.7 + (i % 3) * 0.2,
        opacity: darkMode ? 0.28 + (i % 3) * 0.08 : 0.32 + (i % 3) * 0.08,
        animationDuration: 36 + (i % 5) * 7,
        delay: -i * 1.5,
        shape: i % 3,
      };
    });
  }, [count, darkMode]);

  const strokeColor = darkMode ? '#00FFE7' : '#007870';
  const labelOpacity = darkMode ? 0.35 : 0.4;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full ${
          darkMode ? 'opacity-35' : 'opacity-45'
        }`}
      />

      {EDGE_LABELS.map((label, i) => (
        <motion.span
          key={label.text}
          className="absolute font-mono text-[11px] md:text-xs text-primary whitespace-nowrap"
          style={{
            left: `${label.x}%`,
            top: `${label.y}%`,
            opacity: labelOpacity,
          }}
          animate={{
            y: [0, 6, 0],
            opacity: [labelOpacity, labelOpacity * 1.35, labelOpacity],
          }}
          transition={{
            duration: 10 + i * 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          {label.text}
        </motion.span>
      ))}

      {elements.map((element) => (
        <motion.div
          key={`shape-${element.id}`}
          className="absolute will-change-transform"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            opacity: element.opacity,
          }}
          animate={{
            y: [0, 10, 0],
            opacity: [element.opacity, element.opacity * 1.3, element.opacity],
          }}
          transition={{
            duration: element.animationDuration,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: element.delay,
          }}
        >
          {element.shape === 0 && (
            <div
              className="rounded-full border-2 border-primary/60 dark:border-primary/50"
              style={{
                width: `${element.size * 1.6}rem`,
                height: `${element.size * 1.6}rem`,
              }}
            />
          )}
          {element.shape === 1 && (
            <div
              className="border-2 border-primary/60 dark:border-primary/50"
              style={{
                width: `${element.size * 1.4}rem`,
                height: `${element.size * 1.4}rem`,
              }}
            />
          )}
          {element.shape === 2 && (
            <div className="w-2 h-2 rounded-full bg-primary/70 dark:bg-primary/55" />
          )}
        </motion.div>
      ))}

      <div
        className={`absolute inset-0 bg-grid-pattern ${
          darkMode ? 'opacity-20' : 'opacity-30'
        }`}
      />

      <svg
        className={`absolute inset-0 w-full h-full ${
          darkMode ? 'opacity-25' : 'opacity-30'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <g stroke={strokeColor} strokeWidth="1" fill="none">
          <path d="M0,18 v14 h32 v-8" />
          <path d="M100,22 h-28 v18 h10" />
          <path d="M0,78 v-12 h26" />
          <path d="M100,82 h-34 v-16" />
          <path d="M0,48 h18 v10" />
          <path d="M100,55 h-16 v-12" />
        </g>
        <g fill={strokeColor}>
          <circle cx="8%" cy="22%" r="2.2" fillOpacity={darkMode ? 0.45 : 0.5} />
          <circle cx="92%" cy="28%" r="2.2" fillOpacity={darkMode ? 0.45 : 0.5} />
          <circle cx="10%" cy="76%" r="2.2" fillOpacity={darkMode ? 0.45 : 0.5} />
          <circle cx="90%" cy="80%" r="2.2" fillOpacity={darkMode ? 0.45 : 0.5} />
          <circle cx="6%" cy="50%" r="1.8" fillOpacity={darkMode ? 0.4 : 0.45} />
          <circle cx="94%" cy="52%" r="1.8" fillOpacity={darkMode ? 0.4 : 0.45} />
        </g>
      </svg>
    </div>
  );
};

export default TechBackground;
