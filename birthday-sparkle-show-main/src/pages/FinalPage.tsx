import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import FireworksShow from "../components/celebration/FireworksShow";
import MobileFireworksShow from "../components/celebration/MobileFireworksShow";
import Confetti from "../components/celebration/Confetti";
import MobileConfetti from "../components/celebration/MobileConfetti";
import Balloon from "../components/celebration/Balloon";
import Sparkle from "../components/celebration/Sparkle";
import { RotateCcw, Heart, Volume2, VolumeX, Music } from "lucide-react";

interface FinalPageProps {
  onReplay: () => void;
  recipientName: string;
  onFirework?: () => void;
}

const FinalPage = ({ onReplay, recipientName, onFirework }: FinalPageProps) => {
  const [showFireworks, setShowFireworks] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(40);
  const [isMobile, setIsMobile] = useState(false); // Mobile detection state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update current time for progress bar
  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    animationRef.current = requestAnimationFrame(updateTime);
  };

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.src = "/audio/tinku.mp3";
    audioRef.current.loop = true;
    audioRef.current.volume = 0.8;

    // Set up audio event listeners
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current?.duration || 15);
    });

    // Auto-play music on page load
    if (isMusicPlaying) {
      const playMusic = async () => {
        try {
          await audioRef.current?.play();
          animationRef.current = requestAnimationFrame(updateTime);
        } catch (error) {
          console.log("Autoplay prevented");
        }
      };
      playMusic();
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Toggle music play/pause
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } else {
        audioRef.current.play().catch(console.error);
        animationRef.current = requestAnimationFrame(updateTime);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  // Handle replay button click
  const handleReplayClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isMusicPlaying) {
        setIsMusicPlaying(true);
        audioRef.current.play().catch(console.error);
        animationRef.current = requestAnimationFrame(updateTime);
      }
    }
    onReplay();
  };

  useEffect(() => {
    onFirework?.();

    const timer = setTimeout(() => {
      setShowFireworks(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const balloonColors: Array<"pink" | "gold" | "purple" | "teal"> = [
    "gold", "pink", "purple", "teal", "gold", "pink"
  ];

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4"
      style={{
        background: "linear-gradient(180deg, hsl(240 40% 5%) 0%, hsl(250 35% 12%) 40%, hsl(270 30% 18%) 100%)",
      }}
      onClick={() => {
        if (audioRef.current && !isMusicPlaying) {
          audioRef.current.play().then(() => {
            setIsMusicPlaying(true);
            animationRef.current = requestAnimationFrame(updateTime);
          });
        }
      }}
    >
      {/* Conditional rendering for fireworks */}
      {isMobile ? (
        <MobileFireworksShow isActive={showFireworks} />
      ) : (
        <FireworksShow isActive={showFireworks} intensity="high" />
      )}

      {/* Conditional rendering for confetti */}
      {isMobile ? (
        <MobileConfetti isActive={true} />
      ) : (
        <Confetti count={80} isActive={true} />
      )}

      {/* EVERYTHING ELSE STAYS THE SAME */}
      {balloonColors.map((color, index) => (
        <Balloon
          key={index}
          color={color}
          left={`${8 + index * 15}%`}
          delay={index * 0.8}
          size={index % 2 === 0 ? "md" : "lg"}
        />
      ))}

      <Sparkle size={isMobile ? 20 : 28} color="hsl(43 100% 60%)" delay={0} className="top-[15%] left-[20%]" />
      <Sparkle size={isMobile ? 18 : 22} color="hsl(340 80% 70%)" delay={0.4} className="top-[25%] right-[15%]" />
      <Sparkle size={isMobile ? 20 : 24} color="hsl(280 70% 65%)" delay={0.8} className="top-[20%] left-[70%]" />
      <Sparkle size={isMobile ? 16 : 20} color="hsl(180 70% 50%)" delay={1.2} className="bottom-[30%] left-[15%]" />
      <Sparkle size={isMobile ? 22 : 26} color="hsl(43 100% 60%)" delay={1.6} className="bottom-[35%] right-[20%]" />

      <motion.div
        className="relative z-20 text-center w-full max-w-4xl px-4 will-change-transform"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
      >
        <div className="absolute inset-0 -m-20 rounded-full bg-primary/10 blur-3xl" />

        <motion.h1
          className="relative font-celebration text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-primary mb-4 sm:mb-6"
          animate={{
            textShadow: [
              "0 0 20px hsl(43 100% 60% / 0.8), 0 0 40px hsl(43 100% 60% / 0.5)",
              "0 0 30px hsl(43 100% 60% / 1), 0 0 60px hsl(43 100% 60% / 0.7)",
              "0 0 20px hsl(43 100% 60% / 0.8), 0 0 40px hsl(43 100% 60% / 0.5)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Happy Birthday
        </motion.h1>

        <motion.p
          className="relative font-celebration text-2xl sm:text-3xl md:text-4xl text-celebration-pink text-glow-pink mb-6 sm:mb-8 will-change-opacity"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {recipientName}! ❤️
        </motion.p>

        <motion.p
          className="relative font-elegant text-lg sm:text-xl md:text-2xl text-foreground/90 max-w-md mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          You are truly special.
          <br />
          <span className="text-primary">May all your dreams come true!</span>
        </motion.p>

        {/* Simple Music Visualizer */}
        <div className="flex justify-center items-center gap-1.5 h-8 mb-8">
          {[1, 2, 3, 2, 1].map((height, index) => (
            <motion.div
              key={index}
              className="w-1 sm:w-1.5 bg-gradient-to-t from-celebration-gold to-celebration-pink rounded-full"
              animate={{
                height: isMusicPlaying
                  ? [`${10 + height * 2}px`, `${15 + height * 3}px`, `${10 + height * 2}px`]
                  : `${10 + height * 2}px`,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                repeat: isMusicPlaying ? Infinity : 0,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="relative z-20 flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-12 w-full max-w-md px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <motion.button
          onClick={handleReplayClick}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-celebration-purple to-celebration-pink rounded-full font-celebration text-base sm:text-lg text-foreground shadow-lg flex items-center justify-center gap-2 sm:gap-3 will-change-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          Replay Celebration
        </motion.button>

        <motion.button
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-celebration-gold to-celebration-warm-yellow rounded-full font-celebration text-base sm:text-lg text-primary-foreground shadow-lg flex items-center justify-center gap-2 sm:gap-3 glow-gold will-change-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
          Send Love
        </motion.button>
      </motion.div>

      {/* Mobile Music Controls - Bottom Left */}
      <motion.div
        className="fixed bottom-4 left-4 z-50 w-auto max-w-[calc(100vw-2rem)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-3 border border-celebration-gold/30 shadow-2xl">
          <div className="flex items-center gap-3">
            {/* Album Art/Icon */}
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-celebration-purple to-celebration-pink flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              {isMusicPlaying && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-celebration-gold animate-pulse" />
              )}
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold truncate">Tinku Jiya...</p>
              <p className="text-celebration-gold text-xs truncate">For {recipientName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-300 text-xs">{formatTime(currentTime)}</span>
                <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-celebration-pink to-celebration-gold"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <span className="text-gray-300 text-xs">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Play/Pause Button */}
            <motion.button
              onClick={toggleMusic}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-celebration-purple to-celebration-pink flex items-center justify-center will-change-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMusicPlaying ? (
                <Volume2 className="w-4 h-4 text-white" />
              ) : (
                <VolumeX className="w-4 h-4 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Made with love - Bottom Center */}
      <motion.p
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 text-muted-foreground text-xs sm:text-sm font-elegant text-center w-full px-4 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.5 }}
      >
        Made with love for someone truly amazing ✨
      </motion.p>

      {/* Love From Mik - Bottom Right */}
      <motion.div
        className="fixed bottom-4 right-4 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full border border-celebration-pink/30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        <div className="text-celebration-pink text-xl">❤️</div>
        <p className="text-white text-xs sm:text-sm font-bold">Love From Mik</p>
      </motion.div>

      {/* Background Effects (reduced blur on mobile) */}
      <div className={`absolute top-1/4 left-1/4 ${isMobile ? 'w-[150px] h-[150px] blur-xl' : 'w-[300px] h-[300px] blur-3xl'} rounded-full bg-celebration-pink/5 pointer-events-none`} />
      <div className={`absolute bottom-1/3 right-1/4 ${isMobile ? 'w-[200px] h-[200px] blur-xl' : 'w-[400px] h-[400px] blur-3xl'} rounded-full bg-celebration-purple/5 pointer-events-none`} />
    </div>
  );
};

export default FinalPage;