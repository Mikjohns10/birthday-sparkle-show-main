import { motion } from "framer-motion";
import Balloon from "../components/celebration/Balloon";
import HangingLights from "../components/celebration/HangingLights";
import Confetti from "../components/celebration/Confetti";
import IgnitionButton from "../components/celebration/IgnitionButton";
import Sparkle from "../components/celebration/Sparkle";

interface WelcomePageProps {
  onIgnite: () => void;
  recipientName: string;
}

const WelcomePage = ({ onIgnite, recipientName }: WelcomePageProps) => {
  const balloonColors: Array<"pink" | "gold" | "purple" | "teal"> = ["pink", "gold", "purple", "teal", "pink", "gold", "purple"];

  return (
    <div className="relative min-h-screen gradient-night-sky overflow-hidden">
      {/* Hanging Lights */}
      <HangingLights />

      {/* Balloons */}
      {balloonColors.map((color, index) => (
        <Balloon
          key={index}
          color={color}
          left={`${5 + index * 14}%`}
          delay={index * 2}
          size={index % 3 === 0 ? "lg" : index % 2 === 0 ? "md" : "sm"}
        />
      ))}

      {/* Gentle confetti */}
      <Confetti count={30} />

      {/* Sparkles scattered */}
      <Sparkle size={24} color="hsl(43 100% 60%)" delay={0} className="top-[20%] left-[15%]" />
      <Sparkle size={18} color="hsl(340 80% 70%)" delay={0.5} className="top-[30%] right-[20%]" />
      <Sparkle size={20} color="hsl(280 70% 65%)" delay={1} className="bottom-[30%] left-[25%]" />
      <Sparkle size={16} color="hsl(180 70% 50%)" delay={1.5} className="bottom-[40%] right-[15%]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="font-celebration text-5xl sm:text-7xl md:text-8xl text-primary text-glow-gold mb-4"
            animate={{ 
              textShadow: [
                "0 0 30px hsl(43 100% 60% / 0.8), 0 0 60px hsl(43 100% 60% / 0.5)",
                "0 0 50px hsl(43 100% 60% / 1), 0 0 100px hsl(43 100% 60% / 0.7)",
                "0 0 30px hsl(43 100% 60% / 0.8), 0 0 60px hsl(43 100% 60% / 0.5)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Happy Birthday
          </motion.h1>
          <motion.p
            className="font-celebration text-3xl sm:text-4xl text-celebration-pink text-glow-pink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {recipientName}! 🎉
          </motion.p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-elegant text-xl sm:text-2xl text-foreground/80 text-center mb-12 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Today is all about you 💖
        </motion.p>

        {/* Ignition Button */}
        <IgnitionButton
          onClick={onIgnite}
          text="Ignite the Celebration ✨"
        />

        {/* Decorative bottom text */}
        <motion.p
          className="absolute bottom-8 text-muted-foreground text-sm font-elegant"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5 }}
        >
          Tap to begin your magical journey
        </motion.p>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
    </div>
  );
};

export default WelcomePage;
