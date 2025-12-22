import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface BirthdayCakeProps {
  onCut?: () => void;
  isCut?: boolean;
}

const BirthdayCake = ({ onCut, isCut = false }: BirthdayCakeProps) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const candles = [0, 1, 2, 3, 4];

  return (
    <div className="relative">
      {/* Cake container */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Candles */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex gap-6">
          {candles.map((_, index) => (
            <div key={index} className="relative">
              {/* Candle body */}
              <div 
                className="w-3 h-12 rounded-sm"
                style={{
                  background: `linear-gradient(135deg, 
                    ${index % 2 === 0 ? 'hsl(340 80% 70%)' : 'hsl(43 100% 60%)'} 0%, 
                    ${index % 2 === 0 ? 'hsl(340 60% 55%)' : 'hsl(35 90% 50%)'} 100%)`,
                }}
              />
              {/* Wick */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-gray-700" />
              
              {/* Flame */}
              <AnimatePresence>
                {candlesLit && (
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {/* Outer flame */}
                    <motion.div
                      className="absolute w-4 h-6 rounded-full"
                      style={{
                        background: "linear-gradient(to top, hsl(43 100% 60%), hsl(25 100% 55%), transparent)",
                        filter: "blur(1px)",
                      }}
                      animate={{
                        scaleY: [1, 1.1, 0.95, 1],
                        scaleX: [1, 0.9, 1.05, 1],
                      }}
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Inner flame */}
                    <motion.div
                      className="absolute left-1 w-2 h-4 rounded-full"
                      style={{
                        background: "linear-gradient(to top, hsl(45 100% 96%), hsl(45 100% 80%))",
                      }}
                      animate={{
                        scaleY: [1, 1.15, 0.9, 1],
                      }}
                      transition={{
                        duration: 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Glow */}
                    <div 
                      className="absolute -inset-4 rounded-full blur-md"
                      style={{
                        background: "radial-gradient(circle, hsl(43 100% 60% / 0.6), transparent)",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Top layer (smallest) */}
        <div className="relative mx-auto w-32 h-12 rounded-t-lg cake-frosting">
          {/* Dripping frosting */}
          <div className="absolute -bottom-2 left-2 w-4 h-4 rounded-full cake-frosting" />
          <div className="absolute -bottom-3 left-8 w-3 h-5 rounded-full cake-frosting" />
          <div className="absolute -bottom-2 right-4 w-4 h-4 rounded-full cake-frosting" />
          
          {/* Decorations */}
          <div className="absolute top-2 left-4 w-2 h-2 rounded-full bg-celebration-gold" />
          <div className="absolute top-3 right-6 w-2 h-2 rounded-full bg-celebration-purple" />
        </div>
        <div className="mx-auto w-32 h-8 cake-layer" />

        {/* Middle layer */}
        <div className="relative mx-auto w-44 h-10 -mt-1 rounded-t-sm cake-frosting">
          <div className="absolute -bottom-2 left-3 w-5 h-5 rounded-full cake-frosting" />
          <div className="absolute -bottom-3 left-12 w-4 h-6 rounded-full cake-frosting" />
          <div className="absolute -bottom-2 right-8 w-4 h-4 rounded-full cake-frosting" />
          <div className="absolute -bottom-3 right-2 w-3 h-5 rounded-full cake-frosting" />
        </div>
        <div className="mx-auto w-44 h-10 cake-layer" />

        {/* Bottom layer (largest) */}
        <div className="relative mx-auto w-56 h-10 -mt-1 rounded-t-sm cake-frosting">
          <div className="absolute -bottom-2 left-4 w-5 h-5 rounded-full cake-frosting" />
          <div className="absolute -bottom-4 left-14 w-4 h-7 rounded-full cake-frosting" />
          <div className="absolute -bottom-3 left-24 w-5 h-6 rounded-full cake-frosting" />
          <div className="absolute -bottom-2 right-6 w-4 h-4 rounded-full cake-frosting" />
        </div>
        <div className="mx-auto w-56 h-12 cake-layer rounded-b-lg" />

        {/* Plate */}
        <div 
          className="mx-auto w-72 h-4 mt-1 rounded-full"
          style={{
            background: "linear-gradient(to bottom, hsl(45 20% 85%), hsl(45 15% 75%))",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          }}
        />

        {/* Cut animation overlay */}
        <AnimatePresence>
          {isCut && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute w-1 h-40 bg-celebration-gold"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "top" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BirthdayCake;
