import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, DollarSign, Activity, 
  ChevronRight, Bell, Download,
  Trophy, Percent
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useUsage } from '../hooks/useUsage';
import { useTranslation } from 'react-i18next';

interface DashboardProps {
  userTier: 'free' | 'pro';
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

export function Dashboard({ userTier, onLogout }: DashboardProps) {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('7d');
  const { remaining } = useUsage(userTier);

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const [matches, bets, statsData] = await Promise.all([
        api.getUpcomingMatches(),
        api.getBets(),
        api.getDashboardStats()
      ]);
      return { matches, bets, statsData };
    }
  });

  if (isLoading || !dashboardData) {
    return <div className="min-h-screen bg-base-100 pt-20 flex items-center justify-center text-primary">Loading...</div>;
  }

  const { matches: allMatches, bets: allBets, statsData } = dashboardData;
  const { bankroll: bankrollData } = statsData;

  const stats = [
    { 
      icon: Target, 
      label: "Today's Value Bets", 
      value: allMatches.filter(m => m.edge > 5).length.toString(),
      change: '+3',
      changeType: 'positive' as const,
      color: 'from-[#CCFF00] to-[#d4b43a]'
    },
    { 
      icon: Percent, 
      label: 'Win Rate (7d)', 
      value: `${statsData.stats.winRate}%`,
      change: '+5%',
      changeType: 'positive' as const,
      color: 'from-[#00F5FF] to-[#a0c9a0]'
    },
    { 
      icon: DollarSign, 
      label: 'Total Profit', 
      value: `$${statsData.stats.totalProfit.toLocaleString()}`,
      change: '+$180',
      changeType: 'positive' as const,
      color: 'from-green-500 to-green-400'
    },
    { 
      icon: Activity, 
      label: 'Active Bets', 
      value: allBets.filter(b => b.result === 'pending').length.toString(),
      change: '2 pending',
      changeType: 'neutral' as const,
      color: 'from-blue-500 to-blue-400'
    },
  ];

  if (userTier === 'free') {
    stats.push({
      icon: Target,
      label: t('predictions.remaining'),
      value: remaining.toString(),
      change: 'Weekly Limit',
      changeType: 'neutral' as const,
      color: 'from-[#00F5FF] to-blue-400'
    });
  }

  const recentBets = allBets.slice(0, 5);
  const upcomingMatches = allMatches.filter(m => m.status === 'upcoming').slice(0, 5);

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-base-content">{t('dashboard.title')}</h1>
              <p className="text-secondary mt-1">{t('dashboard.welcome')}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-base-100 border border-secondary/20 text-secondary hover:border-primary/40 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-base-100 border border-secondary/20 rounded-lg text-base-content text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="24h">{t('dashboard.last24h')}</option>
                <option value="7d">{t('dashboard.last7d')}</option>
                <option value="30d">{t('dashboard.last30d')}</option>
                <option value="90d">{t('dashboard.last90d')}</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-content font-semibold rounded-lg hover:brightness-90 transition-colors">
                <Download className="w-4 h-4" />
                {t('dashboard.export')}
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
                className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-primary-content" />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-400' : 
                    stat.changeType === 'negative' ? 'text-red-400' : 'text-secondary'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-base-content mb-1">{stat.value}</p>
                <p className="text-secondary text-sm">{stat.label}</p>
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
              className="lg:col-span-2 bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-base-content">{t('dashboard.bankrollGrowth')}</h2>
                  <p className="text-secondary text-sm">{t('dashboard.trackPerformance')}</p>
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
                        <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#CCFF00" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00F5FF" strokeOpacity={0.1} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#00F5FF" 
                      strokeOpacity={0.5}
                      tick={{ fill: '#00F5FF', fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#CCFF00" 
                      strokeOpacity={0.5}
                      tick={{ fill: '#CCFF00', fontSize: 12 }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#011627', 
                        border: '1px solid rgba(143, 188, 143, 0.2)',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#FFFFFF' }}
                      itemStyle={{ color: '#CCFF00' }}
                      formatter={(value: number) => [`$${value}`, 'Bankroll']}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#CCFF00"
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
              <div className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-base-content mb-4">{t('dashboard.performanceMetrics')}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-secondary">{t('dashboard.roi')}</span>
                      <span className="text-primary font-bold">+24.3%</span>
                    </div>
                    <div className="h-2 bg-base-200 rounded-full overflow-hidden">
                      <div className="h-full w-[73%] bg-gradient-to-r from-[#CCFF00] to-[#d4b43a] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-secondary">{t('dashboard.winRate')}</span>
                      <span className="text-primary font-bold">73%</span>
                    </div>
                    <div className="h-2 bg-base-200 rounded-full overflow-hidden">
                      <div className="h-full w-[73%] bg-gradient-to-r from-[#00F5FF] to-[#a0c9a0] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-secondary">{t('dashboard.avgEdge')}</span>
                      <span className="text-primary font-bold">8.5%</span>
                    </div>
                    <div className="h-2 bg-base-200 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-base-content mb-4">{t('dashboard.subscription')}</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-base-content font-semibold">Pro Plan</p>
                    <p className="text-secondary text-sm">Renews in 12 days</p>
                  </div>
                </div>
                <a 
                  href="#/profile"
                  className="mt-4 block w-full py-2 text-center border border-secondary/20 text-secondary rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
                >
                  {t('dashboard.manageSub')}
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
              className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-secondary/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-base-content">{t('dashboard.todaysBets')}</h2>
                  <a href="#/predictions" className="text-primary text-sm hover:underline flex items-center gap-1">
                    {t('dashboard.viewAll')} <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="divide-y divide-[#00F5FF]/10">
                {upcomingMatches.map((match) => (
                  <a
                    key={match.id}
                    href={`#/match/${match.id}`}
                    className="flex items-center justify-between p-4 hover:bg-base-200 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center w-16">
                        <p className="text-secondary text-xs">{match.league}</p>
                        <p className="text-primary text-sm font-medium">{match.kickoff}</p>
                      </div>
                      <div>
                        <p className="text-base-content font-medium">{match.homeTeam} vs {match.awayTeam}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                            {match.prediction}
                          </span>
                          <span className="text-secondary text-xs">{match.confidence}% confidence</span>
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
              className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-secondary/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-base-content">{t('dashboard.recentBets')}</h2>
                  <a href="#/bets" className="text-primary text-sm hover:underline flex items-center gap-1">
                    {t('dashboard.viewAll')} <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="divide-y divide-[#00F5FF]/10">
                {recentBets.map((bet) => (
                  <div
                    key={bet.id}
                    className="flex items-center justify-between p-4 hover:bg-base-200 transition-colors"
                  >
                    <div>
                      <p className="text-base-content font-medium">{bet.match}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-secondary text-sm">{bet.selection}</span>
                        <span className="text-secondary/50">•</span>
                        <span className="text-secondary text-sm">@{bet.odds}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        bet.result === 'win' ? 'bg-green-500/10 text-green-400' :
                        bet.result === 'loss' ? 'bg-red-500/10 text-red-400' :
                        'bg-secondary/10 text-secondary'
                      }`}>
                        {bet.result === 'win' ? `+$${bet.profit}` :
                         bet.result === 'loss' ? `-$${bet.stake}` :
                         t('dashboard.pending')}
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
