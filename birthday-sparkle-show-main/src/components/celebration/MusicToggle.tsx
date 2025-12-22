import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicToggle = ({ isPlaying, onToggle }: MusicToggleProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </motion.div>

      {/* Sound waves animation */}
      {isPlaying && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/20"
            animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
            transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
          />
        </>
      )}
    </motion.button>
  );
};

export default MusicToggle;
