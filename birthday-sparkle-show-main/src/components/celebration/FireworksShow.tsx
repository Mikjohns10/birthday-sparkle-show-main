import { useEffect, useState, useCallback } from "react";
import Firework from "./Firework";

interface FireworkData {
  id: number;
  x: number;
  y: number;
  color?: string;
}

interface FireworksShowProps {
  isActive: boolean;
  intensity?: "low" | "medium" | "high";
}

const colors = [
  "hsl(43 100% 60%)",
  "hsl(340 80% 70%)",
  "hsl(280 70% 65%)",
  "hsl(180 70% 50%)",
  "hsl(45 100% 80%)",
];

const FireworksShow = ({ isActive, intensity = "medium" }: FireworksShowProps) => {
  const [fireworks, setFireworks] = useState<FireworkData[]>([]);

  const intervalMap = {
    low: 1500,
    medium: 800,
    high: 400,
  };

  const removeFirework = useCallback((id: number) => {
    setFireworks((prev) => prev.filter((fw) => fw.id !== id));
  }, []);

  useEffect(() => {
    if (!isActive) {
      setFireworks([]);
      return;
    }

    const interval = setInterval(() => {
      const newFirework: FireworkData = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
        y: Math.random() * window.innerHeight * 0.5 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setFireworks((prev) => [...prev, newFirework]);
    }, intervalMap[intensity]);

    return () => clearInterval(interval);
  }, [isActive, intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {fireworks.map((fw) => (
        <Firework
          key={fw.id}
          x={fw.x}
          y={fw.y}
          color={fw.color}
          onComplete={() => removeFirework(fw.id)}
        />
      ))}
    </div>
  );
};

export default FireworksShow;
