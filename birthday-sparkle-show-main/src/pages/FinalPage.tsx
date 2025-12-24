import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import FireworksShow from "../components/celebration/FireworksShow";
import Confetti from "../components/celebration/Confetti";
import Balloon from "../components/celebration/Balloon";
import Sparkle from "../components/celebration/Sparkle";
import { RotateCcw, Heart, Volume2, VolumeX, Music, Repeat } from "lucide-react";

interface FinalPageProps {
  onReplay: () => void;
  recipientName: string;
  onFirework?: () => void;
}

const FinalPage = ({ onReplay, recipientName, onFirework }: FinalPageProps) => {
  const [showFireworks, setShowFireworks] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [showMusicControls, setShowMusicControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15); // 15 seconds
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Update current time for progress bar
  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    animationRef.current = requestAnimationFrame(updateTime);
  };

  // Initialize audio
  useEffect(() => {
    // Create audio element for the birthday song
    audioRef.current = new Audio();
    audioRef.current.src = "/audio/kab-tak-jawani.mp3"; // 15-second version
    audioRef.current.loop = true;
    audioRef.current.volume = 0.8;

    // Set up audio event listeners
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current?.duration || 15);
    });

    audioRef.current.addEventListener('ended', () => {
      // Loop automatically
      if (audioRef.current && isMusicPlaying) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    });

    // Auto-play music on page load
    if (isMusicPlaying) {
      const playMusic = async () => {
        try {
          await audioRef.current?.play();
          animationRef.current = requestAnimationFrame(updateTime);
        } catch (error) {
          console.log("Autoplay prevented, will play on user interaction");
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

  // Handle replay button click - also restarts music
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

  // Seek to specific time
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;
      
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    onFirework?.();
    
    const timer = setTimeout(() => {
      setShowFireworks(true);
    }, 500);

    // Hide music controls after 8 seconds
    const controlsTimer = setTimeout(() => {
      setShowMusicControls(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(controlsTimer);
    };
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

  // Calculate progress percentage
  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div 
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4"
      style={{
        background: "linear-gradient(180deg, hsl(240 40% 5%) 0%, hsl(250 35% 12%) 40%, hsl(270 30% 18%) 100%)",
      }}
      // Enable audio on user interaction
      onClick={() => {
        if (audioRef.current && !isMusicPlaying) {
          audioRef.current.play().then(() => {
            setIsMusicPlaying(true);
            animationRef.current = requestAnimationFrame(updateTime);
          });
        }
      }}
    >
      {/* Enhanced Music Controls */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: showMusicControls ? 1 : 0.7,
          x: 0 
        }}
        whileHover={{ opacity: 1 }}
        onMouseEnter={() => setShowMusicControls(true)}
        onMouseLeave={() => setShowMusicControls(false)}
      >
        <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-4 border border-celebration-gold/30 shadow-2xl">
          {/* Now Playing Header */}
          <div className="flex items-center gap-3 mb-3">
            <Music className="w-5 h-5 text-celebration-gold" />
            <div>
              <p className="text-white font-bold text-sm">Now Playing</p>
              <p className="text-celebration-gold text-xs">Birthday Special</p>
            </div>
          </div>

          {/* Song Info */}
          <div className="mb-3">
            <p className="text-white font-elegant text-base mb-1">"Kab Tak Jawani Chupaogi Rani"</p>
            <p className="text-gray-300 text-xs">For {recipientName}'s Celebration</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div 
              className="h-2 bg-gray-700 rounded-full cursor-pointer mb-1"
              onClick={handleSeek}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-celebration-pink to-celebration-gold rounded-full"
                style={{ width: `${progressPercentage}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <div className="flex items-center gap-1">
                <Repeat className="w-3 h-3" />
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Control Button */}
          <motion.button
            onClick={toggleMusic}
            className="w-full py-2 bg-gradient-to-r from-celebration-purple to-celebration-pink rounded-full flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4" />
                <span className="text-sm font-medium">Pause Music</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="text-sm font-medium">Play Music</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      <FireworksShow isActive={showFireworks} intensity="high" />

      <Confetti count={80} isActive={true} />

      {balloonColors.map((color, index) => (
        <Balloon
          key={index}
          color={color}
          left={`${8 + index * 15}%`}
          delay={index * 0.8}
          size={index % 2 === 0 ? "md" : "lg"}
        />
      ))}

      {/* Enhanced Sparkles that pulse with music */}
      <Sparkle 
        size={28} 
        color="hsl(43 100% 60%)" 
        delay={0} 
        className="top-[15%] left-[20%]"
        pulse={isMusicPlaying}
        pulseSpeed={currentTime % 2}
      />
      <Sparkle 
        size={22} 
        color="hsl(340 80% 70%)" 
        delay={0.4} 
        className="top-[25%] right-[15%]"
        pulse={isMusicPlaying}
        pulseSpeed={currentTime % 1.5}
      />
      <Sparkle 
        size={24} 
        color="hsl(280 70% 65%)" 
        delay={0.8} 
        className="top-[20%] left-[70%]"
        pulse={isMusicPlaying}
        pulseSpeed={currentTime % 1.8}
      />
      <Sparkle 
        size={20} 
        color="hsl(180 70% 50%)" 
        delay={1.2} 
        className="bottom-[30%] left-[15%]"
        pulse={isMusicPlaying}
        pulseSpeed={currentTime % 2.2}
      />
      <Sparkle 
        size={26} 
        color="hsl(43 100% 60%)" 
        delay={1.6} 
        className="bottom-[35%] right-[20%]"
        pulse={isMusicPlaying}
        pulseSpeed={currentTime % 1.7}
      />

      <motion.div
        className="relative z-20 text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
      >
        <div className="absolute inset-0 -m-20 rounded-full bg-primary/10 blur-3xl" />
        
        <motion.h1
          className="relative font-celebration text-5xl sm:text-7xl md:text-8xl text-primary mb-6"
          animate={{
            textShadow: isMusicPlaying ? [
              "0 0 40px hsl(43 100% 60% / 0.8), 0 0 80px hsl(43 100% 60% / 0.5), 0 0 120px hsl(43 100% 60% / 0.3)",
              "0 0 60px hsl(43 100% 60% / 1), 0 0 120px hsl(43 100% 60% / 0.7), 0 0 180px hsl(43 100% 60% / 0.5)",
              "0 0 40px hsl(43 100% 60% / 0.8), 0 0 80px hsl(43 100% 60% / 0.5), 0 0 120px hsl(43 100% 60% / 0.3)",
            ] : "0 0 40px hsl(43 100% 60% / 0.5)"
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Happy Birthday
        </motion.h1>

        <motion.p
          className="relative font-celebration text-3xl sm:text-4xl text-celebration-pink text-glow-pink mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {recipientName}! ❤️
        </motion.p>

        <motion.p
          className="relative font-elegant text-xl sm:text-2xl text-foreground/90 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          You are truly special.
          <br />
          <span className="text-primary">May all your dreams come true!</span>
        </motion.p>

        {/* Enhanced Music Visualizer */}
        <motion.div className="relative mt-8 flex justify-center items-center gap-1.5 h-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2].map((height, index) => (
            <motion.div
              key={index}
              className="w-1.5 bg-gradient-to-t from-celebration-gold via-celebration-pink to-celebration-purple rounded-full"
              animate={{
                height: isMusicPlaying ? [
                  `${10 + height * 3}px`,
                  `${10 + (Math.sin(currentTime * 10 + index) * 20 + 20)}px`,
                  `${10 + height * 3}px`
                ] : `${10 + height * 3}px`,
                opacity: isMusicPlaying ? [0.7, 1, 0.7] : 0.7,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                repeat: isMusicPlaying ? Infinity : 0,
                repeatType: "reverse",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-20 flex flex-col sm:flex-row gap-4 mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <motion.button
          onClick={handleReplayClick}
          className="px-8 py-4 bg-gradient-to-r from-celebration-purple to-celebration-pink rounded-full font-celebration text-lg text-foreground shadow-lg flex items-center justify-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5" />
          Replay Celebration
        </motion.button>

        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-celebration-gold to-celebration-warm-yellow rounded-full font-celebration text-lg text-primary-foreground shadow-lg flex items-center justify-center gap-3 glow-gold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="w-5 h-5" />
          Send Love
        </motion.button>
      </motion.div>

      <motion.p
        className="absolute bottom-8 text-muted-foreground text-sm font-elegant text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.5 }}
      >
        Made with love for someone truly amazing ✨
      </motion.p>

      {/* Music Credit Badge */}
      <motion.div
        className="absolute bottom-4 left-4 z-20 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-celebration-gold/40 flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3 }}
      >
        <Music className="w-4 h-4 text-celebration-gold" />
        <div>
          <p className="text-white text-xs font-bold">15-second Birthday Song</p>
          <p className="text-gray-300 text-[10px]">Playing on loop</p>
        </div>
      </motion.div>

      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full border border-celebration-pink/30">
        <div className="text-celebration-pink text-2xl">❤️</div>
        <p className="text-white text-sm font-bold">Love From Mik</p>
      </div>

      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-celebration-pink/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-celebration-purple/10 blur-3xl pointer-events-none" />
    </div>
  );
};

export default FinalPage;