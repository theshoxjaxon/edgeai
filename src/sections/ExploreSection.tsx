import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Clock, TrendingUp, Target, ChevronRight, X } from 'lucide-react';
import { predictionsPreviewConfig } from '../config';

interface MatchDetailModalProps {
  match: typeof predictionsPreviewConfig.predictions[0] | null;
  onClose: () => void;
}

function MatchDetailModal({ match, onClose }: MatchDetailModalProps) {
  if (!match) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-gradient-to-br from-[#0D2818] to-[#05140A] border border-[#8FBC8F]/20 rounded-2xl p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#8FBC8F]/10 flex items-center justify-center text-[#8FBC8F] hover:bg-[#8FBC8F]/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-6">
            <span className="text-[#8FBC8F] text-sm">{match.league}</span>
            <h3 className="text-2xl font-bold text-[#F5F5DC] mt-2">
              {match.homeTeam} vs {match.awayTeam}
            </h3>
            <div className="flex items-center justify-center gap-2 mt-2 text-[#C9A227]">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{match.kickoff}</span>
            </div>
          </div>

          {/* Probability Bars */}
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#F5F5DC]">{match.homeTeam} Win</span>
                <span className="text-[#C9A227] font-bold">{match.homeProb}%</span>
              </div>
              <div className="h-3 bg-[#0a1f12] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${match.homeProb}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-[#C9A227] to-[#d4b43a] rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#F5F5DC]">Draw</span>
                <span className="text-[#8FBC8F] font-bold">{match.drawProb}%</span>
              </div>
              <div className="h-3 bg-[#0a1f12] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${match.drawProb}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-[#8FBC8F] to-[#a0c9a0] rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#F5F5DC]">{match.awayTeam} Win</span>
                <span className="text-[#8FBC8F] font-bold">{match.awayProb}%</span>
              </div>
              <div className="h-3 bg-[#0a1f12] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${match.awayProb}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-[#8FBC8F]/60 to-[#8FBC8F] rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Edge & Recommendation */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0a1f12] rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[#C9A227]" />
                <span className="text-[#8FBC8F] text-sm">Edge</span>
              </div>
              <span className="text-2xl font-bold text-[#C9A227]">+{match.edge}%</span>
            </div>
            <div className="bg-[#0a1f12] rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 text-[#C9A227]" />
                <span className="text-[#8FBC8F] text-sm">Recommendation</span>
              </div>
              <span className="text-lg font-bold text-[#F5F5DC]">{match.recommendation}</span>
            </div>
          </div>

          <a
            href="#/dashboard"
            className="block w-full py-3 text-center bg-[#C9A227] text-[#0D2818] font-bold rounded-lg hover:bg-[#d4b43a] transition-colors"
          >
            View Full Analysis
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ExploreSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedMatch, setSelectedMatch] = useState<typeof predictionsPreviewConfig.predictions[0] | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#05140A]"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#C9A227]/5 rounded-full blur-3xl" />
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
            <span className="inline-block px-4 py-2 rounded-full bg-[#C9A227]/10 text-[#C9A227] text-sm font-medium mb-6">
              {predictionsPreviewConfig.label}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {predictionsPreviewConfig.heading.map((line, i) => (
                <span key={i} className="text-[#F5F5DC] block">{line}</span>
              ))}
              <span className="text-[#C9A227] block">{predictionsPreviewConfig.headingAccent}</span>
            </h2>
            <p className="text-[#8FBC8F] text-lg max-w-2xl mx-auto mt-6">
              {predictionsPreviewConfig.description}
            </p>
          </motion.div>

          {/* Predictions Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {predictionsPreviewConfig.predictions.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                onClick={() => setSelectedMatch(match)}
                className="group cursor-pointer bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 hover:border-[#C9A227]/40 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A227]/5"
              >
                {/* Match Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#C9A227]/10 text-[#C9A227] text-xs font-medium rounded-full">
                      {match.league}
                    </span>
                    <span className="flex items-center gap-1 text-[#8FBC8F] text-sm">
                      <Clock className="w-4 h-4" />
                      {match.kickoff}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full">
                    +{match.edge}% edge
                  </span>
                </div>

                {/* Teams */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-[#0a1f12] border border-[#8FBC8F]/20 flex items-center justify-center mb-1">
                        <span className="text-[#F5F5DC] font-bold text-sm">
                          {match.homeTeam.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[#8FBC8F] text-xs">{match.homeTeam}</span>
                    </div>
                    <span className="text-[#8FBC8F] font-bold">VS</span>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-[#0a1f12] border border-[#8FBC8F]/20 flex items-center justify-center mb-1">
                        <span className="text-[#F5F5DC] font-bold text-sm">
                          {match.awayTeam.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[#8FBC8F] text-xs">{match.awayTeam}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#8FBC8F] text-sm">AI Prediction</p>
                    <p className="text-[#C9A227] font-bold">{match.recommendation}</p>
                  </div>
                </div>

                {/* Probability Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-[#8FBC8F] mb-2">
                    <span>Home {match.homeProb}%</span>
                    <span>Draw {match.drawProb}%</span>
                    <span>Away {match.awayProb}%</span>
                  </div>
                  <div className="h-2 bg-[#0a1f12] rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-[#C9A227]"
                      style={{ width: `${match.homeProb}%` }}
                    />
                    <div
                      className="h-full bg-[#8FBC8F]"
                      style={{ width: `${match.drawProb}%` }}
                    />
                    <div
                      className="h-full bg-[#8FBC8F]/50"
                      style={{ width: `${match.awayProb}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#C9A227]" />
                    <span className="text-[#8FBC8F] text-sm">Confidence: {match.homeProb}%</span>
                  </div>
                  <span className="flex items-center gap-1 text-[#C9A227] text-sm font-medium group-hover:gap-2 transition-all">
                    View Analysis <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-10"
          >
            <a
              href="#/predictions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] font-semibold rounded-lg hover:bg-[#C9A227]/20 transition-all duration-300"
            >
              View All Predictions
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Match Detail Modal */}
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </section>
  );
}
