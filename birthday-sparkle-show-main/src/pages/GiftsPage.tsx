import { motion } from "framer-motion";
import { useState } from "react";
import GiftBox from "../components/celebration/GiftBox";
import Sparkle from "../components/celebration/Sparkle";
import Confetti from "../components/celebration/Confetti";

interface GiftsPageProps {
  onComplete: () => void;
  recipientName: string;
  onGiftOpen?: () => void;
}

const giftMessages = [
  "You make life brighter 🌟",
  "So lucky to have you 💕",
  "Here's to many more smiles 🥂",
  "You're one in a million ✨",
  "May all your dreams come true 🌈",
];

const GiftsPage = ({ onComplete, recipientName, onGiftOpen }: GiftsPageProps) => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpenGift = (index: number) => {
    if (!openedGifts.includes(index)) {
      setOpenedGifts([...openedGifts, index]);
      setShowConfetti(true);
      onGiftOpen?.();
      
      // Check if all gifts are opened
      if (openedGifts.length === giftMessages.length - 1) {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
      
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const giftVariants: Array<"purple" | "pink" | "gold" | "teal"> = [
    "gold", "pink", "purple", "teal", "pink"
  ];

  return (
    <div className="relative min-h-screen gradient-night-sky overflow-hidden flex flex-col items-center justify-center px-4 py-16">
      {/* Confetti bursts */}
      {showConfetti && <Confetti count={50} isActive={true} />}

      {/* Sparkles */}
      <Sparkle size={22} color="hsl(43 100% 60%)" delay={0} className="top-[10%] left-[15%]" />
      <Sparkle size={18} color="hsl(280 70% 65%)" delay={0.7} className="top-[20%] right-[20%]" />
      <Sparkle size={20} color="hsl(340 80% 70%)" delay={1.2} className="bottom-[25%] left-[10%]" />

      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-celebration text-4xl sm:text-5xl text-primary text-glow-gold mb-4">
          Surprise Gifts! 🎁
        </h2>
        <p className="font-elegant text-lg text-foreground/70">
          Tap each gift to reveal a special message for {recipientName}
        </p>
      </motion.div>

      {/* Gift grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {giftMessages.map((message, index) => (
          <GiftBox
            key={index}
            variant={giftVariants[index]}
            message={message}
            delay={0.2 + index * 0.15}
            onOpen={() => handleOpenGift(index)}
          />
        ))}
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        className="mt-12 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {giftMessages.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              openedGifts.includes(index) ? "bg-primary" : "bg-muted"
            }`}
            animate={openedGifts.includes(index) ? { scale: [1, 1.3, 1] } : {}}
          />
        ))}
      </motion.div>

      {/* Continue button */}
      {openedGifts.length >= 3 && (
        <motion.button
          onClick={onComplete}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-celebration-purple to-celebration-pink rounded-full font-celebration text-lg text-foreground shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue to Wishes 💌
        </motion.button>
      )}

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-celebration-purple/5 blur-3xl pointer-events-none" />
    </div>
  );
};

export default GiftsPage;
