import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Info } from 'lucide-react';

export function Pricing() {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState<'USD' | 'UZS'>('USD');
  const [rate, setRate] = useState(1);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code === 'UZ') {
          setCurrency('UZS');
          setRate(12800);
        }
      })
      .catch(() => { /* fallback to USD */ });
  }, []);

  const formatPrice = (usdPrice: number) => {
    if (usdPrice === 0) return currency === 'UZS' ? '0 soʻm' : '$0';
    if (currency === 'UZS') {
      const uzPrice = usdPrice * rate;
      return `${Math.round(uzPrice).toLocaleString('uz-UZ')} soʻm`;
    }
    return `$${usdPrice}`;
  };

  return (
    <div className="min-h-screen bg-[#011627] pt-24 pb-12 px-4 sm:px-6 lg:px-8 shadow-inner text-[#FFFFFF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t('pricing.title')}</h1>
          <p className="text-xl text-[#00F5FF]/80 mb-2">{t('pricing.subtitle')}</p>
          <div className="inline-flex items-center gap-2 mt-4 text-sm text-[#FFFFFF]/60">
            <Info className="w-4 h-4" />
            {t('pricing.localCurrencyNote')}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          
          {/* Free Tier */}
          <div className="card bg-[#0A2A3A] shadow-xl border border-[#00F5FF]/10 hover:border-[#00F5FF]/30 transition-colors">
            <div className="card-body">
              <h2 className="card-title text-2xl text-[#FFFFFF]">{t('pricing.freeTier.name')}</h2>
              <div className="flex items-end gap-1 my-4">
                <span className="text-4xl font-bold">{formatPrice(0)}</span>
              </div>
              <div className="divider opacity-20"></div>
              <ul className="space-y-4 flex-1 mt-4">
                {(t('pricing.freeTier.features', { returnObjects: true }) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-[#FFFFFF]/80">
                    <Check className="w-5 h-5 text-[#CCFF00] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="card-actions justify-center mt-8">
                <button className="btn btn-outline border-[#00F5FF]/50 text-[#00F5FF] w-full hover:bg-[#00F5FF]/10">{t('pricing.freeTier.btn')}</button>
              </div>
            </div>
          </div>

          {/* Pro Tier (Most Popular) */}
          <div className="card bg-[#011627] shadow-2xl border-2 border-[#CCFF00] relative transform lg:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="badge border-none bg-[#CCFF00] text-[#011627] font-bold px-4 py-3 uppercase tracking-wider text-xs">
                {t('pricing.mostPopular')}
              </div>
            </div>
            <div className="card-body">
              <div className="bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-lg p-3 mb-4 text-center">
                <span className="text-sm font-semibold text-[#CCFF00]">{t('pricing.limitedOffer')} 48:00:00</span>
              </div>
              
              <h2 className="card-title text-3xl text-[#FFFFFF]">{t('pricing.proTier.name')}</h2>
              <div className="flex items-end gap-1 my-4">
                <span className="text-4xl font-bold text-[#CCFF00]">{formatPrice(29.99)}</span>
                <span className="text-[#FFFFFF]/50">{t('pricing.monthly')}</span>
              </div>
              <div className="divider opacity-20"></div>
              <ul className="space-y-4 flex-1 mt-4">
                {(t('pricing.proTier.features', { returnObjects: true }) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-[#FFFFFF]/90">
                    <Check className="w-5 h-5 text-[#CCFF00] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="card-actions justify-center mt-8">
                <button className="btn bg-[#CCFF00] hover:bg-[#a6d100] text-[#011627] border-none w-full font-bold">{t('pricing.proTier.btn')}</button>
              </div>
            </div>
          </div>

          {/* Basic Tier */}
          <div className="card bg-[#0A2A3A] shadow-xl border border-[#00F5FF]/10 hover:border-[#00F5FF]/30 transition-colors">
            <div className="card-body">
              <h2 className="card-title text-2xl text-[#FFFFFF]">{t('pricing.basicTier.name')}</h2>
              <div className="flex items-end gap-1 my-4">
                <span className="text-4xl font-bold">{formatPrice(9.99)}</span>
                <span className="text-[#FFFFFF]/50">{t('pricing.monthly')}</span>
              </div>
              <div className="divider opacity-20"></div>
              <ul className="space-y-4 flex-1 mt-4">
                {(t('pricing.basicTier.features', { returnObjects: true }) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-[#FFFFFF]/80">
                    <Check className="w-5 h-5 text-[#CCFF00] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="card-actions justify-center mt-8">
                <button className="btn btn-outline border-[#00F5FF]/50 text-[#00F5FF] w-full hover:bg-[#00F5FF]/10">{t('pricing.basicTier.btn')}</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
