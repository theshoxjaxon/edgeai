import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Download, ChevronDown, 
  TrendingUp, Target, Star, Bell
} from 'lucide-react';
import { mockMatches } from '../data/mockData';

interface PredictionsProps {
  onLogout: () => void;
}

export function Predictions({ onLogout }: PredictionsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [minEdge, setMinEdge] = useState(0);
  const [sortBy, setSortBy] = useState('edge');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const leagues = ['all', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'];

  // Filter and sort matches
  const filteredMatches = mockMatches
    .filter(match => {
      const matchesSearch = 
        match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.league.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLeague = selectedLeague === 'all' || match.league === selectedLeague;
      const matchesEdge = match.edge >= minEdge;
      return matchesSearch && matchesLeague && matchesEdge;
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
              <h1 className="text-3xl font-bold text-[#F5F5DC]">Predictions</h1>
              <p className="text-[#8FBC8F] mt-1">AI-powered match analysis and value bets</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-[#0D2818] border border-[#8FBC8F]/20 text-[#8FBC8F] rounded-lg hover:border-[#C9A227]/40 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] text-[#0D2818] font-semibold rounded-lg hover:bg-[#d4b43a] transition-colors">
                <Bell className="w-4 h-4" />
                Set Alerts
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-4 mb-6"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8FBC8F]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search teams, leagues..."
                  className="w-full pl-12 pr-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] placeholder-[#8FBC8F]/50 focus:outline-none focus:border-[#C9A227]/50"
                />
              </div>

              {/* League Filter */}
              <div className="relative">
                <select
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] focus:outline-none focus:border-[#C9A227]/50 min-w-[160px]"
                >
                  {leagues.map(league => (
                    <option key={league} value={league}>
                      {league === 'all' ? 'All Leagues' : league}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FBC8F] pointer-events-none" />
              </div>

              {/* Edge Filter */}
              <div className="relative">
                <select
                  value={minEdge}
                  onChange={(e) => setMinEdge(Number(e.target.value))}
                  className="appearance-none px-4 py-3 pr-10 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] focus:outline-none focus:border-[#C9A227]/50 min-w-[140px]"
                >
                  <option value={0}>Min Edge: Any</option>
                  <option value={5}>Min Edge: 5%+</option>
                  <option value={8}>Min Edge: 8%+</option>
                  <option value={10}>Min Edge: 10%+</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FBC8F] pointer-events-none" />
              </div>

              {/* Filter Toggle */}
              <button
                className="flex items-center gap-2 px-4 py-3 border border-[#8FBC8F]/20 text-[#8FBC8F] rounded-lg hover:border-[#C9A227]/40 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#8FBC8F]">
              Showing <span className="text-[#F5F5DC] font-semibold">{filteredMatches.length}</span> predictions
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[#8FBC8F] text-sm">Sort by:</span>
              <button
                onClick={() => handleSort('edge')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === 'edge' ? 'bg-[#C9A227]/20 text-[#C9A227]' : 'text-[#8FBC8F] hover:text-[#F5F5DC]'
                }`}
              >
                Edge {sortBy === 'edge' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
              <button
                onClick={() => handleSort('confidence')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === 'confidence' ? 'bg-[#C9A227]/20 text-[#C9A227]' : 'text-[#8FBC8F] hover:text-[#F5F5DC]'
                }`}
              >
                Confidence {sortBy === 'confidence' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
            </div>
          </div>

          {/* Predictions Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl overflow-hidden"
          >
            {/* Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 p-4 border-b border-[#8FBC8F]/10 bg-[#0a1f12]/50 text-[#8FBC8F] text-sm font-medium">
              <div className="col-span-4">Match</div>
              <div className="col-span-2">Prediction</div>
              <div className="col-span-2">Probabilities</div>
              <div className="col-span-1 text-center">Edge</div>
              <div className="col-span-1 text-center">Kelly</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#8FBC8F]/10">
              {filteredMatches.map((match, index) => (
                <motion.a
                  key={match.id}
                  href={`#/match/${match.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="block lg:grid lg:grid-cols-12 gap-4 p-4 hover:bg-[#0a1f12] transition-colors items-center"
                >
                  {/* Match Info */}
                  <div className="lg:col-span-4 mb-4 lg:mb-0">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-10 h-10 rounded-full bg-[#0a1f12] border-2 border-[#0D2818] flex items-center justify-center">
                          <span className="text-[#F5F5DC] font-bold text-xs">
                            {match.homeTeam.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#0a1f12] border-2 border-[#0D2818] flex items-center justify-center">
                          <span className="text-[#F5F5DC] font-bold text-xs">
                            {match.awayTeam.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[#F5F5DC] font-medium">
                          {match.homeTeam} <span className="text-[#8FBC8F]">vs</span> {match.awayTeam}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[#8FBC8F] text-xs">{match.league}</span>
                          <span className="text-[#8FBC8F]/50">•</span>
                          <span className="text-[#C9A227] text-xs">{match.kickoff}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prediction */}
                  <div className="lg:col-span-2 mb-4 lg:mb-0">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#C9A227]/10 text-[#C9A227] rounded-full text-sm font-medium">
                      <Target className="w-4 h-4" />
                      {match.prediction}
                    </span>
                    <p className="text-[#8FBC8F] text-xs mt-1">{match.confidence}% confidence</p>
                  </div>

                  {/* Probabilities */}
                  <div className="lg:col-span-2 mb-4 lg:mb-0">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex-1">
                        <div className="h-2 bg-[#0a1f12] rounded-full overflow-hidden flex">
                          <div className="h-full bg-[#C9A227]" style={{ width: `${match.homeProb}%` }} />
                          <div className="h-full bg-[#8FBC8F]" style={{ width: `${match.drawProb}%` }} />
                          <div className="h-full bg-[#8FBC8F]/50" style={{ width: `${match.awayProb}%` }} />
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-[#C9A227]">H {match.homeProb}%</span>
                          <span className="text-[#8FBC8F]">D {match.drawProb}%</span>
                          <span className="text-[#8FBC8F]/70">A {match.awayProb}%</span>
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
                    <span className="text-[#F5F5DC] font-bold">{match.kellyStake}%</span>
                    <p className="text-[#8FBC8F] text-xs">of bankroll</p>
                  </div>

                  {/* Action */}
                  <div className="lg:col-span-2 text-right">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] rounded-lg hover:bg-[#C9A227]/20 transition-colors text-sm">
                      <Star className="w-4 h-4" />
                      Track Bet
                    </button>
                  </div>
                </motion.a>
              ))}
            </div>

            {filteredMatches.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#8FBC8F]/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#8FBC8F]" />
                </div>
                <h3 className="text-[#F5F5DC] font-semibold mb-2">No predictions found</h3>
                <p className="text-[#8FBC8F]">Try adjusting your filters</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
