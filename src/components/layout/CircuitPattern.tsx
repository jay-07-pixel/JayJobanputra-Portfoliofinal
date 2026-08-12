import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface CircuitPatternProps {
  opacity?: number;
  color?: string;
}

/** Fixed edge-only node layout — no random center collisions. */
const EDGE_NODES = [
  { id: 0, x: 6, y: 18, size: 2.2, pulseDelay: 0.4 },
  { id: 1, x: 12, y: 42, size: 1.8, pulseDelay: 1.2 },
  { id: 2, x: 8, y: 72, size: 2.4, pulseDelay: 2.1 },
  { id: 3, x: 94, y: 22, size: 2.0, pulseDelay: 0.8 },
  { id: 4, x: 90, y: 48, size: 2.3, pulseDelay: 1.6 },
  { id: 5, x: 93, y: 78, size: 1.9, pulseDelay: 2.8 },
  { id: 6, x: 28, y: 8, size: 1.7, pulseDelay: 1.0 },
  { id: 7, x: 72, y: 10, size: 2.1, pulseDelay: 2.4 },
];

const EDGE_CONNECTIONS = [
  { id: 'c0', start: 0, end: 1, animDelay: 0.5 },
  { id: 'c1', start: 1, end: 2, animDelay: 1.8 },
  { id: 'c2', start: 3, end: 4, animDelay: 1.1 },
  { id: 'c3', start: 4, end: 5, animDelay: 2.6 },
  { id: 'c4', start: 0, end: 6, animDelay: 3.2 },
  { id: 'c5', start: 3, end: 7, animDelay: 0.9 },
];

const CircuitPattern: React.FC<CircuitPatternProps> = ({
  opacity,
  color,
}) => {
  const { darkMode } = useTheme();
  const patternColor = color || (darkMode ? '#00FFE7' : '#007870');
  const patternOpacity = opacity ?? (darkMode ? 0.12 : 0.2);

  const connections = useMemo(
    () =>
      EDGE_CONNECTIONS.map((conn) => {
        const startNode = EDGE_NODES.find((n) => n.id === conn.start)!;
        const endNode = EDGE_NODES.find((n) => n.id === conn.end)!;
        return {
          id: conn.id,
          startX: startNode.x,
          startY: startNode.y,
          endX: endNode.x,
          endY: endNode.y,
          animDelay: conn.animDelay,
        };
      }),
    []
  );

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={{ opacity: patternOpacity }}
    >
      <svg width="100%" height="100%">
        {connections.map((conn) => (
          <g key={conn.id}>
            <line
              x1={`${conn.startX}%`}
              y1={`${conn.startY}%`}
              x2={`${conn.endX}%`}
              y2={`${conn.endY}%`}
              stroke={patternColor}
              strokeWidth={darkMode ? 0.5 : 0.7}
              strokeOpacity={darkMode ? 0.35 : 0.45}
            />
            <motion.circle
              cx="0"
              cy="0"
              r="1.6"
              fill={patternColor}
              animate={{
                cx: [`${conn.startX}%`, `${conn.endX}%`],
                cy: [`${conn.startY}%`, `${conn.endY}%`],
                opacity: [0, darkMode ? 0.7 : 0.85, 0],
              }}
              transition={{
                duration: 5,
                ease: 'linear',
                times: [0, 0.5, 1],
                repeat: Infinity,
                delay: conn.animDelay,
                repeatDelay: 6,
              }}
            />
          </g>
        ))}

        {EDGE_NODES.map((node) => (
          <g key={node.id}>
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="none"
              stroke={patternColor}
              strokeWidth={darkMode ? 0.5 : 0.8}
              strokeOpacity={darkMode ? 0.35 : 0.45}
            />
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill={patternColor}
              animate={{
                r: [node.size, node.size * 1.35, node.size],
                opacity: darkMode ? [0.08, 0.22, 0.08] : [0.12, 0.28, 0.12],
              }}
              transition={{
                duration: 5,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: node.pulseDelay,
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default CircuitPattern;
