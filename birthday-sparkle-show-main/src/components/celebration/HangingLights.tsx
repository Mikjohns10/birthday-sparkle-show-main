import { motion } from "framer-motion";

interface LightBulb {
  color: string;
  delay: number;
}

const HangingLights = () => {
  const lights: LightBulb[] = [
    { color: "hsl(43 100% 60%)", delay: 0 },
    { color: "hsl(340 80% 70%)", delay: 0.3 },
    { color: "hsl(280 70% 65%)", delay: 0.6 },
    { color: "hsl(180 70% 50%)", delay: 0.9 },
    { color: "hsl(43 100% 60%)", delay: 1.2 },
    { color: "hsl(340 80% 70%)", delay: 1.5 },
    { color: "hsl(280 70% 65%)", delay: 1.8 },
    { color: "hsl(180 70% 50%)", delay: 2.1 },
    { color: "hsl(43 100% 60%)", delay: 2.4 },
    { color: "hsl(340 80% 70%)", delay: 2.7 },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 overflow-hidden">
      {/* Wire */}
      <svg className="w-full h-20" preserveAspectRatio="none">
        <path
          d="M0,10 Q50,30 100,10 Q150,30 200,10 Q250,30 300,10 Q350,30 400,10 Q450,30 500,10 Q550,30 600,10 Q650,30 700,10 Q750,30 800,10 Q850,30 900,10 Q950,30 1000,10"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          fill="none"
          className="w-full"
          style={{ transform: "scaleX(2)" }}
        />
      </svg>

      {/* Light bulbs */}
      <div className="absolute top-0 left-0 right-0 flex justify-around px-4">
        {lights.map((light, index) => (
          <motion.div
            key={index}
            className="relative"
            style={{ marginTop: index % 2 === 0 ? "15px" : "25px" }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-4 rounded-full blur-lg"
              style={{ backgroundColor: light.color, opacity: 0.4 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 2,
                delay: light.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Bulb */}
            <motion.div
              className="relative w-4 h-6 rounded-full"
              style={{
                backgroundColor: light.color,
                boxShadow: `0 0 10px ${light.color}, 0 0 20px ${light.color}`,
              }}
              animate={{ 
                opacity: [0.7, 1, 0.7],
                scale: [0.95, 1, 0.95]
              }}
              transition={{
                duration: 2,
                delay: light.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Cap */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted rounded-sm" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HangingLights;
