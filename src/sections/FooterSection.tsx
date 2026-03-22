import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Twitter, Facebook, Instagram, Youtube, Send, MapPin, Phone, Mail } from 'lucide-react';
import { footerConfig } from '../config';

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'twitter': return Twitter;
    case 'facebook': return Facebook;
    case 'instagram': return Instagram;
    case 'youtube': return Youtube;
    default: return Twitter;
  }
};

export function FooterSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer
      ref={sectionRef}
      className="relative w-full bg-[#05140A] border-t border-[#8FBC8F]/10"
    >
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h3 className="text-2xl font-bold text-[#F5F5DC] mb-2">
                {footerConfig.brandName}
              </h3>
              <p className="text-[#C9A227] text-sm mb-4">{footerConfig.brandTagline}</p>
              <p className="text-[#8FBC8F] text-sm leading-relaxed mb-6">
                {footerConfig.brandDescription}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {footerConfig.socialLinks.map((link, index) => {
                  const Icon = getSocialIcon(link.platform);
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-[#0D2818] border border-[#8FBC8F]/20 flex items-center justify-center text-[#8FBC8F] hover:bg-[#C9A227]/20 hover:border-[#C9A227]/40 hover:text-[#C9A227] transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-[#F5F5DC] font-semibold mb-6">{footerConfig.navSectionTitle}</h4>
              <ul className="space-y-3">
                {footerConfig.navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-[#8FBC8F] hover:text-[#C9A227] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-[#F5F5DC] font-semibold mb-6">{footerConfig.contactSectionTitle}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <span className="text-[#8FBC8F] text-sm whitespace-pre-line">
                    {footerConfig.contactAddress}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                  <a href={`tel:${footerConfig.contactPhone}`} className="text-[#8FBC8F] text-sm hover:text-[#C9A227] transition-colors">
                    {footerConfig.contactPhone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                  <a href={`mailto:${footerConfig.contactEmail}`} className="text-[#8FBC8F] text-sm hover:text-[#C9A227] transition-colors">
                    {footerConfig.contactEmail}
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-[#F5F5DC] font-semibold mb-2">{footerConfig.newsletterTitle}</h4>
              <p className="text-[#8FBC8F] text-sm mb-4">{footerConfig.newsletterDescription}</p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={footerConfig.newsletterPlaceholder}
                    className="w-full px-4 py-3 bg-[#0D2818] border border-[#8FBC8F]/20 rounded-lg text-[#F5F5DC] placeholder-[#8FBC8F]/50 focus:outline-none focus:border-[#C9A227]/50 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-[#C9A227] text-[#0D2818] font-semibold rounded-lg hover:bg-[#d4b43a] transition-colors flex items-center justify-center gap-2"
                >
                  {subscribed ? (
                    <>Subscribed!</>
                  ) : (
                    <>
                      {footerConfig.newsletterButton}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 border-t border-[#8FBC8F]/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8FBC8F] text-sm">{footerConfig.copyright}</p>
          <div className="flex gap-6">
            {footerConfig.policyLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-[#8FBC8F] hover:text-[#C9A227] text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Responsible Gambling Notice */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 bg-[#0D2818]/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#8FBC8F]/60 text-xs">
            Please gamble responsibly. Betting involves risk. Only bet what you can afford to lose. 
            If you need help, visit <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] hover:underline">BeGambleAware.org</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
