import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Download, ChevronDown, 
  TrendingUp, Target, Star, Bell
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useTranslation } from 'react-i18next';

interface PredictionsProps {
  userTier: 'free' | 'pro';
  onLogout: () => void;
}

export function Predictions({ userTier }: PredictionsProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [minEdge, setMinEdge] = useState(0);
  const [sortBy, setSortBy] = useState('edge');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const leagues = ['all', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'];

  const { data: allMatches = [], isLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: api.getUpcomingMatches
  });

  if (isLoading) {
    return <div className="min-h-screen bg-base-100 pt-20 flex items-center justify-center text-primary">{t('predictions.loading')}</div>;
  }

  // Filter and sort matches
  const topLeagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'];
  
  const filteredMatches = allMatches
    .filter(match => {
      const matchesSearch = 
        match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.league.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLeague = selectedLeague === 'all' || match.league === selectedLeague;
      const matchesEdge = match.edge >= minEdge;
      const matchesTier = userTier === 'pro' || topLeagues.includes(match.league);
      return matchesSearch && matchesLeague && matchesEdge && matchesTier;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a] as number;
      const bValue = b[sortBy as keyof typeof b] as number;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const exportToCSV = () => {
    const headers = ['Match', 'League', 'Kickoff', 'Prediction', 'Confidence', 'Edge', 'Kelly Stake'];
    const rows = filteredMatches.map(m => [
      `${m.homeTeam} vs ${m.awayTeam}`,
      m.league,
      m.kickoff,
      m.prediction,
      `${m.confidence}%`,
      `${m.edge}%`,
      `${m.kellyStake}%`
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'predictions.csv';
    a.click();
  };

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
              <h1 className="text-3xl font-bold text-base-content">{t('predictions.title')}</h1>
              <p className="text-secondary mt-1">{t('predictions.desc')}</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-base-100 border border-secondary/20 text-secondary rounded-lg hover:border-primary/40 transition-colors"
              >
                <Download className="w-4 h-4" />
                {t('predictions.exportCSV')}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-content font-semibold rounded-lg hover:brightness-90 transition-colors">
                <Bell className="w-4 h-4" />
                {t('predictions.setAlerts')}
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-4 mb-6"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('predictions.searchPlaceholder')}
                  className="w-full pl-12 pr-4 py-3 bg-base-200 border border-secondary/20 rounded-lg text-base-content placeholder-secondary/50 focus:outline-none focus:border-primary/50"
                />
              </div>

              {/* League Filter */}
              <div className="relative">
                <select
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-base-200 border border-secondary/20 rounded-lg text-base-content focus:outline-none focus:border-primary/50 min-w-[160px]"
                >
                  {leagues.map(league => (
                    <option key={league} value={league}>
                      {league === 'all' ? t('predictions.allLeagues') : league}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
              </div>

              {/* Edge Filter */}
              <div className="relative">
                <select
                  value={minEdge}
                  onChange={(e) => setMinEdge(Number(e.target.value))}
                  className="appearance-none px-4 py-3 pr-10 bg-base-200 border border-secondary/20 rounded-lg text-base-content focus:outline-none focus:border-primary/50 min-w-[140px]"
                >
                  <option value={0}>{t('predictions.minEdgeAny')}</option>
                  <option value={5}>{t('predictions.minEdge5')}</option>
                  <option value={8}>{t('predictions.minEdge8')}</option>
                  <option value={10}>{t('predictions.minEdge10')}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
              </div>

              {/* Filter Toggle */}
              <button
                className="flex items-center gap-2 px-4 py-3 border border-secondary/20 text-secondary rounded-lg hover:border-primary/40 transition-colors"
              >
                <Filter className="w-4 h-4" />
                {t('predictions.filters')}
              </button>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-secondary">
              {t('predictions.showing')} <span className="text-base-content font-semibold">{filteredMatches.length}</span> {t('predictions.predictionsCount')}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-secondary text-sm">{t('predictions.sortBy')}</span>
              <button
                onClick={() => handleSort('edge')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === 'edge' ? 'bg-primary/20 text-primary' : 'text-secondary hover:text-base-content'
                }`}
              >
                {t('predictions.edge')} {sortBy === 'edge' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
              <button
                onClick={() => handleSort('confidence')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === 'confidence' ? 'bg-primary/20 text-primary' : 'text-secondary hover:text-base-content'
                }`}
              >
                {t('predictions.confidence')} {sortBy === 'confidence' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
            </div>
          </div>

          {/* Predictions Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl overflow-hidden"
          >
            {/* Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 p-4 border-b border-secondary/10 bg-base-200/50 text-secondary text-sm font-medium">
              <div className="col-span-4">{t('predictions.match')}</div>
              <div className="col-span-2">{t('predictions.prediction')}</div>
              <div className="col-span-2">{t('predictions.probabilities')}</div>
              <div className="col-span-1 text-center">{t('predictions.edge')}</div>
              <div className="col-span-1 text-center">{t('predictions.kelly')}</div>
              <div className="col-span-2 text-right">{t('predictions.action')}</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#00F5FF]/10">
              {filteredMatches.map((match, index) => (
                <motion.a
                  key={match.id}
                  href={`#/match/${match.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="block lg:grid lg:grid-cols-12 gap-4 p-4 hover:bg-base-200 transition-colors items-center"
                >
                  {/* Match Info */}
                  <div className="lg:col-span-4 mb-4 lg:mb-0">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-10 h-10 rounded-full bg-base-200 border-2 border-[#011627] flex items-center justify-center">
                          <span className="text-base-content font-bold text-xs">
                            {match.homeTeam.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-base-200 border-2 border-[#011627] flex items-center justify-center">
                          <span className="text-base-content font-bold text-xs">
                            {match.awayTeam.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-base-content font-medium">
                          {match.homeTeam} <span className="text-secondary">{t('predictions.vs')}</span> {match.awayTeam}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-secondary text-xs">{match.league}</span>
                          <span className="text-secondary/50">•</span>
                          <span className="text-primary text-xs">{match.kickoff}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prediction */}
                  <div className="lg:col-span-2 mb-4 lg:mb-0">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      <Target className="w-4 h-4" />
                      {match.prediction}
                    </span>
                    <p className="text-secondary text-xs mt-1">{match.confidence}% confidence</p>
                  </div>

                  {/* Probabilities */}
                  <div className="lg:col-span-2 mb-4 lg:mb-0">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex-1">
                        <div className="h-2 bg-base-200 rounded-full overflow-hidden flex">
                          <div className="h-full bg-primary" style={{ width: `${match.homeProb}%` }} />
                          <div className="h-full bg-secondary" style={{ width: `${match.drawProb}%` }} />
                          <div className="h-full bg-secondary/50" style={{ width: `${match.awayProb}%` }} />
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-primary">H {match.homeProb}%</span>
                          <span className="text-secondary">D {match.drawProb}%</span>
                          <span className="text-secondary/70">A {match.awayProb}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Edge */}
                  <div className="lg:col-span-1 text-center mb-4 lg:mb-0">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-bold">
                      <TrendingUp className="w-3 h-3" />
                      +{match.edge}%
                    </span>
                  </div>

                  {/* Kelly Stake */}
                  <div className="lg:col-span-1 text-center mb-4 lg:mb-0">
                    <span className="text-base-content font-bold">{match.kellyStake}%</span>
                    <p className="text-secondary text-xs">{t('predictions.ofBankroll')}</p>
                  </div>

                  {/* Action */}
                  <div className="lg:col-span-2 text-right">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm">
                      <Star className="w-4 h-4" />
                      {t('predictions.trackBet')}
                    </button>
                  </div>
                </motion.a>
              ))}
            </div>

            {filteredMatches.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-base-content font-semibold mb-2">{t('predictions.noFound')}</h3>
                <p className="text-secondary">{t('predictions.adjustFilters')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
