import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Target, Clock,
  BarChart3, History, Brain, Star,
  Share2, Bell, Check
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useUsage } from '../hooks/useUsage';
import { useTranslation } from 'react-i18next';

interface MatchDetailProps {
  matchId: string;
  userTier: 'free' | 'pro';
  onLogout: () => void;
}

export function MatchDetail({ matchId, userTier }: MatchDetailProps) {
  const { t } = useTranslation();
  const { consumePrediction } = useUsage(userTier);
  const [canView, setCanView] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isTracking, setIsTracking] = useState(false);
  
  const { data: matchDetail, isLoading } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => api.getMatchDetail(matchId)
  });

  useEffect(() => {
    if (matchDetail && canView === null) {
      if (userTier === 'pro') {
        setCanView(true);
      } else {
        setCanView(consumePrediction());
      }
    }
  }, [matchDetail, userTier, canView, consumePrediction]);

  if (isLoading || !matchDetail) {
    return <div className="min-h-screen bg-base-100 pt-20 flex items-center justify-center text-primary">{t('matchDetail.loading')}</div>;
  }

  const { reasoning, ...match } = matchDetail;

  const probabilityData = [
    { name: match.homeTeam, value: match.homeProb, color: '#CCFF00' },
    { name: 'Draw', value: match.drawProb, color: '#00F5FF' },
    { name: match.awayTeam, value: match.awayProb, color: '#00F5FF80' },
  ];

  const tabs = [
    { id: 'overview', label: t('matchDetail.overview'), icon: BarChart3 },
    { id: 'analysis', label: t('matchDetail.aiAnalysis'), icon: Brain },
    { id: 'h2h', label: t('matchDetail.h2h'), icon: History },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.a
            href="#/predictions"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('matchDetail.back')}
          </motion.a>

          {/* Match Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-2xl p-6 lg:p-8 mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Teams */}
              <div className="flex items-center justify-center lg:justify-start gap-6 lg:gap-12">
                <div className="text-center">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#CCFF00]/20 to-[#00F5FF]/20 border-2 border-primary/30 flex items-center justify-center mb-3">
                    <span className="text-base-content font-bold text-2xl lg:text-3xl">
                      {match.homeTeam.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-base-content font-semibold text-lg">{match.homeTeam}</p>
                  <div className="flex justify-center gap-1 mt-2">
                    {match.recentForm.home.map((result, i) => (
                      <span
                        key={i}
                        className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${
                          result === 'W' ? 'bg-green-500/20 text-green-400' :
                          result === 'D' ? 'bg-secondary/20 text-secondary' :
                          'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-secondary text-sm mb-2">{match.league}</p>
                  <div className="flex items-center gap-2 text-primary">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">{match.kickoff}</span>
                  </div>
                  <p className="text-secondary text-xs mt-2">{t('matchDetail.today')}</p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#00F5FF]/20 to-[#00F5FF]/10 border-2 border-secondary/30 flex items-center justify-center mb-3">
                    <span className="text-base-content font-bold text-2xl lg:text-3xl">
                      {match.awayTeam.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-base-content font-semibold text-lg">{match.awayTeam}</p>
                  <div className="flex justify-center gap-1 mt-2">
                    {match.recentForm.away.map((result, i) => (
                      <span
                        key={i}
                        className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${
                          result === 'W' ? 'bg-green-500/20 text-green-400' :
                          result === 'D' ? 'bg-secondary/20 text-secondary' :
                          'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center lg:justify-end gap-4">
                <div className="text-center px-4 py-3 bg-base-200 rounded-xl">
                  <p className="text-secondary text-xs mb-1">{t('matchDetail.aiPrediction')}</p>
                  <p className="text-primary font-bold">{match.prediction}</p>
                </div>
                <div className="text-center px-4 py-3 bg-base-200 rounded-xl">
                  <p className="text-secondary text-xs mb-1">{t('matchDetail.edge')}</p>
                  <p className="text-green-400 font-bold">+{match.edge}%</p>
                </div>
                <div className="text-center px-4 py-3 bg-base-200 rounded-xl">
                  <p className="text-secondary text-xs mb-1">{t('matchDetail.kellyStake')}</p>
                  <p className="text-base-content font-bold">{match.kellyStake}%</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-3 mt-6 pt-6 border-t border-secondary/10">
              <button 
                onClick={() => setIsTracking(!isTracking)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  isTracking 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20'
                }`}
              >
                {isTracking ? <Check className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                {isTracking ? t('matchDetail.tracking') : t('matchDetail.trackBet')}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-base-200 border border-secondary/20 text-secondary rounded-lg hover:border-primary/40 transition-colors">
                <Bell className="w-4 h-4" />
                {t('matchDetail.setAlert')}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-base-200 border border-secondary/20 text-secondary rounded-lg hover:border-primary/40 transition-colors">
                <Share2 className="w-4 h-4" />
                {t('matchDetail.share')}
              </button>
            </div>
          </motion.div>

          {/* Tabs */}
          {canView === false ? (
            <div className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-[#f87272]/30 rounded-xl p-8 text-center mt-8 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-[#f87272]/20 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#f87272]" />
              </div>
              <h2 className="text-2xl font-bold text-base-content mb-2">{t('predictions.limitReached')}</h2>
              <a href="#/pricing" className="btn bg-primary hover:brightness-90 text-primary-content mt-6 border-none font-bold">
                {t('predictions.upgradeToUnlock')}
              </a>
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-content'
                        : 'bg-base-100 text-secondary hover:text-base-content border border-secondary/20'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* Probability Chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-bold text-base-content mb-6">{t('matchDetail.matchProbabilities')}</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={probabilityData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#00F5FF" strokeOpacity={0.1} />
                          <XAxis 
                            type="number" 
                            stroke="#00F5FF" 
                            strokeOpacity={0.5}
                            tick={{ fill: '#00F5FF', fontSize: 12 }}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            stroke="#00F5FF" 
                            strokeOpacity={0.5}
                            tick={{ fill: '#FFFFFF', fontSize: 12 }}
                            width={100}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#011627', 
                              border: '1px solid rgba(143, 188, 143, 0.2)',
                              borderRadius: '8px'
                            }}
                            labelStyle={{ color: '#FFFFFF' }}
                            itemStyle={{ color: '#CCFF00' }}
                            formatter={(value: number) => [`${value}%`, t('matchDetail.probability')]}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {probabilityData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Odds Comparison */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-bold text-base-content mb-6">{t('matchDetail.oddsComparison')}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-secondary text-sm">
                            <th className="text-left py-3">{t('matchDetail.oddsType')}</th>
                            <th className="text-center py-3">{match.homeTeam}</th>
                            <th className="text-center py-3">{t('matchDetail.draw')}</th>
                            <th className="text-center py-3">{match.awayTeam}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#00F5FF]/10">
                          <tr>
                            <td className="py-4 text-base-content">{t('matchDetail.marketOdds')}</td>
                            <td className="py-4 text-center text-secondary">{match.marketOdds.home}</td>
                            <td className="py-4 text-center text-secondary">{match.marketOdds.draw}</td>
                            <td className="py-4 text-center text-secondary">{match.marketOdds.away}</td>
                          </tr>
                          <tr>
                            <td className="py-4 text-base-content">{t('matchDetail.fairOdds')}</td>
                            <td className="py-4 text-center text-primary font-bold">{match.fairOdds.home}</td>
                            <td className="py-4 text-center text-primary font-bold">{match.fairOdds.draw}</td>
                            <td className="py-4 text-center text-primary font-bold">{match.fairOdds.away}</td>
                          </tr>
                          <tr>
                            <td className="py-4 text-base-content">{t('matchDetail.value')}</td>
                            <td className="py-4 text-center">
                              <span className="px-2 py-1 bg-green-500/10 text-green-400 text-sm rounded">
                                +{((match.marketOdds.home - match.fairOdds.home) / match.fairOdds.home * 100).toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-4 text-center">
                              <span className="px-2 py-1 bg-secondary/10 text-secondary text-sm rounded">
                                {((match.marketOdds.draw - match.fairOdds.draw) / match.fairOdds.draw * 100).toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-4 text-center">
                              <span className="px-2 py-1 bg-red-500/10 text-red-400 text-sm rounded">
                                {((match.marketOdds.away - match.fairOdds.away) / match.fairOdds.away * 100).toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </>
              )}

              {activeTab === 'analysis' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-base-content">{t('matchDetail.aiAnalysis')}</h3>
                      <p className="text-secondary text-sm">{t('matchDetail.mlInsights')}</p>
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-secondary font-sans text-sm leading-relaxed bg-base-200 rounded-lg p-4">
                      {reasoning}
                    </pre>
                  </div>
                </motion.div>
              )}

              {activeTab === 'h2h' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-base-content mb-6">{t('matchDetail.h2hRecord')}</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-base-200 rounded-xl">
                      <p className="text-3xl font-bold text-primary">{match.h2h.homeWins}</p>
                      <p className="text-secondary text-sm">{match.homeTeam} {t('matchDetail.wins')}</p>
                    </div>
                    <div className="text-center p-4 bg-base-200 rounded-xl">
                      <p className="text-3xl font-bold text-secondary">{match.h2h.draws}</p>
                      <p className="text-secondary text-sm">{t('matchDetail.draws')}</p>
                    </div>
                    <div className="text-center p-4 bg-base-200 rounded-xl">
                      <p className="text-3xl font-bold text-secondary/70">{match.h2h.awayWins}</p>
                      <p className="text-secondary text-sm">{match.awayTeam} {t('matchDetail.wins')}</p>
                    </div>
                  </div>
                  <p className="text-secondary text-sm text-center">
                    {t('matchDetail.basedOnLast')} {match.h2h.total} {t('matchDetail.meetings')}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Staking Recommendation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-primary/30 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-base-content">{t('matchDetail.kellyStaking')}</h3>
                </div>
                <div className="text-center py-4">
                  <p className="text-5xl font-bold text-primary mb-2">{match.kellyStake}%</p>
                  <p className="text-secondary text-sm">{t('matchDetail.recommendedStake')}</p>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">{t('matchDetail.edge')}</span>
                    <span className="text-green-400 font-medium">+{match.edge}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">{t('matchDetail.confidence')}</span>
                    <span className="text-primary font-medium">{match.confidence}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">{t('matchDetail.expectedValue')}</span>
                    <span className="text-green-400 font-medium">+{(match.edge * 0.5).toFixed(2)}%</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsTracking(!isTracking)}
                  className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all ${
                    isTracking 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-primary text-primary-content hover:brightness-90'
                  }`}
                >
                  {isTracking ? t('matchDetail.betTracked') : t('matchDetail.trackThisBet')}
                </button>
              </motion.div>

              {/* Key Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-base-content mb-4">{t('matchDetail.keyStats')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">{t('matchDetail.homeXg')}</span>
                    <span className="text-base-content font-medium">2.1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">{t('matchDetail.awayXg')}</span>
                    <span className="text-base-content font-medium">1.3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">{t('matchDetail.homeWinPercent')}</span>
                    <span className="text-primary font-medium">{match.homeProb}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">{t('matchDetail.bttsPercent')}</span>
                    <span className="text-base-content font-medium">62%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">{t('matchDetail.over25Percent')}</span>
                    <span className="text-base-content font-medium">58%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
