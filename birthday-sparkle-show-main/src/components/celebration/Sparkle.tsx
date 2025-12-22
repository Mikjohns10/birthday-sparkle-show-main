import { motion } from "framer-motion";

interface SparkleProps {
  size?: number;
  color?: string;
  delay?: number;
  className?: string;
}

const Sparkle = ({ 
  size = 20, 
  color = "hsl(43 100% 60%)", 
  delay = 0,
  className = "" 
}: SparkleProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`absolute ${className}`}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1, 0.8, 1, 0],
        rotate: [0, 180],
        opacity: [0, 1, 1, 1, 0]
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill={color}
      />
    </motion.svg>
  );
};

export default Sparkle;
