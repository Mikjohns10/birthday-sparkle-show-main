import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
  shape: "square" | "circle" | "ribbon";
}

interface ConfettiProps {
  count?: number;
  isActive?: boolean;
}

const colors = [
  "hsl(43 100% 60%)",   // gold
  "hsl(340 80% 70%)",   // pink
  "hsl(280 70% 65%)",   // purple
  "hsl(180 70% 50%)",   // teal
  "hsl(45 100% 96%)",   // cream
  "hsl(340 60% 80%)",   // soft pink
];

const Confetti = ({ count = 50, isActive = true }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const newPieces: ConfettiPiece[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      rotation: Math.random() * 360,
      size: 6 + Math.random() * 8,
      shape: ["square", "circle", "ribbon"][Math.floor(Math.random() * 3)] as ConfettiPiece["shape"],
    }));
    setPieces(newPieces);
  }, [count, isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: -20,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: "100vh",
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {piece.shape === "square" && (
            <div
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg)`,
              }}
            />
          )}
          {piece.shape === "circle" && (
            <div
              className="rounded-full"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
              }}
            />
          )}
          {piece.shape === "ribbon" && (
            <div
              style={{
                width: piece.size * 0.4,
                height: piece.size * 2,
                backgroundColor: piece.color,
                borderRadius: 2,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Confetti;
