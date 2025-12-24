import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SparkleProps {
  size?: number;
  color?: string;
  delay?: number;
  className?: string;
  pulse?: boolean;
  pulseSpeed?: number;
  intensity?: number;
}

const Sparkle = ({ 
  size = 20, 
  color = "hsl(43 100% 60%)", 
  delay = 0,
  className = "",
  pulse = false,
  pulseSpeed = 1,
  intensity = 1
}: SparkleProps) => {
  const [isPulsing, setIsPulsing] = useState(pulse);
  const [pulseScale, setPulseScale] = useState(1);
  const [glowIntensity, setGlowIntensity] = useState(1);

  // Handle pulse effect
  useEffect(() => {
    if (!pulse) {
      setIsPulsing(false);
      return;
    }

    setIsPulsing(true);
    
    // Create pulse animation based on pulseSpeed
    const interval = setInterval(() => {
      setPulseScale(prev => {
        if (prev === 1) return 1.2;
        if (prev === 1.2) return 0.9;
        return 1;
      });
      
      setGlowIntensity(prev => {
        if (prev === 1) return 1.5 * intensity;
        if (prev > 1) return 0.8 * intensity;
        return 1 * intensity;
      });
    }, pulseSpeed * 1000 / 3);

    return () => clearInterval(interval);
  }, [pulse, pulseSpeed, intensity]);

  // Calculate glow filter based on intensity
  const getGlowFilter = () => {
    const baseGlow = size / 4;
    return `drop-shadow(0 0 ${baseGlow * glowIntensity}px ${color}) 
            drop-shadow(0 0 ${baseGlow * glowIntensity * 1.5}px rgba(255,255,255,0.5))`;
  };

  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{ 
        scale: isPulsing 
          ? [1 * pulseScale, 1.2 * pulseScale, 1 * pulseScale]
          : [0, 1, 0.8, 1, 0],
        rotate: isPulsing ? [0, 90, 180, 270, 360] : [0, 180],
        opacity: isPulsing 
          ? [0.5, 1, 0.7, 1, 0.5] 
          : [0, 1, 1, 1, 0],
        filter: isPulsing 
          ? [
              getGlowFilter(),
              `drop-shadow(0 0 ${size/2}px ${color}) drop-shadow(0 0 ${size}px rgba(255,255,255,0.7))`,
              getGlowFilter()
            ]
          : getGlowFilter()
      }}
      transition={{
        duration: isPulsing ? pulseSpeed : 2,
        delay,
        repeat: isPulsing ? Infinity : Infinity,
        ease: "easeInOut",
        times: isPulsing ? [0, 0.25, 0.5, 0.75, 1] : undefined
      }}
      style={{
        width: size,
        height: size,
        filter: getGlowFilter(),
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
          fill={color}
          fillOpacity={isPulsing ? 0.9 : 1}
        />
        {isPulsing && (
          <>
            <path
              d="M12 2L13.8 9.2L21 12L13.8 14.8L12 22L10.2 14.8L2 12L10.2 9.2L12 2Z"
              fill="rgba(255,255,255,0.3)"
              fillOpacity={0.5}
            />
            <circle
              cx="12"
              cy="12"
              r="3"
              fill="rgba(255,255,255,0.6)"
              fillOpacity={0.7}
            />
          </>
        )}
      </svg>
      
      {/* Additional glow effect for pulsing */}
      {isPulsing && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            filter: `blur(${size/8}px)`,
          }}
          animate={{
            scale: [0.8, 1.5, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: pulseSpeed,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default Sparkle;