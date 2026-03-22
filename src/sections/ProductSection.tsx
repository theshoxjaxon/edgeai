import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Sparkles, Zap, Building2 } from 'lucide-react';
import { pricingConfig } from '../config';

export function ProductSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'pro': return Sparkles;
      case 'enterprise': return Building2;
      default: return Zap;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-base-100"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
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
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {pricingConfig.label}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {pricingConfig.heading.map((line, i) => (
                <span key={i} className="text-base-content block">{line}</span>
              ))}
              <span className="text-primary block">{pricingConfig.headingAccent}</span>
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto mt-6">
              {pricingConfig.description}
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {pricingConfig.plans.map((plan, index) => {
              const Icon = getPlanIcon(plan.id);
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
                  className={`relative rounded-2xl p-8 ${
                    plan.highlighted
                      ? 'bg-gradient-to-br from-[#CCFF00]/20 to-[#0A2A3A] border-2 border-primary'
                      : 'bg-base-200 border border-secondary/20 hover:border-[#00F5FF]/40'
                  } transition-all duration-300`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-4 py-1 bg-primary text-primary-content text-sm font-bold rounded-full">
                        <Sparkles className="w-4 h-4" />
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                      plan.highlighted ? 'bg-primary/20' : 'bg-secondary/10'
                    }`}>
                      <Icon className={`w-7 h-7 ${plan.highlighted ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-base-content mb-2">{plan.name}</h3>
                    <p className="text-secondary text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <span className="text-5xl font-bold text-base-content">{plan.price}</span>
                    <span className="text-secondary">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? 'bg-primary/20' : 'bg-secondary/10'
                        }`}>
                          <Check className={`w-3 h-3 ${plan.highlighted ? 'text-primary' : 'text-secondary'}`} />
                        </div>
                        <span className="text-secondary text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={plan.id === 'enterprise' ? '#/contact' : '#/dashboard'}
                    className={`block w-full py-4 text-center font-semibold rounded-lg transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-primary text-primary-content hover:brightness-90 hover:scale-105'
                        : 'border-2 border-secondary/30 text-base-content hover:border-primary hover:text-primary'
                    }`}
                  >
                    {plan.ctaText}
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-secondary text-sm mb-4">Trusted by 50,000+ bettors worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              {['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'].map((league) => (
                <span key={league} className="text-base-content font-semibold">{league}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
