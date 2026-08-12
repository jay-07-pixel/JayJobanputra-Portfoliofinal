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
    case 0: // left edge
      return { x: 2 + (index % 3) * 3, y: 8 + t * 75 };
    case 1: // right edge
      return { x: 88 + (index % 3) * 3, y: 10 + t * 70 };
    case 2: // top edge
      return { x: 12 + t * 70, y: 3 + (index % 2) * 4 };
    default: // bottom edge
      return { x: 15 + t * 65, y: 88 + (index % 2) * 4 };
  }
};

const TechBackground: React.FC<TechBackgroundProps> = ({ density = 12 }) => {
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
    const columns = Math.floor(canvas.width / 40);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height;
    }

    const fadeColor = darkMode
      ? 'rgba(15, 15, 15, 0.06)'
      : 'rgba(243, 246, 248, 0.14)';
    const glyphColor = darkMode
      ? 'rgba(0, 255, 231, 0.22)'
      : 'rgba(0, 120, 112, 0.28)';

    const matrixRain = () => {
      ctx.fillStyle = fadeColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = glyphColor;
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 40;
        const y = drops[i];

        // Skip drawing in the center content band
        const xRatio = x / canvas.width;
        if (xRatio > 0.22 && xRatio < 0.78) {
          drops[i] += Math.random() * 1.2 + 0.5;
          if (drops[i] > canvas.height || Math.random() > 0.99) {
            drops[i] = Math.random() * -100;
          }
          continue;
        }

        if (y > 0 && Math.random() > 0.92) {
          ctx.fillText(char, x, y);
        }

        drops[i] += Math.random() * 1.2 + 0.5;

        if (drops[i] > canvas.height || Math.random() > 0.99) {
          drops[i] = Math.random() * -100;
        }
      }
    };

    const interval = setInterval(matrixRain, 60);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [darkMode]);

  const count = Math.min(density, 12);

  const elements = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const pos = edgePosition(i, count);
      return {
        id: i,
        x: pos.x,
        y: pos.y,
        size: 0.55 + (i % 3) * 0.15,
        opacity: darkMode ? 0.12 + (i % 3) * 0.04 : 0.18 + (i % 3) * 0.05,
        animationDuration: 40 + (i % 5) * 8,
        delay: -i * 2,
        shape: i % 3,
      };
    });
  }, [count, darkMode]);

  const strokeColor = darkMode ? '#00FFE7' : '#007870';

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full ${
          darkMode ? 'opacity-20' : 'opacity-30'
        }`}
      />

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
            y: [0, 8, 0],
            opacity: [element.opacity, element.opacity * 1.25, element.opacity],
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
              className="rounded-full border border-primary/40 dark:border-primary/25"
              style={{
                width: `${element.size * 1.4}rem`,
                height: `${element.size * 1.4}rem`,
              }}
            />
          )}
          {element.shape === 1 && (
            <div
              className="border border-primary/40 dark:border-primary/25"
              style={{
                width: `${element.size * 1.2}rem`,
                height: `${element.size * 1.2}rem`,
              }}
            />
          )}
          {element.shape === 2 && (
            <div
              className="w-1.5 h-1.5 rounded-full bg-primary/50 dark:bg-primary/30"
            />
          )}
        </motion.div>
      ))}

      <div
        className={`absolute inset-0 bg-grid-pattern ${
          darkMode ? 'opacity-10' : 'opacity-20'
        }`}
      />

      <svg
        className={`absolute inset-0 w-full h-full ${
          darkMode ? 'opacity-10' : 'opacity-20'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <g stroke={strokeColor} strokeWidth="0.6" fill="none">
          <path d="M0,18 v12 h28 v-6" />
          <path d="M100,22 h-24 v16 h8" />
          <path d="M0,78 v-10 h22" />
          <path d="M100,82 h-30 v-14" />
        </g>
        <g fill={strokeColor}>
          <circle cx="8%" cy="22%" r="1.5" fillOpacity={darkMode ? 0.25 : 0.35} />
          <circle cx="92%" cy="28%" r="1.5" fillOpacity={darkMode ? 0.25 : 0.35} />
          <circle cx="10%" cy="76%" r="1.5" fillOpacity={darkMode ? 0.25 : 0.35} />
          <circle cx="90%" cy="80%" r="1.5" fillOpacity={darkMode ? 0.25 : 0.35} />
        </g>
      </svg>
    </div>
  );
};

export default TechBackground;
