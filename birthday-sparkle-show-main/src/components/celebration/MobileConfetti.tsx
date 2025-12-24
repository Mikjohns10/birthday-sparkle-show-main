import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MobileConfettiProps {
  isActive: boolean;
}

const MobileConfetti = ({ isActive }: MobileConfettiProps) => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    rotation: number;
    scale: number;
  }>>([]);

  useEffect(() => {
    if (!isActive) return;

    // Only 30 pieces for mobile (instead of 80)
    const pieces = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 20,
      color: [
        "hsl(43, 100%, 60%)", // gold
        "hsl(340, 80%, 70%)", // pink
        "hsl(280, 70%, 65%)", // purple
        "hsl(180, 70%, 50%)", // teal
      ][Math.floor(Math.random() * 4)],
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
    }));

    setConfettiPieces(pieces);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2" // Smaller on mobile
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            borderRadius: "1px",
          }}
          initial={{
            y: piece.y,
            rotate: piece.rotation,
            scale: piece.scale,
            opacity: 0,
          }}
          animate={{
            y: "120vh",
            rotate: piece.rotation + 360, // Less rotation
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2, // Faster on mobile
            delay: Math.random() * 0.3,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
};

export default MobileConfetti;