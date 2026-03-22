import { motion } from 'framer-motion';

export function Logo({ className = '' }: { className?: string }) {
  // SVG drawing animation variants
  const baseLineVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1, 
      transition: { duration: 0.2, ease: "easeOut" } 
    }
  };

  const ascendingAngleVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1, 
      transition: { duration: 0.15, delay: 0.2, ease: "easeOut" } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.2, delay: 0.35, ease: "easeIn" } 
    }
  };

  const pulseVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: [0, 1, 0.5, 1],
      scale: [0.8, 1.2, 1, 1.1],
      transition: { 
        duration: 1.5, 
        delay: 0.35, 
        repeat: Infinity, 
        repeatType: "reverse", 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        {/* Base data stream lines (forming the 'E' abstraction) */}
        <motion.path
          d="M 5 10 L 15 10"
          stroke="#CCFF00"
          strokeWidth="3"
          strokeLinecap="round"
          variants={baseLineVariants as any}
        />
        <motion.path
          d="M 5 20 L 20 20"
          stroke="#CCFF00"
          strokeWidth="3"
          strokeLinecap="round"
          variants={baseLineVariants as any}
        />
        <motion.path
          d="M 5 30 L 25 30"
          stroke="#CCFF00"
          strokeWidth="3"
          strokeLinecap="round"
          variants={baseLineVariants as any}
        />

        {/* Ascending angle representing the "Edge" (cutting diagonally upwards) */}
        <motion.path
          d="M 25 30 L 32 10"
          stroke="#CCFF00"
          strokeWidth="3"
          strokeLinecap="round"
          variants={ascendingAngleVariants as any}
        />
        
        {/* Terminal dot / point */}
        <motion.circle
          cx="32"
          cy="10"
          r="2.5"
          fill="#00F5FF"
          variants={pulseVariants as any}
        />
      </motion.svg>
      
      {/* Wordmark EdgeAI */}
      <motion.div 
        variants={textVariants as any} 
        initial="hidden" 
        animate="visible"
        className="flex items-center"
        style={{ fontFamily: "'Avenir Next', 'system-ui', sans-serif" }}
      >
        <span className="text-white font-bold tracking-tight text-xl">EDGE</span>
        <span className="text-primary font-black tracking-tight text-xl">AI</span>
      </motion.div>
    </div>
  );
}
