import { motion } from "framer-motion";

interface BalloonProps {
  color: "pink" | "gold" | "purple" | "teal";
  delay?: number;
  left: string;
  size?: "sm" | "md" | "lg";
}

const colorMap = {
  pink: "from-celebration-pink to-celebration-pink-soft",
  gold: "from-celebration-gold to-celebration-warm-yellow",
  purple: "from-celebration-purple to-celebration-purple-deep",
  teal: "from-celebration-teal to-cyan-400",
};

const sizeMap = {
  sm: { width: 40, height: 50 },
  md: { width: 60, height: 75 },
  lg: { width: 80, height: 100 },
};

const Balloon = ({ color, delay = 0, left, size = "md" }: BalloonProps) => {
  const dimensions = sizeMap[size];

  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none"
      style={{ left }}
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: "-120vh", opacity: [0, 1, 1, 0.8] }}
      transition={{
        duration: 15 + Math.random() * 5,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.div
        animate={{ x: [-10, 10, -10], rotate: [-3, 3, -3] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Balloon body */}
        <div
          className={`bg-gradient-to-b ${colorMap[color]} rounded-full relative`}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.2), inset 5px 5px 15px rgba(255,255,255,0.3)`,
          }}
        >
          {/* Shine effect */}
          <div
            className="absolute top-3 left-3 bg-white/40 rounded-full"
            style={{ width: dimensions.width * 0.25, height: dimensions.height * 0.2 }}
          />
          {/* Knot */}
          <div
            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-b ${colorMap[color]} rotate-45`}
          />
        </div>
        {/* String */}
        <svg
          className="absolute left-1/2 -translate-x-1/2"
          width="2"
          height="100"
          style={{ top: dimensions.height }}
        >
          <motion.path
            d="M1,0 Q5,25 1,50 Q-3,75 1,100"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
            fill="none"
            animate={{
              d: [
                "M1,0 Q5,25 1,50 Q-3,75 1,100",
                "M1,0 Q-3,25 1,50 Q5,75 1,100",
                "M1,0 Q5,25 1,50 Q-3,75 1,100",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Balloon;
