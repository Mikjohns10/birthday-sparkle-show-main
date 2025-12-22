import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FireworksShow from "../components/celebration/FireworksShow";
import Confetti from "../components/celebration/Confetti";
import Balloon from "../components/celebration/Balloon";
import Sparkle from "../components/celebration/Sparkle";
import { RotateCcw, Heart } from "lucide-react";

interface FinalPageProps {
  onReplay: () => void;
  recipientName: string;
  onFirework?: () => void;
}

const FinalPage = ({ onReplay, recipientName, onFirework }: FinalPageProps) => {
  const [showFireworks, setShowFireworks] = useState(true);

  useEffect(() => {
    // Play firework sound on mount
    onFirework?.();
    
    // Reduce fireworks after initial burst
    const timer = setTimeout(() => {
      setShowFireworks(true);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const balloonColors: Array<"pink" | "gold" | "purple" | "teal"> = [
    "gold", "pink", "purple", "teal", "gold", "pink"
  ];

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4"
      style={{
        background: "linear-gradient(180deg, hsl(240 40% 5%) 0%, hsl(250 35% 12%) 40%, hsl(270 30% 18%) 100%)",
      }}
    >
      {/* Fireworks show */}
      <FireworksShow isActive={showFireworks} intensity="high" />

      {/* Confetti rain */}
      <Confetti count={80} isActive={true} />

      {/* Balloons */}
      {balloonColors.map((color, index) => (
        <Balloon
          key={index}
          color={color}
          left={`${8 + index * 15}%`}
          delay={index * 0.8}
          size={index % 2 === 0 ? "md" : "lg"}
        />
      ))}

      {/* Sparkles */}
      <Sparkle size={28} color="hsl(43 100% 60%)" delay={0} className="top-[15%] left-[20%]" />
      <Sparkle size={22} color="hsl(340 80% 70%)" delay={0.4} className="top-[25%] right-[15%]" />
      <Sparkle size={24} color="hsl(280 70% 65%)" delay={0.8} className="top-[20%] left-[70%]" />
      <Sparkle size={20} color="hsl(180 70% 50%)" delay={1.2} className="bottom-[30%] left-[15%]" />
      <Sparkle size={26} color="hsl(43 100% 60%)" delay={1.6} className="bottom-[35%] right-[20%]" />

      {/* Main message */}
      <motion.div
        className="relative z-20 text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
      >
        {/* Glowing backdrop */}
        <div className="absolute inset-0 -m-20 rounded-full bg-primary/10 blur-3xl" />
        
        <motion.h1
          className="relative font-celebration text-5xl sm:text-7xl md:text-8xl text-primary mb-6"
          animate={{
            textShadow: [
              "0 0 40px hsl(43 100% 60% / 0.8), 0 0 80px hsl(43 100% 60% / 0.5), 0 0 120px hsl(43 100% 60% / 0.3)",
              "0 0 60px hsl(43 100% 60% / 1), 0 0 120px hsl(43 100% 60% / 0.7), 0 0 180px hsl(43 100% 60% / 0.5)",
              "0 0 40px hsl(43 100% 60% / 0.8), 0 0 80px hsl(43 100% 60% / 0.5), 0 0 120px hsl(43 100% 60% / 0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Happy Birthday
        </motion.h1>

        <motion.p
          className="relative font-celebration text-3xl sm:text-4xl text-celebration-pink text-glow-pink mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {recipientName}! ❤️
        </motion.p>

        <motion.p
          className="relative font-elegant text-xl sm:text-2xl text-foreground/90 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          You are truly special.
          <br />
          <span className="text-primary">May all your dreams come true!</span>
        </motion.p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="relative z-20 flex flex-col sm:flex-row gap-4 mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <motion.button
          onClick={onReplay}
          className="px-8 py-4 bg-gradient-to-r from-celebration-purple to-celebration-pink rounded-full font-celebration text-lg text-foreground shadow-lg flex items-center justify-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5" />
          Replay Celebration
        </motion.button>

        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-celebration-gold to-celebration-warm-yellow rounded-full font-celebration text-lg text-primary-foreground shadow-lg flex items-center justify-center gap-3 glow-gold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="w-5 h-5" />
          Send Love
        </motion.button>
      </motion.div>

      {/* Footer message */}
      <motion.p
        className="absolute bottom-8 text-muted-foreground text-sm font-elegant text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.5 }}
      >
        Made with love for someone truly amazing ✨
      </motion.p>

      {/* Multiple ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-celebration-pink/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-celebration-purple/10 blur-3xl pointer-events-none" />
    </div>
  );
};

export default FinalPage;
