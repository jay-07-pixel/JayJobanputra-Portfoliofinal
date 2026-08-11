import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface TechBackgroundProps {
  density?: number;
}

const generateBinaryString = (length: number) => {
  return Array.from({ length }, () => Math.round(Math.random())).join('');
};

const codeSnippets = [
  'const x = () => { };',
  'import React from "react";',
  'function app() { }',
  '<div className="container">',
  'export default App;',
  'npm install react',
  'git commit -m "fix: update"',
  '@tailwind base;',
  '.map(item => item.id)',
  'useState<boolean>(false)',
  'npm run build',
  'git push origin main',
  'docker-compose up -d',
  '<Component {...props} />',
  'const [data, setData] = useState([])',
  'useEffect(() => { }, [])',
  '404 Not Found',
  '<Route path="/" element={<Home />} />',
];

const TechBackground: React.FC<TechBackgroundProps> = ({ density = 30 }) => {
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
    const columns = Math.floor(canvas.width / 30);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height;
    }

    // Theme-aware trail + glyph colors
    const fadeColor = darkMode
      ? 'rgba(15, 15, 15, 0.05)'
      : 'rgba(243, 246, 248, 0.12)';
    const glyphColor = darkMode
      ? 'rgba(0, 255, 231, 0.35)'
      : 'rgba(0, 120, 112, 0.45)';

    const matrixRain = () => {
      ctx.fillStyle = fadeColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = glyphColor;
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 30;
        const y = drops[i];

        if (y > 0 && Math.random() > (darkMode ? 0.95 : 0.9)) {
          ctx.fillText(char, x, y);
        }

        drops[i] += Math.random() * 1.2 + 0.5;

        if (drops[i] > canvas.height || Math.random() > 0.99) {
          drops[i] = Math.random() * -100;
        }
      }
    };

    const interval = setInterval(matrixRain, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [darkMode]);

  const actualDensity = Math.min(density, 20);
  const elements = Array.from({ length: actualDensity }, (_, i) => {
    const isCode = Math.random() > 0.7;
    const isBinary = Math.random() > 0.5;
    const isShape = !isCode && !isBinary;
    const baseOpacity = darkMode
      ? Math.random() * 0.25 + 0.08
      : Math.random() * 0.35 + 0.22;

    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: baseOpacity,
      rotateZ: Math.random() * 360,
      animationDuration: Math.random() * 60 + 30,
      delay: Math.random() * -30,
      isCode,
      isBinary,
      isShape,
      content: isCode
        ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        : isBinary
        ? generateBinaryString(Math.floor(Math.random() * 10) + 5)
        : '',
      shape: isShape ? Math.floor(Math.random() * 3) : -1,
    };
  });

  const strokeColor = darkMode ? '#00FFE7' : '#007870';

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={{ position: 'fixed', willChange: 'transform' }}
    >
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full ${
          darkMode ? 'opacity-15' : 'opacity-40'
        }`}
        style={{ willChange: 'transform' }}
      />

      {elements.map((element) => (
        <motion.div
          key={`${darkMode ? 'd' : 'l'}-${element.id}`}
          className="absolute font-mono text-primary whitespace-nowrap will-change-transform"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}rem`,
            opacity: element.opacity,
            transform: `rotateZ(${element.rotateZ}deg)`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: ['0%', '10%', '0%'],
            x: [
              `${element.x}%`,
              `${element.x + (Math.random() * 5 - 2.5)}%`,
              `${element.x}%`,
            ],
            opacity: [element.opacity, element.opacity * 1.35, element.opacity],
          }}
          transition={{
            duration: element.animationDuration,
            ease: 'linear',
            repeat: Infinity,
            delay: element.delay,
          }}
        >
          {element.isCode && (
            <span className="text-primary/70 dark:text-primary/40">
              {element.content}
            </span>
          )}

          {element.isBinary && (
            <span className="text-primary/60 dark:text-primary/30">
              {element.content}
            </span>
          )}

          {element.isShape && (
            <>
              {element.shape === 0 && (
                <div
                  className={`w-${Math.floor(element.size * 4)}
                   h-${Math.floor(element.size * 4)} rounded-full border border-primary/50 dark:border-primary/25`}
                />
              )}
              {element.shape === 1 && (
                <div
                  className={`w-${Math.floor(element.size * 4)} 
                  h-${Math.floor(element.size * 4)} border border-primary/50 dark:border-primary/25`}
                />
              )}
              {element.shape === 2 && (
                <div
                  className="border-solid border-t-primary/50 dark:border-t-primary/25 border-t-4 
                  border-x-transparent border-x-4 border-b-0 w-0 h-0"
                  style={{
                    borderWidth: `${Math.floor(element.size * 8)}px ${Math.floor(
                      element.size * 4
                    )}px 0 ${Math.floor(element.size * 4)}px`,
                  }}
                />
              )}
            </>
          )}
        </motion.div>
      ))}

      <div
        className={`absolute inset-0 bg-grid-pattern ${
          darkMode ? 'opacity-10' : 'opacity-35'
        }`}
      />

      <svg
        className={`absolute inset-0 w-full h-full ${
          darkMode ? 'opacity-10' : 'opacity-30'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ position: 'absolute' }}
      >
        <g stroke={strokeColor} strokeWidth="0.7">
          {Array.from({ length: 5 }, (_, i) => {
            const y = (i + 1) * 20;
            const randomHeight = Math.floor(Math.random() * 20 + 5);
            const randomWidth = Math.floor(Math.random() * 100 + 50);
            const randomOffset = Math.floor(Math.random() * 30 - 15);
            return (
              <path
                key={`h-${i}`}
                d={`M0,${y} v${randomHeight} h${randomWidth} v${randomOffset}`}
                fill="none"
              />
            );
          })}

          {Array.from({ length: 5 }, (_, i) => {
            const x = (i + 1) * 20;
            const randomWidth = Math.floor(Math.random() * 30 - 15);
            const randomHeight = Math.floor(Math.random() * 100 + 50);
            const randomOffset = Math.floor(Math.random() * 30 - 15);
            return (
              <path
                key={`v-${i}`}
                d={`M${x},0 h${randomWidth} v${randomHeight} h${randomOffset}`}
                fill="none"
              />
            );
          })}
        </g>

        <g>
          {Array.from({ length: 8 }, (_, i) => {
            const x = Math.floor(Math.random() * 100);
            const y = Math.floor(Math.random() * 100);
            const size = Math.floor(Math.random() * 2 + 1);

            return (
              <circle
                key={`node-${i}`}
                cx={`${x}%`}
                cy={`${y}%`}
                r={size}
                fill={strokeColor}
                fillOpacity={darkMode ? 0.25 : 0.45}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default TechBackground;
