import { motion } from "framer-motion";
import WishCard from "../components/celebration/WishCard";
import Sparkle from "../components/celebration/Sparkle";
import Balloon from "../components/celebration/Balloon";

interface WishesPageProps {
  onComplete: () => void;
  recipientName: string;
}

const wishes = [
  "May your days be filled with laughter, love, and endless joy. You deserve all the happiness in the world! 💖",
  "Another year wiser, another year more amazing. Here's to new adventures and beautiful memories! 🌟",
  "Thank you for being the incredible person you are. Your light brightens everyone around you! ✨",
  "May this year bring you closer to your dreams and shower you with blessings. You're truly special! 🎈",
];

const WishesPage = ({ onComplete, recipientName }: WishesPageProps) => {
  return (
    <div className="relative min-h-screen gradient-night-sky overflow-hidden flex flex-col items-center px-4 py-16">
      {/* Background balloons */}
      <Balloon color="pink" left="5%" delay={0} size="sm" />
      <Balloon color="gold" left="90%" delay={2} size="sm" />

      {/* Sparkles */}
      <Sparkle size={24} color="hsl(43 100% 60%)" delay={0} className="top-[12%] left-[12%]" />
      <Sparkle size={18} color="hsl(340 80% 70%)" delay={0.8} className="top-[8%] right-[18%]" />
      <Sparkle size={20} color="hsl(280 70% 65%)" delay={1.5} className="bottom-[20%] right-[10%]" />

      {/* Title */}
      <motion.div
        className="text-center mb-10 mt-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-celebration text-4xl sm:text-5xl text-primary text-glow-gold mb-4">
          Heartfelt Wishes 💌
        </h2>
        <p className="font-elegant text-lg text-foreground/70">
          Special messages just for you, {recipientName}
        </p>
      </motion.div>

      {/* Wishes grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {wishes.map((wish, index) => (
          <WishCard
            key={index}
            message={wish}
            delay={0.3 + index * 0.2}
            index={index}
          />
        ))}
      </motion.div>

      {/* Continue button */}
      <motion.button
        onClick={onComplete}
        className="mt-12 px-10 py-4 bg-gradient-to-r from-celebration-gold via-celebration-warm-yellow to-celebration-gold rounded-full font-celebration text-xl text-primary-foreground shadow-lg glow-gold"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1.2 }}
      >
        Grand Finale 🎆
      </motion.button>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-celebration-pink/5 blur-3xl pointer-events-none" />
    </div>
  );
};

export default WishesPage;
