import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, DollarSign, Activity, 
  ChevronRight, Bell, Download,
  Trophy, Percent
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockMatches, mockBets, bankrollData } from '../data/mockData';

interface DashboardProps {
  onLogout: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Dashboard({ onLogout }: DashboardProps) {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { 
      icon: Target, 
      label: "Today's Value Bets", 
      value: '12',
      change: '+3',
      changeType: 'positive' as const,
      color: 'from-[#C9A227] to-[#d4b43a]'
    },
    { 
      icon: Percent, 
      label: 'Win Rate (7d)', 
      value: '73%',
      change: '+5%',
      changeType: 'positive' as const,
      color: 'from-[#8FBC8F] to-[#a0c9a0]'
    },
    { 
      icon: DollarSign, 
      label: 'Total Profit', 
      value: '$1,240',
      change: '+$180',
      changeType: 'positive' as const,
      color: 'from-green-500 to-green-400'
    },
    { 
      icon: Activity, 
      label: 'Active Bets', 
      value: '8',
      change: '2 pending',
      changeType: 'neutral' as const,
      color: 'from-blue-500 to-blue-400'
    },
  ];

  const recentBets = mockBets.slice(0, 5);
  const upcomingMatches = mockMatches.filter(m => m.status === 'upcoming').slice(0, 5);

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
              <h1 className="text-3xl font-bold text-[#F5F5DC]">Dashboard</h1>
              <p className="text-[#8FBC8F] mt-1">Welcome back! Here's your betting overview.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-[#0D2818] border border-[#8FBC8F]/20 text-[#8FBC8F] hover:border-[#C9A227]/40 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-[#0D2818] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] text-sm focus:outline-none focus:border-[#C9A227]/50"
              >
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] text-[#0D2818] font-semibold rounded-lg hover:bg-[#d4b43a] transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6 hover:border-[#C9A227]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-[#0D2818]" />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-400' : 
                    stat.changeType === 'negative' ? 'text-red-400' : 'text-[#8FBC8F]'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-[#F5F5DC] mb-1">{stat.value}</p>
                <p className="text-[#8FBC8F] text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Bankroll Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#F5F5DC]">Bankroll Growth</h2>
                  <p className="text-[#8FBC8F] text-sm">Track your betting performance over time</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full">+124%</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bankrollData}>
                    <defs>
                      <linearGradient id="bankrollGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C9A227" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#C9A227" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
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
                      formatter={(value: number) => [`$${value}`, 'Bankroll']}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#C9A227"
                      strokeWidth={2}
                      fill="url(#bankrollGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#F5F5DC] mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#8FBC8F]">ROI</span>
                      <span className="text-[#C9A227] font-bold">+24.3%</span>
                    </div>
                    <div className="h-2 bg-[#0a1f12] rounded-full overflow-hidden">
                      <div className="h-full w-[73%] bg-gradient-to-r from-[#C9A227] to-[#d4b43a] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#8FBC8F]">Win Rate</span>
                      <span className="text-[#C9A227] font-bold">73%</span>
                    </div>
                    <div className="h-2 bg-[#0a1f12] rounded-full overflow-hidden">
                      <div className="h-full w-[73%] bg-gradient-to-r from-[#8FBC8F] to-[#a0c9a0] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#8FBC8F]">Average Edge</span>
                      <span className="text-[#C9A227] font-bold">8.5%</span>
                    </div>
                    <div className="h-2 bg-[#0a1f12] rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#F5F5DC] mb-4">Subscription</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#C9A227]/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <div>
                    <p className="text-[#F5F5DC] font-semibold">Pro Plan</p>
                    <p className="text-[#8FBC8F] text-sm">Renews in 12 days</p>
                  </div>
                </div>
                <a 
                  href="#/profile"
                  className="mt-4 block w-full py-2 text-center border border-[#8FBC8F]/20 text-[#8FBC8F] rounded-lg hover:border-[#C9A227] hover:text-[#C9A227] transition-colors text-sm"
                >
                  Manage Subscription
                </a>
              </div>
            </motion.div>
          </div>

          {/* Tables Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Upcoming Matches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-[#8FBC8F]/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#F5F5DC]">Today's Value Bets</h2>
                  <a href="#/predictions" className="text-[#C9A227] text-sm hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="divide-y divide-[#8FBC8F]/10">
                {upcomingMatches.map((match) => (
                  <a
                    key={match.id}
                    href={`#/match/${match.id}`}
                    className="flex items-center justify-between p-4 hover:bg-[#0a1f12] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center w-16">
                        <p className="text-[#8FBC8F] text-xs">{match.league}</p>
                        <p className="text-[#C9A227] text-sm font-medium">{match.kickoff}</p>
                      </div>
                      <div>
                        <p className="text-[#F5F5DC] font-medium">{match.homeTeam} vs {match.awayTeam}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-[#C9A227]/10 text-[#C9A227] text-xs rounded">
                            {match.prediction}
                          </span>
                          <span className="text-[#8FBC8F] text-xs">{match.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded-full">
                        +{match.edge}%
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Recent Bets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-[#8FBC8F]/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#F5F5DC]">Recent Bets</h2>
                  <a href="#/bets" className="text-[#C9A227] text-sm hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="divide-y divide-[#8FBC8F]/10">
                {recentBets.map((bet) => (
                  <div
                    key={bet.id}
                    className="flex items-center justify-between p-4 hover:bg-[#0a1f12] transition-colors"
                  >
                    <div>
                      <p className="text-[#F5F5DC] font-medium">{bet.match}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#8FBC8F] text-sm">{bet.selection}</span>
                        <span className="text-[#8FBC8F]/50">•</span>
                        <span className="text-[#8FBC8F] text-sm">@{bet.odds}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        bet.result === 'win' ? 'bg-green-500/10 text-green-400' :
                        bet.result === 'loss' ? 'bg-red-500/10 text-red-400' :
                        'bg-[#8FBC8F]/10 text-[#8FBC8F]'
                      }`}>
                        {bet.result === 'win' ? `+$${bet.profit}` :
                         bet.result === 'loss' ? `-$${bet.stake}` :
                         'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
