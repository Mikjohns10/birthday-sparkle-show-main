import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface IgnitionButtonProps {
  onClick: () => void;
  text: string;
}

const IgnitionButton = ({ onClick, text }: IgnitionButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="btn-ignition relative w-44 h-44 sm:w-52 sm:h-52 flex flex-col items-center justify-center gap-3 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.5 
      }}
    >
      {/* Rotating outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulsing glow ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-primary/30"
        animate={{ 
          boxShadow: [
            "0 0 20px hsl(43 100% 60% / 0.2)",
            "0 0 40px hsl(43 100% 60% / 0.4)",
            "0 0 20px hsl(43 100% 60% / 0.2)",
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inner decorative ring */}
      <motion.div
        className="absolute inset-6 rounded-full border border-primary/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Decorative dots */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <motion.div
            key={angle}
            className="absolute w-1.5 h-1.5 bg-primary rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateY(-${85 / 2 - 3}px) translate(-50%, -50%)`,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, delay: angle / 360, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* Icon */}
      <motion.div
        animate={{ 
          y: [0, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-10 h-10 text-primary" />
      </motion.div>

      {/* Text */}
      <span className="font-celebration text-primary text-lg sm:text-xl text-center leading-tight px-4">
        {text}
      </span>

      {/* Floating sparkles around button */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full"
          style={{
            top: `${20 + i * 20}%`,
            left: i % 2 === 0 ? "-10%" : "110%",
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.button>
  );
};

export default IgnitionButton;
