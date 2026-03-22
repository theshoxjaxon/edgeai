import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Search, TrendingUp, 
  DollarSign, Target, Download, Check, X,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockBets, mockStats } from '../data/mockData';

interface BetTrackingProps {
  onLogout: () => void;
}

export function BetTracking({ onLogout }: BetTrackingProps) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredBets = mockBets.filter(bet => {
    const matchesSearch = bet.match.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || bet.result === filter;
    return matchesSearch && matchesFilter;
  });

  const winLossData = [
    { name: 'Wins', value: mockStats.wins, color: '#22c55e' },
    { name: 'Losses', value: mockStats.losses, color: '#ef4444' },
  ];

  const profitData = [
    { date: 'Week 1', profit: 120 },
    { date: 'Week 2', profit: 280 },
    { date: 'Week 3', profit: 150 },
    { date: 'Week 4', profit: 420 },
    { date: 'Week 5', profit: 380 },
    { date: 'Week 6', profit: 540 },
  ];

  const statsCards = [
    { label: 'Total Bets', value: mockStats.totalBets, icon: Target, color: 'from-[#C9A227] to-[#d4b43a]' },
    { label: 'Win Rate', value: `${mockStats.winRate}%`, icon: TrendingUp, color: 'from-green-500 to-green-400' },
    { label: 'ROI', value: `+${mockStats.roi}%`, icon: BarChart3, color: 'from-blue-500 to-blue-400' },
    { label: 'Total Profit', value: `$${mockStats.totalProfit}`, icon: DollarSign, color: 'from-purple-500 to-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-[#05140A] pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-[#F5F5DC]">Bet Tracking</h1>
              <p className="text-[#8FBC8F] mt-1">Monitor your betting performance</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] text-[#0D2818] font-semibold rounded-lg hover:bg-[#d4b43a] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Bet
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#0D2818] border border-[#8FBC8F]/20 text-[#8FBC8F] rounded-lg hover:border-[#C9A227]/40 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {statsCards.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6 hover:border-[#C9A227]/30 transition-all"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-[#0D2818]" />
                </div>
                <p className="text-3xl font-bold text-[#F5F5DC]">{stat.value}</p>
                <p className="text-[#8FBC8F] text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Charts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-6 mb-8"
          >
            {/* Profit Chart */}
            <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#F5F5DC] mb-6">Profit Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profitData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#8FBC8F" strokeOpacity={0.1} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#8FBC8F" 
                      strokeOpacity={0.5}
                      tick={{ fill: '#8FBC8F', fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#C9A227" 
                      strokeOpacity={0.5}
                      tick={{ fill: '#C9A227', fontSize: 12 }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D2818', 
                        border: '1px solid rgba(143, 188, 143, 0.2)',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#F5F5DC' }}
                      itemStyle={{ color: '#C9A227' }}
                      formatter={(value: number) => [`$${value}`, 'Profit']}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#C9A227"
                      strokeWidth={2}
                      dot={{ fill: '#C9A227', strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Win/Loss Distribution */}
            <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#F5F5DC] mb-6">Win/Loss Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={winLossData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {winLossData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D2818', 
                        border: '1px solid rgba(143, 188, 143, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-[#8FBC8F] text-sm">Wins ({mockStats.wins})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-[#8FBC8F] text-sm">Losses ({mockStats.losses})</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bets Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl overflow-hidden"
          >
            {/* Table Header */}
            <div className="p-4 border-b border-[#8FBC8F]/10 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FBC8F]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bets..."
                  className="w-full pl-10 pr-4 py-2 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] placeholder-[#8FBC8F]/50 focus:outline-none focus:border-[#C9A227]/50 text-sm"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] text-sm focus:outline-none focus:border-[#C9A227]/50"
              >
                <option value="all">All Bets</option>
                <option value="win">Wins</option>
                <option value="loss">Losses</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[#8FBC8F] text-sm border-b border-[#8FBC8F]/10">
                    <th className="text-left py-4 px-4">Match</th>
                    <th className="text-left py-4 px-4">Selection</th>
                    <th className="text-center py-4 px-4">Odds</th>
                    <th className="text-center py-4 px-4">Stake</th>
                    <th className="text-center py-4 px-4">Result</th>
                    <th className="text-right py-4 px-4">P/L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8FBC8F]/10">
                  {filteredBets.map((bet) => (
                    <tr key={bet.id} className="hover:bg-[#0a1f12] transition-colors">
                      <td className="py-4 px-4">
                        <p className="text-[#F5F5DC] font-medium">{bet.match}</p>
                        <p className="text-[#8FBC8F] text-xs">{bet.date}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[#8FBC8F]">{bet.selection}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-[#F5F5DC]">@{bet.odds}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-[#F5F5DC]">${bet.stake}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          bet.result === 'win' ? 'bg-green-500/10 text-green-400' :
                          bet.result === 'loss' ? 'bg-red-500/10 text-red-400' :
                          'bg-[#8FBC8F]/10 text-[#8FBC8F]'
                        }`}>
                          {bet.result === 'win' && <Check className="w-3 h-3" />}
                          {bet.result === 'loss' && <X className="w-3 h-3" />}
                          {bet.result.charAt(0).toUpperCase() + bet.result.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`font-bold ${
                          bet.result === 'win' ? 'text-green-400' :
                          bet.result === 'loss' ? 'text-red-400' :
                          'text-[#8FBC8F]'
                        }`}>
                          {bet.result === 'win' ? `+$${bet.profit}` :
                           bet.result === 'loss' ? `-$${bet.stake}` :
                           '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredBets.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#8FBC8F]/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#8FBC8F]" />
                </div>
                <h3 className="text-[#F5F5DC] font-semibold mb-2">No bets found</h3>
                <p className="text-[#8FBC8F]">Try adjusting your filters</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Add Bet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-gradient-to-br from-[#0D2818] to-[#05140A] border border-[#8FBC8F]/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#F5F5DC]">Add New Bet</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-[#8FBC8F]/10 flex items-center justify-center text-[#8FBC8F] hover:bg-[#8FBC8F]/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-[#8FBC8F] text-sm mb-2">Match</label>
                <input
                  type="text"
                  placeholder="e.g., Man City vs Liverpool"
                  className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] placeholder-[#8FBC8F]/50 focus:outline-none focus:border-[#C9A227]/50"
                />
              </div>
              <div>
                <label className="block text-[#8FBC8F] text-sm mb-2">Selection</label>
                <input
                  type="text"
                  placeholder="e.g., Man City Win"
                  className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] placeholder-[#8FBC8F]/50 focus:outline-none focus:border-[#C9A227]/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8FBC8F] text-sm mb-2">Odds</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="2.00"
                    className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] placeholder-[#8FBC8F]/50 focus:outline-none focus:border-[#C9A227]/50"
                  />
                </div>
                <div>
                  <label className="block text-[#8FBC8F] text-sm mb-2">Stake ($)</label>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] placeholder-[#8FBC8F]/50 focus:outline-none focus:border-[#C9A227]/50"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-full py-3 bg-[#C9A227] text-[#0D2818] font-bold rounded-lg hover:bg-[#d4b43a] transition-colors"
              >
                Add Bet
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
