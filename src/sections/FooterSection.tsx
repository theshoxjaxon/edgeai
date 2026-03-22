import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Twitter, Facebook, Instagram, Youtube, Send, MapPin, Phone, Mail } from 'lucide-react';
import { footerConfig } from '../config';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
      className="relative w-full bg-base-100 border-t border-secondary/10"
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
              <h3 className="text-2xl font-bold text-base-content mb-2">
                {t("footer.brandName")}
              </h3>
              <p className="text-primary text-sm mb-4">{t("footer.brandTagline")}</p>
              <p className="text-secondary text-sm leading-relaxed mb-6">
                {t("footer.brandDescription")}
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
                      className="w-10 h-10 rounded-lg bg-base-100 border border-secondary/20 flex items-center justify-center text-secondary hover:bg-primary/20 hover:border-primary/40 hover:text-primary transition-all duration-300"
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
              <h4 className="text-base-content font-semibold mb-6">{t("footer.quickLinks")}</h4>
              <ul className="space-y-3">
                {footerConfig.navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-secondary hover:text-primary transition-colors text-sm"
                    >
                      {t(`footer.policy_${link.label.toLowerCase().split(" ")[0]}`)}
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
              <h4 className="text-base-content font-semibold mb-6">{t("footer.contactUs")}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-secondary text-sm whitespace-pre-line">
                    {footerConfig.contactAddress}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={`tel:${footerConfig.contactPhone}`} className="text-secondary text-sm hover:text-primary transition-colors">
                    {footerConfig.contactPhone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={`mailto:${footerConfig.contactEmail}`} className="text-secondary text-sm hover:text-primary transition-colors">
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
              <h4 className="text-base-content font-semibold mb-2">{t("footer.getWinningTips")}</h4>
              <p className="text-secondary text-sm mb-4">{t("footer.subscribeDesc")}</p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.placeholder")}
                    className="w-full px-4 py-3 bg-base-100 border border-secondary/20 rounded-lg text-base-content placeholder-secondary/50 focus:outline-none focus:border-primary/50 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-primary text-primary-content font-semibold rounded-lg hover:brightness-90 transition-colors flex items-center justify-center gap-2"
                >
                  {subscribed ? (
                    <>{t("footer.subscribed")}</>
                  ) : (
                    <>
                      {t("footer.subscribe")}
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
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 border-t border-secondary/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <p className="text-secondary text-sm">{t("footer.copyright")}</p>
          <div className="flex gap-6">
            {footerConfig.policyLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-secondary hover:text-primary text-sm transition-colors"
              >
                {t(`footer.policy_${link.label.toLowerCase().split(" ")[0]}`)}
              </a>
            ))}
          </div>
        </div>
        <div className="text-center pt-4 border-t border-secondary/10">
          <p className="text-sm text-gray-400">{t("footer.authorCredit")}</p>
        </div>
      </div>

      {/* Responsible Gambling Notice */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 bg-base-100/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-secondary/60 text-xs">
            {t("footer.responsibleGambling")} <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">BeGambleAware.org</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
