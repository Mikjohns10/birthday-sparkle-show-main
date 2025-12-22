import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Gift } from "lucide-react";

interface GiftBoxProps {
  variant: "purple" | "pink" | "gold" | "teal";
  message: string;
  onOpen?: () => void;
  delay?: number;
}

const variantStyles = {
  purple: "gift-box",
  pink: "gift-box gift-box-pink",
  gold: "gift-box gift-box-gold",
  teal: "gift-box gift-box-teal",
};

const GiftBox = ({ variant, message, onOpen, delay = 0 }: GiftBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      onOpen?.();
    }
  };

  return (
    <motion.div
      className="relative cursor-pointer perspective-1000"
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      whileHover={{ scale: isOpen ? 1 : 1.05 }}
      onClick={handleClick}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="box"
            className={`${variantStyles[variant]} w-28 h-28 sm:w-32 sm:h-32 rounded-xl flex items-center justify-center`}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Ribbon vertical */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-foreground/20" />
            {/* Ribbon horizontal */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-4 bg-foreground/20" />
            {/* Bow */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="w-6 h-4 rounded-full bg-foreground/30 -rotate-45 absolute -left-4" />
                <div className="w-6 h-4 rounded-full bg-foreground/30 rotate-45 absolute -right-4" />
                <div className="w-4 h-4 rounded-full bg-foreground/40 relative z-10" />
              </div>
            </div>
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 rounded-xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <Gift className="w-10 h-10 text-foreground/50 relative z-10" />
          </motion.div>
        ) : (
          <motion.div
            key="message"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-card/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center p-3"
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.p
              className="text-center text-sm font-elegant text-foreground leading-snug"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {message}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GiftBox;
