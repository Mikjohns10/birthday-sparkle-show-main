import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  angle: number;
  color: string;
}

interface FireworkProps {
  x: number;
  y: number;
  color?: string;
  onComplete?: () => void;
}

const colors = [
  "hsl(43 100% 60%)",
  "hsl(340 80% 70%)",
  "hsl(280 70% 65%)",
  "hsl(180 70% 50%)",
  "hsl(45 100% 80%)",
];

const Firework = ({ x, y, color, onComplete }: FireworkProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const baseColor = color || colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 30) + (Math.random() * 10 - 5),
      color: baseColor,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [baseColor, onComplete]);

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
    >
      {/* Central burst */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: baseColor }}
        initial={{ width: 4, height: 4, opacity: 1 }}
        animate={{ width: 40, height: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: particle.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((particle.angle * Math.PI) / 180) * 120,
            y: Math.sin((particle.angle * Math.PI) / 180) * 120,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Trailing sparks */}
      {particles.map((particle) => (
        <motion.div
          key={`trail-${particle.id}`}
          className="absolute w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: particle.color, opacity: 0.6 }}
          initial={{ x: 0, y: 0, opacity: 0.6 }}
          animate={{
            x: Math.cos((particle.angle * Math.PI) / 180) * 80,
            y: Math.sin((particle.angle * Math.PI) / 180) * 80,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default Firework;
