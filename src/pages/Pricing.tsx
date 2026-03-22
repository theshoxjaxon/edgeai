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
    <div className="min-h-screen bg-base-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8 shadow-inner text-base-content">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t('pricing.title')}</h1>
          <p className="text-xl text-secondary/80 mb-2">{t('pricing.subtitle')}</p>
          <div className="inline-flex items-center gap-2 mt-4 text-sm text-base-content/60">
            <Info className="w-4 h-4" />
            {t('pricing.localCurrencyNote')}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          
          {/* Free Tier */}
          <div className="card bg-base-200 shadow-xl border border-secondary/10 hover:border-secondary/30 transition-colors">
            <div className="card-body">
              <h2 className="card-title text-2xl text-base-content">{t('pricing.freeTier.name')}</h2>
              <div className="flex items-end gap-1 my-4">
                <span className="text-4xl font-bold">{formatPrice(0)}</span>
              </div>
              <div className="divider opacity-20"></div>
              <ul className="space-y-4 flex-1 mt-4">
                {(t('pricing.freeTier.features', { returnObjects: true }) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-base-content/80">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="card-actions justify-center mt-8">
                <button className="btn btn-outline border-secondary/50 text-secondary w-full hover:bg-secondary/10">{t('pricing.freeTier.btn')}</button>
              </div>
            </div>
          </div>

          {/* Pro Tier (Most Popular) */}
          <div className="card bg-base-100 shadow-2xl border-2 border-primary relative transform lg:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="badge border-none bg-primary text-primary-content font-bold px-4 py-3 uppercase tracking-wider text-xs">
                {t('pricing.mostPopular')}
              </div>
            </div>
            <div className="card-body">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4 text-center">
                <span className="text-sm font-semibold text-primary">{t('pricing.limitedOffer')} 48:00:00</span>
              </div>
              
              <h2 className="card-title text-3xl text-base-content">{t('pricing.proTier.name')}</h2>
              <div className="flex items-end gap-1 my-4">
                <span className="text-4xl font-bold text-primary">{formatPrice(29.99)}</span>
                <span className="text-base-content/50">{t('pricing.monthly')}</span>
              </div>
              <div className="divider opacity-20"></div>
              <ul className="space-y-4 flex-1 mt-4">
                {(t('pricing.proTier.features', { returnObjects: true }) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-base-content/90">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="card-actions justify-center mt-8">
                <button className="btn bg-primary hover:brightness-90 text-primary-content border-none w-full font-bold">{t('pricing.proTier.btn')}</button>
              </div>
            </div>
          </div>

          {/* Basic Tier */}
          <div className="card bg-base-200 shadow-xl border border-secondary/10 hover:border-secondary/30 transition-colors">
            <div className="card-body">
              <h2 className="card-title text-2xl text-base-content">{t('pricing.basicTier.name')}</h2>
              <div className="flex items-end gap-1 my-4">
                <span className="text-4xl font-bold">{formatPrice(9.99)}</span>
                <span className="text-base-content/50">{t('pricing.monthly')}</span>
              </div>
              <div className="divider opacity-20"></div>
              <ul className="space-y-4 flex-1 mt-4">
                {(t('pricing.basicTier.features', { returnObjects: true }) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-base-content/80">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="card-actions justify-center mt-8">
                <button className="btn btn-outline border-secondary/50 text-secondary w-full hover:bg-secondary/10">{t('pricing.basicTier.btn')}</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
