import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface CircuitPatternProps {
  opacity?: number;
  color?: string;
}

const CircuitPattern: React.FC<CircuitPatternProps> = ({
  opacity,
  color,
}) => {
  const { darkMode } = useTheme();
  const patternColor = color || (darkMode ? '#00FFE7' : '#007870');
  const patternOpacity = opacity ?? (darkMode ? 0.15 : 0.32);

  const { nodes, connections } = useMemo(() => {
    const nodeCount = 10;
    const generatedNodes = [];

    for (let i = 0; i < nodeCount; i++) {
      generatedNodes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        pulseDelay: Math.random() * 5,
      });
    }

    const connectionCount = Math.floor(nodeCount * 1.2);
    const generatedConnections = [];

    for (let i = 0; i < connectionCount; i++) {
      const startNode =
        generatedNodes[Math.floor(Math.random() * generatedNodes.length)];
      const possibleEndNodes = generatedNodes.filter((n) => n.id !== startNode.id);
      const endNode =
        possibleEndNodes[Math.floor(Math.random() * possibleEndNodes.length)];

      generatedConnections.push({
        id: `c-${i}`,
        startX: startNode.x,
        startY: startNode.y,
        endX: endNode.x,
        endY: endNode.y,
        animDelay: Math.random() * 5,
      });
    }

    return { nodes: generatedNodes, connections: generatedConnections };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ opacity: patternOpacity }}
    >
      <svg width="100%" height="100%" style={{ willChange: 'transform' }}>
        {connections.map((conn) => (
          <g key={conn.id}>
            <line
              x1={`${conn.startX}%`}
              y1={`${conn.startY}%`}
              x2={`${conn.endX}%`}
              y2={`${conn.endY}%`}
              stroke={patternColor}
              strokeWidth={darkMode ? 0.5 : 0.8}
              strokeOpacity={darkMode ? 0.35 : 0.55}
            />

            <motion.circle
              cx="0"
              cy="0"
              r="2"
              fill={patternColor}
              animate={{
                cx: [`${conn.startX}%`, `${conn.endX}%`],
                cy: [`${conn.startY}%`, `${conn.endY}%`],
                opacity: [0, darkMode ? 0.8 : 0.95, 0],
              }}
              transition={{
                duration: 4,
                ease: 'linear',
                times: [0, 0.5, 1],
                repeat: Infinity,
                delay: conn.animDelay,
                repeatDelay: Math.random() * 7 + 7,
              }}
              style={{ willChange: 'transform, opacity' }}
            />
          </g>
        ))}

        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="none"
              stroke={patternColor}
              strokeWidth={darkMode ? 0.5 : 0.9}
              strokeOpacity={darkMode ? 0.35 : 0.55}
            />

            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill={patternColor}
              animate={{
                r: [node.size, node.size * 1.5, node.size],
                opacity: darkMode ? [0.1, 0.3, 0.1] : [0.2, 0.45, 0.2],
              }}
              transition={{
                duration: 6,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
                repeat: Infinity,
                delay: node.pulseDelay,
              }}
              style={{ willChange: 'transform, opacity' }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default CircuitPattern;
