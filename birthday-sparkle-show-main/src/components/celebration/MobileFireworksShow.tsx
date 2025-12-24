import { useEffect, useState } from "react";
import Firework from "./Firework";

interface MobileFireworksShowProps {
  isActive: boolean;
}

const MobileFireworksShow = ({ isActive }: MobileFireworksShowProps) => {
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const newFirework = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // Keep away from edges
        y: Math.random() * 60 + 20,
        color: [
          "hsl(43, 100%, 60%)", // gold
          "hsl(340, 80%, 70%)", // pink
          "hsl(280, 70%, 65%)", // purple
        ][Math.floor(Math.random() * 3)],
      };

      // Keep only 3 fireworks at a time for mobile
      setFireworks(prev => [...prev.slice(-2), newFirework]);
    }, 2000); // Less frequent (every 2 seconds)

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {fireworks.map((fw) => (
        <Firework
          key={fw.id}
          x={fw.x}
          y={fw.y}
          color={fw.color}
          particleCount={30} // Very low for mobile
          size={1.2}
        />
      ))}
    </div>
  );
};

export default MobileFireworksShow;