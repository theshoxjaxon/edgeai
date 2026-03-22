import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Target, Clock,
  BarChart3, History, Brain, Star,
  Share2, Bell, Check, X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { mockMatches, aiReasoning } from '../data/mockData';

interface MatchDetailProps {
  matchId: string;
  onLogout: () => void;
}

export function MatchDetail({ matchId, onLogout }: MatchDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isTracking, setIsTracking] = useState(false);
  
  const match = mockMatches.find(m => m.id === matchId) || mockMatches[0];
  const reasoning = aiReasoning[matchId as keyof typeof aiReasoning] || aiReasoning['1'];

  const probabilityData = [
    { name: match.homeTeam, value: match.homeProb, color: '#C9A227' },
    { name: 'Draw', value: match.drawProb, color: '#8FBC8F' },
    { name: match.awayTeam, value: match.awayProb, color: '#8FBC8F80' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'analysis', label: 'AI Analysis', icon: Brain },
    { id: 'h2h', label: 'H2H', icon: History },
  ];

  return (
    <div className="min-h-screen bg-[#05140A] pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.a
            href="#/predictions"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 text-[#8FBC8F] hover:text-[#C9A227] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Predictions
          </motion.a>

          {/* Match Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-2xl p-6 lg:p-8 mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Teams */}
              <div className="flex items-center justify-center lg:justify-start gap-6 lg:gap-12">
                <div className="text-center">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#C9A227]/20 to-[#8FBC8F]/20 border-2 border-[#C9A227]/30 flex items-center justify-center mb-3">
                    <span className="text-[#F5F5DC] font-bold text-2xl lg:text-3xl">
                      {match.homeTeam.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[#F5F5DC] font-semibold text-lg">{match.homeTeam}</p>
                  <div className="flex justify-center gap-1 mt-2">
                    {match.recentForm.home.map((result, i) => (
                      <span
                        key={i}
                        className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${
                          result === 'W' ? 'bg-green-500/20 text-green-400' :
                          result === 'D' ? 'bg-[#8FBC8F]/20 text-[#8FBC8F]' :
                          'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[#8FBC8F] text-sm mb-2">{match.league}</p>
                  <div className="flex items-center gap-2 text-[#C9A227]">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">{match.kickoff}</span>
                  </div>
                  <p className="text-[#8FBC8F] text-xs mt-2">Today</p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#8FBC8F]/20 to-[#8FBC8F]/10 border-2 border-[#8FBC8F]/30 flex items-center justify-center mb-3">
                    <span className="text-[#F5F5DC] font-bold text-2xl lg:text-3xl">
                      {match.awayTeam.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[#F5F5DC] font-semibold text-lg">{match.awayTeam}</p>
                  <div className="flex justify-center gap-1 mt-2">
                    {match.recentForm.away.map((result, i) => (
                      <span
                        key={i}
                        className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${
                          result === 'W' ? 'bg-green-500/20 text-green-400' :
                          result === 'D' ? 'bg-[#8FBC8F]/20 text-[#8FBC8F]' :
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
                <div className="text-center px-4 py-3 bg-[#0a1f12] rounded-xl">
                  <p className="text-[#8FBC8F] text-xs mb-1">AI Prediction</p>
                  <p className="text-[#C9A227] font-bold">{match.prediction}</p>
                </div>
                <div className="text-center px-4 py-3 bg-[#0a1f12] rounded-xl">
                  <p className="text-[#8FBC8F] text-xs mb-1">Edge</p>
                  <p className="text-green-400 font-bold">+{match.edge}%</p>
                </div>
                <div className="text-center px-4 py-3 bg-[#0a1f12] rounded-xl">
                  <p className="text-[#8FBC8F] text-xs mb-1">Kelly Stake</p>
                  <p className="text-[#F5F5DC] font-bold">{match.kellyStake}%</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-3 mt-6 pt-6 border-t border-[#8FBC8F]/10">
              <button 
                onClick={() => setIsTracking(!isTracking)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  isTracking 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] hover:bg-[#C9A227]/20'
                }`}
              >
                {isTracking ? <Check className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                {isTracking ? 'Tracking' : 'Track Bet'}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 text-[#8FBC8F] rounded-lg hover:border-[#C9A227]/40 transition-colors">
                <Bell className="w-4 h-4" />
                Set Alert
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 text-[#8FBC8F] rounded-lg hover:border-[#C9A227]/40 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#C9A227] text-[#0D2818]'
                    : 'bg-[#0D2818] text-[#8FBC8F] hover:text-[#F5F5DC] border border-[#8FBC8F]/20'
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
                    className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-bold text-[#F5F5DC] mb-6">Match Probabilities</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={probabilityData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#8FBC8F" strokeOpacity={0.1} />
                          <XAxis 
                            type="number" 
                            stroke="#8FBC8F" 
                            strokeOpacity={0.5}
                            tick={{ fill: '#8FBC8F', fontSize: 12 }}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            stroke="#8FBC8F" 
                            strokeOpacity={0.5}
                            tick={{ fill: '#F5F5DC', fontSize: 12 }}
                            width={100}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#0D2818', 
                              border: '1px solid rgba(143, 188, 143, 0.2)',
                              borderRadius: '8px'
                            }}
                            labelStyle={{ color: '#F5F5DC' }}
                            itemStyle={{ color: '#C9A227' }}
                            formatter={(value: number) => [`${value}%`, 'Probability']}
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
                    className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-bold text-[#F5F5DC] mb-6">Odds Comparison</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-[#8FBC8F] text-sm">
                            <th className="text-left py-3">Odds Type</th>
                            <th className="text-center py-3">{match.homeTeam}</th>
                            <th className="text-center py-3">Draw</th>
                            <th className="text-center py-3">{match.awayTeam}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#8FBC8F]/10">
                          <tr>
                            <td className="py-4 text-[#F5F5DC]">Market Odds</td>
                            <td className="py-4 text-center text-[#8FBC8F]">{match.marketOdds.home}</td>
                            <td className="py-4 text-center text-[#8FBC8F]">{match.marketOdds.draw}</td>
                            <td className="py-4 text-center text-[#8FBC8F]">{match.marketOdds.away}</td>
                          </tr>
                          <tr>
                            <td className="py-4 text-[#F5F5DC]">Fair Odds (AI)</td>
                            <td className="py-4 text-center text-[#C9A227] font-bold">{match.fairOdds.home}</td>
                            <td className="py-4 text-center text-[#C9A227] font-bold">{match.fairOdds.draw}</td>
                            <td className="py-4 text-center text-[#C9A227] font-bold">{match.fairOdds.away}</td>
                          </tr>
                          <tr>
                            <td className="py-4 text-[#F5F5DC]">Value</td>
                            <td className="py-4 text-center">
                              <span className="px-2 py-1 bg-green-500/10 text-green-400 text-sm rounded">
                                +{((match.marketOdds.home - match.fairOdds.home) / match.fairOdds.home * 100).toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-4 text-center">
                              <span className="px-2 py-1 bg-[#8FBC8F]/10 text-[#8FBC8F] text-sm rounded">
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
                  className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A227]/20 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-[#C9A227]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#F5F5DC]">AI Analysis</h3>
                      <p className="text-[#8FBC8F] text-sm">Machine learning insights</p>
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-[#8FBC8F] font-sans text-sm leading-relaxed bg-[#0a1f12] rounded-lg p-4">
                      {reasoning}
                    </pre>
                  </div>
                </motion.div>
              )}

              {activeTab === 'h2h' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-[#F5F5DC] mb-6">Head-to-Head Record</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-[#0a1f12] rounded-xl">
                      <p className="text-3xl font-bold text-[#C9A227]">{match.h2h.homeWins}</p>
                      <p className="text-[#8FBC8F] text-sm">{match.homeTeam} Wins</p>
                    </div>
                    <div className="text-center p-4 bg-[#0a1f12] rounded-xl">
                      <p className="text-3xl font-bold text-[#8FBC8F]">{match.h2h.draws}</p>
                      <p className="text-[#8FBC8F] text-sm">Draws</p>
                    </div>
                    <div className="text-center p-4 bg-[#0a1f12] rounded-xl">
                      <p className="text-3xl font-bold text-[#8FBC8F]/70">{match.h2h.awayWins}</p>
                      <p className="text-[#8FBC8F] text-sm">{match.awayTeam} Wins</p>
                    </div>
                  </div>
                  <p className="text-[#8FBC8F] text-sm text-center">
                    Based on last {match.h2h.total} meetings
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
                className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#C9A227]/30 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-5 h-5 text-[#C9A227]" />
                  <h3 className="text-lg font-bold text-[#F5F5DC]">Kelly Staking</h3>
                </div>
                <div className="text-center py-4">
                  <p className="text-5xl font-bold text-[#C9A227] mb-2">{match.kellyStake}%</p>
                  <p className="text-[#8FBC8F] text-sm">Recommended stake</p>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8FBC8F]">Edge</span>
                    <span className="text-green-400 font-medium">+{match.edge}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8FBC8F]">Confidence</span>
                    <span className="text-[#C9A227] font-medium">{match.confidence}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8FBC8F]">Expected Value</span>
                    <span className="text-green-400 font-medium">+{(match.edge * 0.5).toFixed(2)}%</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsTracking(!isTracking)}
                  className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all ${
                    isTracking 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-[#C9A227] text-[#0D2818] hover:bg-[#d4b43a]'
                  }`}
                >
                  {isTracking ? 'Bet Tracked' : 'Track This Bet'}
                </button>
              </motion.div>

              {/* Key Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-[#F5F5DC] mb-4">Key Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8FBC8F]">Home xG</span>
                    <span className="text-[#F5F5DC] font-medium">2.1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8FBC8F]">Away xG</span>
                    <span className="text-[#F5F5DC] font-medium">1.3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8FBC8F]">Home Win %</span>
                    <span className="text-[#C9A227] font-medium">{match.homeProb}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8FBC8F]">BTTS %</span>
                    <span className="text-[#F5F5DC] font-medium">62%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8FBC8F]">Over 2.5 %</span>
                    <span className="text-[#F5F5DC] font-medium">58%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
