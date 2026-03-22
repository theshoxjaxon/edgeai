import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Bell, Shield, CreditCard, Key,
  ChevronRight, Check, AlertTriangle, Trophy,
  Smartphone, Globe, Moon, LogOut
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useTranslation } from 'react-i18next';

interface ProfileProps {
  onLogout: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    valueBets: true,
    results: true,
    newsletter: false,
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getUserProfile
  });

  if (isLoading || !profile) {
    return <div className="min-h-screen bg-base-100 pt-20 flex items-center justify-center text-primary">Loading profile...</div>;
  }

  const tabs = [
    { id: 'general', label: t('profile.general'), icon: User },
    { id: 'subscription', label: t('profile.subscription'), icon: CreditCard },
    { id: 'notifications', label: t('profile.notifications'), icon: Bell },
    { id: 'security', label: t('profile.security'), icon: Shield },
    { id: 'api', label: t('profile.api'), icon: Key },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-base-content">{t('profile.title')}</h1>
            <p className="text-secondary mt-1">{t('profile.desc')}</p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              {/* User Card */}
              <div className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#CCFF00] to-[#00F5FF] flex items-center justify-center">
                    <span className="text-primary-content font-bold text-2xl">{profile.name.split(' ').map((n: string) => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-base-content font-semibold">{profile.name}</p>
                    <p className="text-secondary text-sm">{profile.email}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-secondary/10">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="text-primary text-sm font-medium">{profile.tier} Plan</span>
                  </div>
                  <p className="text-secondary text-xs mt-1">Renews on {profile.renewalDate}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary border border-primary/30'
                        : 'text-secondary hover:bg-base-100 hover:text-base-content'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  {t('profile.logout')}
                </button>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-base-content mb-6">{t('profile.generalSettings')}</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-secondary text-sm mb-2">{t('profile.fullName')}</label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full px-4 py-3 bg-base-200 border border-secondary/20 rounded-lg text-base-content focus:outline-none focus:border-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-secondary text-sm mb-2">{t('profile.email')}</label>
                        <input
                          type="email"
                          defaultValue="john@example.com"
                          className="w-full px-4 py-3 bg-base-200 border border-secondary/20 rounded-lg text-base-content focus:outline-none focus:border-primary/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-secondary text-sm mb-2">{t('profile.phone')}</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-base-200 border border-secondary/20 rounded-lg text-base-content placeholder-secondary/50 focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-secondary text-sm mb-2">{t('profile.timezone')}</label>
                      <select className="w-full px-4 py-3 bg-base-200 border border-secondary/20 rounded-lg text-base-content focus:outline-none focus:border-primary/50">
                        <option>UTC-05:00 Eastern Time</option>
                        <option>UTC-08:00 Pacific Time</option>
                        <option>UTC+00:00 London</option>
                        <option>UTC+01:00 Central Europe</option>
                      </select>
                    </div>
                    <div className="pt-4 border-t border-secondary/10">
                      <button className="px-6 py-3 bg-primary text-primary-content font-bold rounded-lg hover:brightness-90 transition-colors">
                        {t('profile.saveChanges')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Subscription */}
              {activeTab === 'subscription' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-primary/30 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="w-5 h-5 text-primary" />
                          <span className="text-primary font-semibold">Pro Plan</span>
                        </div>
                        <p className="text-base-content text-2xl font-bold">$49/month</p>
                        <p className="text-secondary text-sm mt-1">Next billing: April 15, 2024</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full">Active</span>
                    </div>
                    <div className="mt-6 pt-6 border-t border-secondary/10">
                      <h4 className="text-base-content font-semibold mb-4">{t('profile.planFeatures')}</h4>
                      <ul className="space-y-2">
                        {[
                          'Unlimited predictions',
                          'Full AI analysis & edges',
                          'All leagues worldwide',
                          'Kelly stake recommendations',
                          'Bet tracking & analytics',
                          'Email & SMS alerts',
                        ].map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-secondary">
                            <Check className="w-4 h-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6">
                    <h4 className="text-base-content font-semibold mb-4">{t('profile.paymentMethod')}</h4>
                    <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                      <div className="w-12 h-8 bg-gradient-to-r from-[#1a1f71] to-[#0d1b5e] rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="text-base-content">•••• •••• •••• 4242</p>
                        <p className="text-secondary text-sm">Expires 12/25</p>
                      </div>
                      <button className="ml-auto text-primary text-sm hover:underline">
                        {t('profile.change')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-base-content mb-6">{t('profile.notificationPrefs')}</h2>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base-content font-semibold mb-4">{t('profile.channels')}</h4>
                      <div className="space-y-4">
                        {[
                          { key: 'email', label: t('profile.emailNotif'), icon: Mail },
                          { key: 'sms', label: t('profile.smsNotif'), icon: Smartphone },
                          { key: 'push', label: t('profile.pushNotif'), icon: Bell },
                        ].map(({ key, label, icon: Icon }) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5 text-secondary" />
                              <span className="text-base-content">{label}</span>
                            </div>
                            <button
                              onClick={() => setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })}
                              className={`w-12 h-6 rounded-full transition-colors relative ${
                                notifications[key as keyof typeof notifications] ? 'bg-primary' : 'bg-secondary/20'
                              }`}
                            >
                              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                                notifications[key as keyof typeof notifications] ? 'left-7' : 'left-1'
                              }`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-6 border-t border-secondary/10">
                      <h4 className="text-base-content font-semibold mb-4">{t('profile.alerts')}</h4>
                      <div className="space-y-4">
                        {[
                          { key: 'valueBets', label: t('profile.valueBetAlerts'), desc: t('profile.valueBetDesc') },
                          { key: 'results', label: t('profile.matchResults'), desc: t('profile.resultsDesc') },
                          { key: 'newsletter', label: t('profile.newsletter'), desc: t('profile.newsletterDesc') },
                        ].map(({ key, label, desc }) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                            <div>
                              <p className="text-base-content">{label}</p>
                              <p className="text-secondary text-sm">{desc}</p>
                            </div>
                            <button
                              onClick={() => setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })}
                              className={`w-12 h-6 rounded-full transition-colors relative ${
                                notifications[key as keyof typeof notifications] ? 'bg-primary' : 'bg-secondary/20'
                              }`}
                            >
                              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                                notifications[key as keyof typeof notifications] ? 'left-7' : 'left-1'
                              }`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-base-content mb-6">{t('profile.security')}</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-secondary text-sm mb-2">{t('profile.currentPass')}</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-base-200 border border-secondary/20 rounded-lg text-base-content focus:outline-none focus:border-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-secondary text-sm mb-2">{t('profile.newPass')}</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-base-200 border border-secondary/20 rounded-lg text-base-content focus:outline-none focus:border-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-secondary text-sm mb-2">{t('profile.confirmPass')}</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-base-200 border border-secondary/20 rounded-lg text-base-content focus:outline-none focus:border-primary/50"
                        />
                      </div>
                      <button className="px-6 py-3 bg-primary text-primary-content font-bold rounded-lg hover:brightness-90 transition-colors">
                        {t('profile.updatePass')}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6">
                    <h4 className="text-base-content font-semibold mb-4">{t('profile.twoFactor')}</h4>
                    <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-secondary" />
                        <div>
                          <p className="text-base-content">{t('profile.status')}</p>
                          <p className="text-secondary text-sm">{t('profile.notEnabled')}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                        {t('profile.enable')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* API Access */}
              {activeTab === 'api' && (
                <div className="bg-gradient-to-br from-[#011627] to-[#0A2A3A] border border-secondary/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-base-content mb-6">{t('profile.api')}</h2>
                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-base-content font-medium">{t('profile.enterpriseFeat')}</p>
                        <p className="text-secondary text-sm">API access is available on Enterprise plans. Upgrade to unlock programmatic access to our predictions.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-secondary text-sm mb-2">{t('profile.apiKey')}</label>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          value="••••••••••••••••••••••••••"
                          disabled
                          className="flex-1 px-4 py-3 bg-base-200 border border-secondary/20 rounded-lg text-secondary"
                        />
                        <button disabled className="px-4 py-3 bg-secondary/20 text-secondary/50 rounded-lg cursor-not-allowed">
                          {t('profile.copy')}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-secondary text-sm mb-2">{t('profile.webhookUrl')}</label>
                      <input
                        type="url"
                        placeholder="https://your-webhook.com/endpoint"
                        disabled
                        className="w-full px-4 py-3 bg-base-200 border border-secondary/20 rounded-lg text-secondary/50"
                      />
                    </div>
                    <a
                      href="#/pricing"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-content font-bold rounded-lg hover:brightness-90 transition-colors"
                    >
                      {t('profile.upgradeEnterprise')}
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
