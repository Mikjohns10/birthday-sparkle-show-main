import { motion } from "framer-motion";
import Sparkle from "./Sparkle";

interface WishCardProps {
  message: string;
  delay?: number;
  index: number;
}

const WishCard = ({ message, delay = 0, index }: WishCardProps) => {
  const rotations = [-3, 2, -2, 3, -1];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50, rotate: rotation * 2 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-card to-muted p-6 sm:p-8 rounded-2xl border border-primary/20 shadow-xl"
        style={{
          boxShadow: "0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
        whileHover={{ scale: 1.02, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Decorative corner */}
        <div className="absolute -top-2 -right-2 w-8 h-8">
          <div className="w-full h-full bg-gradient-to-br from-primary to-celebration-gold rounded-full opacity-80" />
        </div>

        {/* Message */}
        <p className="font-elegant text-lg sm:text-xl text-foreground leading-relaxed text-center">
          {message}
        </p>

        {/* Sparkles */}
        <Sparkle
          size={16}
          color="hsl(43 100% 60%)"
          delay={delay + 0.5}
          className="-top-2 -left-2"
        />
        <Sparkle
          size={12}
          color="hsl(340 80% 70%)"
          delay={delay + 1}
          className="bottom-2 right-4"
        />
      </motion.div>
    </motion.div>
  );
};

export default WishCard;
