import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BirthdayCake from "../components/celebration/BirthdayCake";
import Confetti from "../components/celebration/Confetti";
import Balloon from "../components/celebration/Balloon";
import Sparkle from "../components/celebration/Sparkle";
import { Cake } from "lucide-react";

interface CakePageProps {
  onComplete: () => void;
  onCakeCut?: () => void;
}

const CakePage = ({ onComplete, onCakeCut }: CakePageProps) => {
  const [isCut, setIsCut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleCut = () => {
    if (isCut) return;
    setWishMade(true);
    
    setTimeout(() => {
      setIsCut(true);
      setShowConfetti(true);
      onCakeCut?.();
      
      // Move to next page after celebration
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 1500);
  };

  const balloonColors: Array<"pink" | "gold" | "purple" | "teal"> = ["pink", "gold", "purple", "teal"];

  return (
    <div className="relative min-h-screen gradient-night-sky overflow-hidden flex flex-col items-center justify-center px-4">
      {/* Background balloons */}
      {balloonColors.map((color, index) => (
        <Balloon
          key={index}
          color={color}
          left={`${10 + index * 25}%`}
          delay={index * 1.5}
          size="sm"
        />
      ))}

      {/* Confetti on cut */}
      <AnimatePresence>
        {showConfetti && <Confetti count={100} isActive={true} />}
      </AnimatePresence>

      {/* Sparkles */}
      <Sparkle size={20} color="hsl(43 100% 60%)" delay={0} className="top-[15%] left-[20%]" />
      <Sparkle size={16} color="hsl(340 80% 70%)" delay={0.5} className="top-[25%] right-[25%]" />

      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-celebration text-4xl sm:text-5xl text-primary text-glow-gold mb-4">
          Make a Wish! ✨
        </h2>
        <p className="font-elegant text-lg text-foreground/70">
          Close your eyes and wish upon the candles
        </p>
      </motion.div>

      {/* Cake */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <BirthdayCake isCut={isCut} />
      </motion.div>

      {/* Wish text */}
      <AnimatePresence>
        {wishMade && !isCut && (
          <motion.p
            className="mt-8 font-celebration text-2xl text-celebration-warm-yellow text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            Your wish is being granted... 🌟
          </motion.p>
        )}
      </AnimatePresence>

      {/* Cut button */}
      <AnimatePresence>
        {!isCut && (
          <motion.button
            onClick={handleCut}
            className="mt-10 px-8 py-4 bg-gradient-to-r from-celebration-gold to-celebration-warm-yellow rounded-full font-celebration text-xl text-primary-foreground shadow-lg flex items-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.5 }}
          >
            <Cake className="w-6 h-6" />
            {wishMade ? "Cutting..." : "Cut the Cake 🎂"}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Celebration message after cut */}
      <AnimatePresence>
        {isCut && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.p
              className="font-celebration text-3xl text-primary text-glow-gold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: 3 }}
            >
              Your wish will come true! 🎊
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient glow */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-celebration-warm-yellow/10 blur-3xl pointer-events-none" />
    </div>
  );
};

export default CakePage;
