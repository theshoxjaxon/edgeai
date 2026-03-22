import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Brain, Target, TrendingUp, Shield, Zap, BarChart3 } from 'lucide-react';
import { featuresConfig } from '../config';

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const prefix = value.replace(/[0-9]/g, '');
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);
  
  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function StorySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    { icon: Brain, title: "Machine Learning", description: "Poisson + Elo + xG models" },
    { icon: Target, title: "Edge Detection", description: "Find value vs market odds" },
    { icon: TrendingUp, title: "Kelly Staking", description: "Optimal bet sizing" },
    { icon: Shield, title: "Bankroll Protection", description: "Risk management built-in" },
    { icon: Zap, title: "Real-time Data", description: "Injuries & lineups updated" },
    { icon: BarChart3, title: "Analytics", description: "Track every metric" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#011627]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, #00F5FF 1px, transparent 1px),
                           linear-gradient(#00F5FF 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] text-sm font-medium mb-6">
              {featuresConfig.label}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {featuresConfig.heading.map((line, i) => (
                <span key={i} className="text-[#FFFFFF] block">{line}</span>
              ))}
              <span className="text-[#CCFF00] block">{featuresConfig.headingAccent}</span>
            </h2>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="space-y-6"
            >
              {featuresConfig.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-[#00F5FF] text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Right - Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group p-5 rounded-xl bg-[#011627]/50 border border-[#00F5FF]/10 hover:border-[#CCFF00]/30 hover:bg-[#011627] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center mb-3 group-hover:bg-[#CCFF00]/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-[#CCFF00]" />
                  </div>
                  <h3 className="text-[#FFFFFF] font-semibold mb-1">{feature.title}</h3>
                  <p className="text-[#00F5FF] text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuresConfig.stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-[#00F5FF]/10"
              >
                <p className="text-4xl lg:text-5xl font-bold text-[#CCFF00] mb-2">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-[#00F5FF] text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
