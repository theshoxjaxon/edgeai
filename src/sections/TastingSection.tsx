import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Target, Shield, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { performanceConfig } from '../config';

const chartData = [
  { month: 'Jan', bankroll: 1000, bets: 0 },
  { month: 'Feb', bankroll: 1180, bets: 45 },
  { month: 'Mar', bankroll: 1350, bets: 92 },
  { month: 'Apr', bankroll: 1620, bets: 148 },
  { month: 'May', bankroll: 1890, bets: 201 },
  { month: 'Jun', bankroll: 2240, bets: 267 },
];

const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'trending': return TrendingUp;
    case 'target': return Target;
    case 'shield': return Shield;
    case 'zap': return Zap;
    default: return TrendingUp;
  }
};

export function TastingSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#011627]"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#CCFF00]/5 rounded-full blur-3xl" />
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
              {performanceConfig.label}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {performanceConfig.heading.map((line, i) => (
                <span key={i} className="text-[#FFFFFF] block">{line}</span>
              ))}
              <span className="text-[#CCFF00] block">{performanceConfig.headingAccent}</span>
            </h2>
            <p className="text-[#00F5FF] text-lg max-w-2xl mx-auto mt-6">
              {performanceConfig.description}
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {performanceConfig.statCards.map((card, index) => {
              const Icon = getIcon(card.iconType);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="group bg-gradient-to-br from-[#0A2A3A] to-[#011627] border border-[#00F5FF]/10 hover:border-[#CCFF00]/30 rounded-xl p-6 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center mb-4 group-hover:bg-[#CCFF00]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#CCFF00]" />
                  </div>
                  <h3 className="text-[#FFFFFF] font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-[#00F5FF] text-sm mb-4">{card.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {card.metrics.map((metric, i) => (
                      <span key={i} className="px-2 py-1 bg-[#CCFF00]/10 text-[#CCFF00] text-xs font-medium rounded">
                        {metric}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-[#0A2A3A] to-[#011627] border border-[#00F5FF]/10 rounded-2xl p-6 lg:p-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">
                  {performanceConfig.chartData.title}
                </h3>
                <p className="text-[#00F5FF] text-sm">
                  {performanceConfig.chartData.description}
                </p>
              </div>
              <div className="flex items-center gap-6 mt-4 lg:mt-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#CCFF00]" />
                  <span className="text-[#00F5FF] text-sm">Bankroll</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#00F5FF]" />
                  <span className="text-[#00F5FF] text-sm">Bets Placed</span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBankroll" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#CCFF00" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00F5FF" strokeOpacity={0.1} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#00F5FF" 
                    strokeOpacity={0.5}
                    tick={{ fill: '#00F5FF', fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="#CCFF00" 
                    strokeOpacity={0.5}
                    tick={{ fill: '#CCFF00', fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#00F5FF" 
                    strokeOpacity={0.5}
                    tick={{ fill: '#00F5FF', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#011627', 
                      border: '1px solid rgba(143, 188, 143, 0.2)',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#FFFFFF' }}
                    itemStyle={{ color: '#00F5FF' }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="bankroll"
                    stroke="#CCFF00"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorBankroll)"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="bets"
                    stroke="#00F5FF"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorBets)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#00F5FF]/10">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#CCFF00]">+124%</p>
                <p className="text-[#00F5FF] text-sm">Total Return</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#FFFFFF]">267</p>
                <p className="text-[#00F5FF] text-sm">Bets Placed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#00F5FF]">$1,240</p>
                <p className="text-[#00F5FF] text-sm">Net Profit</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
