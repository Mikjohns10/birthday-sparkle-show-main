import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomePage from "./WelcomePage";
import CakePage from "./CakePage";
import GiftsPage from "./GiftsPage";
import WishesPage from "./WishesPage";
import FinalPage from "./FinalPage";
import MusicToggle from "../components/celebration/MusicToggle";
import Confetti from "../components/celebration/Confetti";
import { useAudio } from "../hooks/useAudio";

type CelebrationStep = "welcome" | "cake" | "gifts" | "wishes" | "finale";

const RECIPIENT_NAME = "Mik Halder";

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<CelebrationStep>("welcome");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTransitionConfetti, setShowTransitionConfetti] = useState(false);
  
  const { playMusic, pauseMusic, playButtonClick, playCakeCut, playGiftOpen, playFirework } = useAudio();

  // Handle music toggle
  useEffect(() => {
    if (isMusicPlaying) {
      playMusic();
    } else {
      pauseMusic();
    }
  }, [isMusicPlaying, playMusic, pauseMusic]);

  const handleIgnite = useCallback(() => {
    playButtonClick();
    
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsMusicPlaying(true);
    }
    setShowTransitionConfetti(true);
    setTimeout(() => {
      setCurrentStep("cake");
      setShowTransitionConfetti(false);
    }, 800);
  }, [hasInteracted, playButtonClick]);

  const handleCakeComplete = useCallback(() => {
    playCakeCut();
    setTimeout(() => {
      setCurrentStep("gifts");
    }, 500);
  }, [playCakeCut]);

  const handleGiftOpen = useCallback(() => {
    playGiftOpen();
  }, [playGiftOpen]);

  const handleGiftsComplete = useCallback(() => {
    playButtonClick();
    setCurrentStep("wishes");
  }, [playButtonClick]);

  const handleWishesComplete = useCallback(() => {
    playButtonClick();
    setShowTransitionConfetti(true);
    setTimeout(() => {
      setCurrentStep("finale");
      setShowTransitionConfetti(false);
    }, 500);
  }, [playButtonClick]);

  const handleReplay = useCallback(() => {
    playButtonClick();
    setCurrentStep("welcome");
  }, [playButtonClick]);

  const toggleMusic = useCallback(() => {
    setIsMusicPlaying((prev) => !prev);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Music Toggle - Always visible after first interaction */}
      {hasInteracted && (
        <MusicToggle isPlaying={isMusicPlaying} onToggle={toggleMusic} />
      )}

      {/* Transition confetti */}
      {showTransitionConfetti && <Confetti count={60} isActive={true} />}

      {/* Page transitions */}
      <AnimatePresence mode="wait">
        {currentStep === "welcome" && (
          <motion.div
            key="welcome"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <WelcomePage onIgnite={handleIgnite} recipientName={RECIPIENT_NAME} />
          </motion.div>
        )}

        {currentStep === "cake" && (
          <motion.div
            key="cake"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <CakePage onComplete={handleCakeComplete} onCakeCut={playCakeCut} />
          </motion.div>
        )}

        {currentStep === "gifts" && (
          <motion.div
            key="gifts"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <GiftsPage 
              onComplete={handleGiftsComplete} 
              recipientName={RECIPIENT_NAME} 
              onGiftOpen={handleGiftOpen}
            />
          </motion.div>
        )}

        {currentStep === "wishes" && (
          <motion.div
            key="wishes"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <WishesPage onComplete={handleWishesComplete} recipientName={RECIPIENT_NAME} />
          </motion.div>
        )}

        {currentStep === "finale" && (
          <motion.div
            key="finale"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <FinalPage 
              onReplay={handleReplay} 
              recipientName={RECIPIENT_NAME} 
              onFirework={playFirework}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
