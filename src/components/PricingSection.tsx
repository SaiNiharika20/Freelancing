import { ArrowRight, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { PRICING_CATEGORIES, ServiceId } from '../data/portfolioData';

interface PricingSectionProps {
  onSelectTier: (serviceId: ServiceId, budgetHint: string) => void;
}

export function PricingSection({ onSelectTier }: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className="border-b border-[#E9E4F5] bg-[#FAF8FF] py-16 sm:py-24 dark:border-slate-800/80 dark:bg-[#0B0D18]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#5B21B6] dark:text-[#A78BFA]">
              Introductory Pricing
            </p>
            <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl dark:text-white">
              Transparent Starting Rates
            </h2>
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-[#E5DFF5] bg-white px-4 py-3 text-xs leading-relaxed text-slate-600 md:max-w-sm dark:border-slate-800 dark:bg-[#131627] dark:text-slate-300">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-[#5B21B6] dark:text-[#A78BFA]"
              aria-hidden="true"
            />
            <span>
              These are introductory starting prices. Final prices depend on requirements and
              complexity.
            </span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING_CATEGORIES.map((category, categoryIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.35,
                delay: categoryIdx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col rounded-2xl border border-[#E5DFF5] bg-white p-6 dark:border-slate-800 dark:bg-[#131627]"
            >
              <div className="border-b border-[#EFEAFD] pb-4 dark:border-slate-800">
                <h3 className="font-display text-xl font-bold text-[#0F172A] dark:text-white">
                  {category.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                  {category.subtitle}
                </p>
              </div>

              <div className="mt-4 flex flex-1 flex-col divide-y divide-[#F1ECFA] dark:divide-slate-800/80">
                {category.tiers.map((tier) => (
                  <div key={tier.name} className="flex flex-col justify-between gap-3 py-4 first:pt-1 last:pb-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="font-display text-base font-semibold text-[#0F172A] dark:text-white">
                        {tier.name}
                      </h4>
                      <div className="shrink-0 font-display text-xl font-bold text-[#5B21B6] tabular-nums dark:text-[#A78BFA]">
                        {tier.price}
                        {tier.unit && (
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {tier.unit}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {tier.summary}
                    </p>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => onSelectTier(tier.serviceValue, tier.budgetHint)}
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2 text-xs font-semibold text-[#4C1D95] transition-colors hover:border-transparent hover:bg-gradient-to-r hover:from-[#5B21B6] hover:to-[#2563EB] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6] dark:border-slate-700 dark:bg-[#1A1E33] dark:text-slate-100"
                      >
                        <span>Get Started</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
