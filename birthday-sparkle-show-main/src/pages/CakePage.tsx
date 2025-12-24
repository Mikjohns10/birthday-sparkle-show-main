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
    <div className="relative min-h-screen gradient-night-sky overflow-hidden flex flex-col items-center px-4">
      {/* Fixed height container for no scrolling */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto h-screen py-8">
        
        {/* Background balloons - moved up */}
        {balloonColors.map((color, index) => (
          <Balloon
            key={index}
            color={color}
            left={`${10 + index * 25}%`}
            delay={index * 1.5}
            size="sm"
            className="-top-20 sm:-top-10" // Start above the screen
          />
        ))}

        {/* Confetti on cut */}
        <AnimatePresence>
          {showConfetti && <Confetti count={80} isActive={true} />}
        </AnimatePresence>

        {/* Sparkles */}
        <Sparkle size={16} color="hsl(43 100% 60%)" delay={0} className="top-[10%] left-[10%]" />
        <Sparkle size={12} color="hsl(340 80% 70%)" delay={0.5} className="top-[15%] right-[15%]" />

        {/* Title - Compact */}
        <motion.div
          className="text-center mb-4 sm:mb-6 w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-celebration text-2xl sm:text-3xl md:text-4xl text-primary text-glow-gold mb-2">
            Make a Wish! ✨
          </h2>
          <p className="font-elegant text-sm sm:text-base text-foreground/70">
            Close your eyes and wish upon the candles
          </p>
        </motion.div>

        {/* Cake - Smaller on mobile */}
        <motion.div
          className="relative z-20 mb-4 sm:mb-6 scale-90 sm:scale-100"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 0.9, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <BirthdayCake isCut={isCut} />
        </motion.div>

        {/* Wish text - Minimal space */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-2">
          <AnimatePresence>
            {wishMade && !isCut && (
              <motion.p
                className="font-celebration text-lg sm:text-xl text-celebration-warm-yellow text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                Your wish is being granted... 🌟
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Cut button - Compact */}
        <div className="h-14 sm:h-16 flex items-center justify-center mt-2">
          <AnimatePresence>
            {!isCut && (
              <motion.button
                onClick={handleCut}
                className="px-5 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-celebration-gold to-celebration-warm-yellow rounded-full font-celebration text-base sm:text-lg text-primary-foreground shadow-lg flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.5 }}
              >
                <Cake className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishMade ? "Cutting..." : "Cut the Cake 🎂"}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Celebration message - Compact */}
        <div className="h-12 sm:h-14 flex items-center justify-center">
          <AnimatePresence>
            {isCut && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.p
                  className="font-celebration text-xl sm:text-2xl text-primary text-glow-gold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: 3 }}
                >
                  Your wish will come true! 🎊
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ambient glow - smaller */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[200px] sm:w-[300px] h-[100px] sm:h-[150px] rounded-full bg-celebration-warm-yellow/5 blur-xl pointer-events-none" />
      </div>
    </div>
  );
};

export default CakePage;