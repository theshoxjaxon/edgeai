import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Users, Activity, Settings, 
  RefreshCw, CheckCircle2, AlertCircle, TrendingUp
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AdminProps {
  onLogout: () => void;
}

export function Admin({ onLogout }: AdminProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  const systemStats = [
    { label: t('admin.activeUsers'), value: '12,450', change: '+12%', icon: Users, color: 'text-blue-400' },
    { label: t('admin.uptime'), value: '99.9%', change: '+0.1%', icon: Activity, color: 'text-green-400' },
    { label: t('admin.dataSources'), value: '8/8', change: t('admin.allHealthy'), icon: Database, color: 'text-primary' },
    { label: t('admin.predictionsGen'), value: '14,204', change: '+5%', icon: TrendingUp, color: 'text-purple-400' },
  ];

  const recentLogs = [
    { id: 1, type: 'info', message: 'Data sync completed: Premier League', time: '2 mins ago' },
    { id: 2, type: 'info', message: 'Data sync completed: La Liga', time: '5 mins ago' },
    { id: 3, type: 'warning', message: 'API rate limit warning: Bet365 odds endpoint', time: '15 mins ago' },
    { id: 4, type: 'error', message: 'Failed to fetch injury data: Serie A', time: '1 hour ago' },
    { id: 5, type: 'info', message: 'Model retrained successfully. New params applied.', time: '3 hours ago' },
  ];

  const tabs = [
    { id: 'overview', label: t('admin.sysOverview') },
    { id: 'leagues', label: t('admin.manageLeagues') },
    { id: 'sources', label: t('admin.dataSources') },
  ];

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
              <h1 className="text-3xl font-bold text-base-content">{t('admin.title')}</h1>
              <p className="text-secondary mt-1">{t('admin.desc')}</p>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-secondary/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-6 whitespace-nowrap font-medium transition-colors border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-secondary hover:text-base-content'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {activeTab === 'overview' && (
              <>
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {systemStats.map((stat, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 p-6 rounded-xl"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                          <span className="text-secondary text-xs font-semibold px-2 py-1 bg-secondary/10 rounded-full">{stat.change}</span>
                        </div>
                        <p className="text-3xl font-bold text-base-content mb-1">{stat.value}</p>
                        <p className="text-secondary text-sm">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Settings Mock */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-base-content">{t('admin.sysSettings')}</h2>
                      <button className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20">
                        <Settings className="w-4 h-4" /> {t('admin.editConfig')}
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between p-4 bg-base-200 rounded-lg">
                        <div>
                          <p className="text-base-content font-medium">Model Retraining Interval</p>
                          <p className="text-secondary text-sm">How often the predictive models fetch latest data.</p>
                        </div>
                        <span className="text-primary font-semibold">Every 12h</span>
                      </div>
                      <div className="flex justify-between p-4 bg-base-200 rounded-lg">
                        <div>
                          <p className="text-base-content font-medium">Minimum Edge Threshold</p>
                          <p className="text-secondary text-sm">Minimum difference vs market to flag as "Value Bet"</p>
                        </div>
                        <span className="text-primary font-semibold">3.0%</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="lg:col-span-1 border border-secondary/10 bg-gradient-to-br from-[#011627] to-[#0A2A3A] rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-base-content">{t('admin.sysLogs')}</h2>
                    <button className="text-secondary hover:text-primary">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentLogs.map((log) => (
                      <div key={log.id} className="p-3 bg-base-200 rounded-lg border-l-4 border-transparent" style={{ borderLeftColor: log.type === 'info' ? '#3b82f6' : log.type === 'warning' ? '#f59e0b' : '#ef4444' }}>
                        <div className="flex gap-3">
                          {log.type === 'info' && <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5" />}
                          {log.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />}
                          {log.type === 'error' && <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />}
                          <div>
                            <p className="text-base-content text-sm font-medium">{log.message}</p>
                            <p className="text-secondary text-xs mt-1">{log.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-2 text-primary text-sm border border-primary/30 rounded-lg hover:bg-primary/10">
                    {t('admin.viewAllLogs')}
                  </button>
                </div>
              </>
            )}

            {/* Other tabs can be empty structural mocks */}
            {activeTab !== 'overview' && (
              <div className="lg:col-span-3 text-center py-20 bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl">
                 <Database className="w-12 h-12 text-secondary/50 mx-auto mb-4" />
                 <h2 className="text-xl font-bold text-base-content">{activeTab === 'leagues' ? 'Manage Leagues and Teams' : 'Data Source Integrations'}</h2>
                 <p className="text-secondary max-w-md mx-auto mt-2">This module is part of the Enterprise administration panel. Full management tools will load here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
