import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Shield, ArrowRight, Play } from 'lucide-react';
import { heroConfig } from '../config';
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const stats = [
    { icon: TrendingUp, value: "73%", label: t('hero.statWinRate') },
    { icon: BarChart3, value: "+24%", label: t('hero.statRoi') },
    { icon: Shield, value: "50K+", label: t('hero.statUsers') },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#011627] via-[#0A2A3A] to-[#011627]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #CCFF00 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #00F5FF 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#CCFF00]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#011627] to-transparent" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-10rem)]"
          >
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                  {t(heroConfig.badgeText)}
                </span>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-[#00F5FF] text-sm sm:text-base uppercase tracking-[0.2em] mb-4 font-medium"
              >
                {t(heroConfig.subtitle)}
              </motion.p>

              {/* Title */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] mb-6"
              >
                <span className="text-[#FFFFFF] block">{t(heroConfig.titleLine1)}</span>
                <span className="text-[#CCFF00] block mt-2">{t(heroConfig.titleLine2)}</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                variants={itemVariants}
                className="text-[#00F5FF] text-lg sm:text-xl mb-8 max-w-lg"
              >
                {t(heroConfig.tagline)}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#/dashboard"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#CCFF00] text-[#011627] font-bold rounded-lg hover:bg-[#d4b43a] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#CCFF00]/20"
                >
                  {t(heroConfig.ctaPrimary)}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#/predictions"
                  className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-[#00F5FF]/30 text-[#FFFFFF] font-semibold rounded-lg hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  {t(heroConfig.ctaSecondary)}
                </a>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-6 sm:gap-10"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-[#CCFF00]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#FFFFFF]">{stat.value}</p>
                      <p className="text-xs text-[#00F5FF]">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Visual */}
            <motion.div
              variants={itemVariants}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Main Visual Card */}
              <motion.div
                animate={floatingAnimation}
                className="relative w-full max-w-lg"
              >
                {/* Prediction Card Mockup */}
                <div className="relative bg-gradient-to-br from-[#0A2A3A] to-[#011627] border border-[#00F5FF]/20 rounded-2xl p-6 shadow-2xl shadow-black/50">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[#00F5FF] text-sm">{t('hero.livePredictions')}</span>
                    </div>
                    <span className="text-[#CCFF00] text-sm font-medium">{t('hero.today')}</span>
                  </div>

                  {/* Match Cards */}
                  <div className="space-y-4">
                    {[
                      { home: "Man City", away: "Liverpool", prob: 72, edge: 8.5, rec: "Home" },
                      { home: "Real Madrid", away: "Barcelona", prob: 65, edge: 6.2, rec: "Home" },
                      { home: "Bayern", away: "Dortmund", prob: 78, edge: 12.3, rec: "Home" },
                    ].map((match, i) => (
                      <div
                        key={i}
                        className="bg-[#011627]/50 rounded-xl p-4 border border-[#00F5FF]/10 hover:border-[#CCFF00]/30 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[#FFFFFF] font-semibold text-sm">{match.home}</span>
                            <span className="text-[#00F5FF] text-xs">{t('hero.vs')}</span>
                            <span className="text-[#FFFFFF] font-semibold text-sm">{match.away}</span>
                          </div>
                          <span className="px-2 py-1 bg-[#CCFF00]/20 text-[#CCFF00] text-xs font-medium rounded">
                            +{match.edge}% {t('hero.edge')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="h-2 bg-[#0A2A3A] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#CCFF00] to-[#00F5FF] rounded-full"
                                style={{ width: `${match.prob}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-[#00F5FF] text-xs">{match.rec}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-[#00F5FF]/10 flex items-center justify-between">
                    <span className="text-[#00F5FF] text-sm">12 {t('hero.moreMatches')}</span>
                    <a href="#/predictions" className="text-[#CCFF00] text-sm font-medium hover:underline">
                      {t('hero.viewAll')}
                    </a>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#CCFF00]/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#00F5FF]/10 rounded-full blur-3xl" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#011627] to-transparent" />
    </section>
  );
}
