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
  particleCount?: number; // Added
  size?: number; // Added
  onComplete?: () => void;
}

const colors = [
  "hsl(43 100% 60%)",
  "hsl(340 80% 70%)",
  "hsl(280 70% 65%)",
  "hsl(180 70% 50%)",
  "hsl(45 100% 80%)",
];

const Firework = ({ 
  x, 
  y, 
  color, 
  particleCount = 12, // Default 12 particles
  size = 2, // Default size multiplier
  onComplete 
}: FireworkProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const baseColor = color || colors[Math.floor(Math.random() * colors.length)];

  // Calculate particle angles based on count
  useEffect(() => {
    const angleStep = 360 / particleCount;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      angle: (i * angleStep) + (Math.random() * 10 - 5), // Add slight randomness
      color: baseColor,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [baseColor, particleCount, onComplete]);

  // Calculate distances based on particle count
  const getParticleDistance = () => {
    if (particleCount <= 12) return 120;
    if (particleCount <= 24) return 100;
    return 80; // For high particle counts, reduce distance
  };

  const particleDistance = getParticleDistance();
  const trailDistance = particleDistance * 0.66; // 66% of main particle distance

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
    >
      {/* Central burst - size scales with size prop */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ 
          backgroundColor: baseColor,
          filter: `blur(${size * 2}px)`,
        }}
        initial={{ 
          width: size * 2, 
          height: size * 2, 
          opacity: 1 
        }}
        animate={{ 
          width: size * 20, 
          height: size * 20, 
          opacity: 0 
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Main Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ 
            backgroundColor: particle.color,
            width: `${size}px`,
            height: `${size}px`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((particle.angle * Math.PI) / 180) * particleDistance,
            y: Math.sin((particle.angle * Math.PI) / 180) * particleDistance,
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Trailing sparks - only show for lower particle counts for performance */}
      {particleCount <= 24 && particles.map((particle) => (
        <motion.div
          key={`trail-${particle.id}`}
          className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ 
            backgroundColor: particle.color, 
            opacity: 0.6,
            width: `${Math.max(1, size * 0.5)}px`,
            height: `${Math.max(1, size * 0.5)}px`,
          }}
          initial={{ x: 0, y: 0, opacity: 0.6 }}
          animate={{
            x: Math.cos((particle.angle * Math.PI) / 180) * trailDistance,
            y: Math.sin((particle.angle * Math.PI) / 180) * trailDistance,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Additional glow effect for larger fireworks */}
      {size >= 1.5 && (
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            backgroundColor: baseColor,
            filter: `blur(${size * 4}px)`,
          }}
          initial={{ 
            width: size * 10, 
            height: size * 10, 
            opacity: 0.3 
          }}
          animate={{ 
            width: size * 40, 
            height: size * 40, 
            opacity: 0 
          }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        />
      )}
    </div>
  );
};

export default Firework;