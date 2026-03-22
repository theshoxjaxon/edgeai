import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Bell, Shield, CreditCard, Key,
  ChevronRight, Check, AlertTriangle, Trophy,
  Smartphone, Globe, Moon, LogOut
} from 'lucide-react';

interface ProfileProps {
  onLogout: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    valueBets: true,
    results: true,
    newsletter: false,
  });

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Access', icon: Key },
  ];

  return (
    <div className="min-h-screen bg-[#05140A] pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-[#F5F5DC]">Profile Settings</h1>
            <p className="text-[#8FBC8F] mt-1">Manage your account and preferences</p>
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
              <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A227] to-[#8FBC8F] flex items-center justify-center">
                    <span className="text-[#0D2818] font-bold text-2xl">JD</span>
                  </div>
                  <div>
                    <p className="text-[#F5F5DC] font-semibold">John Doe</p>
                    <p className="text-[#8FBC8F] text-sm">john@example.com</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#8FBC8F]/10">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#C9A227]" />
                    <span className="text-[#C9A227] text-sm font-medium">Pro Plan</span>
                  </div>
                  <p className="text-[#8FBC8F] text-xs mt-1">Renews on Apr 15, 2024</p>
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
                        ? 'bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/30'
                        : 'text-[#8FBC8F] hover:bg-[#0D2818] hover:text-[#F5F5DC]'
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
                  Logout
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
                <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#F5F5DC] mb-6">General Settings</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#8FBC8F] text-sm mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] focus:outline-none focus:border-[#C9A227]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-[#8FBC8F] text-sm mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="john@example.com"
                          className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] focus:outline-none focus:border-[#C9A227]/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#8FBC8F] text-sm mb-2">Phone</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] placeholder-[#8FBC8F]/50 focus:outline-none focus:border-[#C9A227]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8FBC8F] text-sm mb-2">Timezone</label>
                      <select className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] focus:outline-none focus:border-[#C9A227]/50">
                        <option>UTC-05:00 Eastern Time</option>
                        <option>UTC-08:00 Pacific Time</option>
                        <option>UTC+00:00 London</option>
                        <option>UTC+01:00 Central Europe</option>
                      </select>
                    </div>
                    <div className="pt-4 border-t border-[#8FBC8F]/10">
                      <button className="px-6 py-3 bg-[#C9A227] text-[#0D2818] font-bold rounded-lg hover:bg-[#d4b43a] transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Subscription */}
              {activeTab === 'subscription' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#C9A227]/30 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="w-5 h-5 text-[#C9A227]" />
                          <span className="text-[#C9A227] font-semibold">Pro Plan</span>
                        </div>
                        <p className="text-[#F5F5DC] text-2xl font-bold">$49/month</p>
                        <p className="text-[#8FBC8F] text-sm mt-1">Next billing: April 15, 2024</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full">Active</span>
                    </div>
                    <div className="mt-6 pt-6 border-t border-[#8FBC8F]/10">
                      <h4 className="text-[#F5F5DC] font-semibold mb-4">Plan Features</h4>
                      <ul className="space-y-2">
                        {[
                          'Unlimited predictions',
                          'Full AI analysis & edges',
                          'All leagues worldwide',
                          'Kelly stake recommendations',
                          'Bet tracking & analytics',
                          'Email & SMS alerts',
                        ].map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-[#8FBC8F]">
                            <Check className="w-4 h-4 text-[#C9A227]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6">
                    <h4 className="text-[#F5F5DC] font-semibold mb-4">Payment Method</h4>
                    <div className="flex items-center gap-4 p-4 bg-[#0a1f12] rounded-lg">
                      <div className="w-12 h-8 bg-gradient-to-r from-[#1a1f71] to-[#0d1b5e] rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="text-[#F5F5DC]">•••• •••• •••• 4242</p>
                        <p className="text-[#8FBC8F] text-sm">Expires 12/25</p>
                      </div>
                      <button className="ml-auto text-[#C9A227] text-sm hover:underline">
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#F5F5DC] mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[#F5F5DC] font-semibold mb-4">Channels</h4>
                      <div className="space-y-4">
                        {[
                          { key: 'email', label: 'Email Notifications', icon: Mail },
                          { key: 'sms', label: 'SMS Notifications', icon: Smartphone },
                          { key: 'push', label: 'Push Notifications', icon: Bell },
                        ].map(({ key, label, icon: Icon }) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-[#0a1f12] rounded-lg">
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5 text-[#8FBC8F]" />
                              <span className="text-[#F5F5DC]">{label}</span>
                            </div>
                            <button
                              onClick={() => setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })}
                              className={`w-12 h-6 rounded-full transition-colors relative ${
                                notifications[key as keyof typeof notifications] ? 'bg-[#C9A227]' : 'bg-[#8FBC8F]/20'
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
                    <div className="pt-6 border-t border-[#8FBC8F]/10">
                      <h4 className="text-[#F5F5DC] font-semibold mb-4">Alerts</h4>
                      <div className="space-y-4">
                        {[
                          { key: 'valueBets', label: 'Value Bet Alerts', desc: 'Get notified when high-edge bets are detected' },
                          { key: 'results', label: 'Match Results', desc: 'Receive updates on your tracked bets' },
                          { key: 'newsletter', label: 'Weekly Newsletter', desc: 'Tips and insights every week' },
                        ].map(({ key, label, desc }) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-[#0a1f12] rounded-lg">
                            <div>
                              <p className="text-[#F5F5DC]">{label}</p>
                              <p className="text-[#8FBC8F] text-sm">{desc}</p>
                            </div>
                            <button
                              onClick={() => setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })}
                              className={`w-12 h-6 rounded-full transition-colors relative ${
                                notifications[key as keyof typeof notifications] ? 'bg-[#C9A227]' : 'bg-[#8FBC8F]/20'
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
                  <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-[#F5F5DC] mb-6">Security Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[#8FBC8F] text-sm mb-2">Current Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] focus:outline-none focus:border-[#C9A227]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-[#8FBC8F] text-sm mb-2">New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] focus:outline-none focus:border-[#C9A227]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-[#8FBC8F] text-sm mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] focus:outline-none focus:border-[#C9A227]/50"
                        />
                      </div>
                      <button className="px-6 py-3 bg-[#C9A227] text-[#0D2818] font-bold rounded-lg hover:bg-[#d4b43a] transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6">
                    <h4 className="text-[#F5F5DC] font-semibold mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between p-4 bg-[#0a1f12] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-[#8FBC8F]" />
                        <div>
                          <p className="text-[#F5F5DC]">2FA Status</p>
                          <p className="text-[#8FBC8F] text-sm">Not enabled</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-[#C9A227]/10 text-[#C9A227] rounded-lg hover:bg-[#C9A227]/20 transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* API Access */}
              {activeTab === 'api' && (
                <div className="bg-gradient-to-br from-[#0D2818] to-[#0a1f12] border border-[#8FBC8F]/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#F5F5DC] mb-6">API Access</h2>
                  <div className="p-4 bg-[#C9A227]/10 border border-[#C9A227]/30 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#F5F5DC] font-medium">Enterprise Feature</p>
                        <p className="text-[#8FBC8F] text-sm">API access is available on Enterprise plans. Upgrade to unlock programmatic access to our predictions.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#8FBC8F] text-sm mb-2">API Key</label>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          value="••••••••••••••••••••••••••"
                          disabled
                          className="flex-1 px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#8FBC8F]"
                        />
                        <button disabled className="px-4 py-3 bg-[#8FBC8F]/20 text-[#8FBC8F]/50 rounded-lg cursor-not-allowed">
                          Copy
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#8FBC8F] text-sm mb-2">Webhook URL</label>
                      <input
                        type="url"
                        placeholder="https://your-webhook.com/endpoint"
                        disabled
                        className="w-full px-4 py-3 bg-[#0a1f12] border border-[#8FBC8F]/20 rounded-lg text-[#8FBC8F]/50"
                      />
                    </div>
                    <a
                      href="#/pricing"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A227] text-[#0D2818] font-bold rounded-lg hover:bg-[#d4b43a] transition-colors"
                    >
                      Upgrade to Enterprise
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
