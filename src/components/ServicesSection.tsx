import {
  ArrowRight,
  Check,
  Coffee,
  FileText,
  Globe,
  GraduationCap,
  Palette,
  Presentation,
  Terminal,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES, ServiceId, ServiceItem } from '../data/portfolioData';
import { ImageWithFallback } from './ImageWithFallback';

interface ServicesSectionProps {
  onSelectService: (serviceId: ServiceId, budgetHint: string) => void;
}

function renderServiceIcon(iconKey: ServiceItem['iconKey']) {
  switch (iconKey) {
    case 'globe':
      return <Globe className="h-5 w-5" aria-hidden="true" />;
    case 'terminal':
      return <Terminal className="h-5 w-5" aria-hidden="true" />;
    case 'coffee':
      return <Coffee className="h-5 w-5" aria-hidden="true" />;
    case 'presentation':
      return <Presentation className="h-5 w-5" aria-hidden="true" />;
    case 'fileText':
      return <FileText className="h-5 w-5" aria-hidden="true" />;
    case 'graduationCap':
      return <GraduationCap className="h-5 w-5" aria-hidden="true" />;
    case 'palette':
      return <Palette className="h-5 w-5" aria-hidden="true" />;
  }
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="border-b border-[#E9E4F5] bg-[#FAF8FF] py-16 sm:py-24 dark:border-slate-800/80 dark:bg-[#0B0D18]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#5B21B6] dark:text-[#A78BFA]">
              Services
            </p>
            <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl dark:text-white">
              Practical Digital &amp; Coding Services Tailored to Your Goals
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Select any service below to pre-fill your enquiry and get a personalized quote and
            timeline.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const isWideFeatured = SERVICES.length % 3 === 1 && index === SERVICES.length - 1;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.05, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-[#E5DFF5] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#C4B5FD] hover:shadow-[0_18px_40px_-24px_rgba(91,33,182,0.28)] dark:border-slate-800 dark:bg-[#131627] dark:hover:border-violet-500/40 ${
                  isWideFeatured ? 'md:col-span-2 lg:col-span-3 lg:flex-row lg:items-stretch' : ''
                }`}
              >
                {/* Visual Header */}
                <div
                  className={`relative overflow-hidden border-b border-[#EFEAFD] dark:border-slate-800 ${
                    isWideFeatured ? 'lg:w-5/12 lg:border-r lg:border-b-0' : ''
                  }`}
                >
                  <ImageWithFallback
                    src={service.image}
                    alt={service.imageAlt}
                    fallbackTitle={service.shortTitle}
                    aspectClassName={isWideFeatured ? 'aspect-[16/10] lg:h-full' : 'aspect-[16/9]'}
                    className="transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/45 via-transparent to-transparent"
                  />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-[#5B21B6] shadow-sm dark:bg-[#16192B]/95 dark:text-[#C4B5FD]">
                      {renderServiceIcon(service.iconKey)}
                    </div>
                    <span className="text-xs font-semibold text-white drop-shadow-sm">
                      {service.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className={`flex flex-1 flex-col p-6 ${isWideFeatured ? 'lg:p-8' : ''}`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-bold text-[#0F172A] dark:text-white">
                      {service.shortTitle}
                    </h3>
                    <div className="shrink-0 text-right">
                      <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        Starts at
                      </span>
                      <span className="font-display text-lg font-bold text-[#5B21B6] tabular-nums dark:text-[#A78BFA]">
                        {service.startingPrice}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {service.description}
                  </p>

                  <ul
                    className={`mt-5 border-t border-[#F1ECFA] pt-4 dark:border-slate-800 ${
                      isWideFeatured
                        ? 'grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2'
                        : 'space-y-2'
                    }`}
                  >
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <Check
                          className="h-4 w-4 shrink-0 text-[#2563EB] dark:text-[#60A5FA]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectService(service.id, service.defaultBudget)}
                      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#DDD6FE] bg-[#F5F3FF] px-5 py-2.5 text-sm font-semibold text-[#4C1D95] transition-all duration-150 hover:border-transparent hover:bg-gradient-to-r hover:from-[#5B21B6] hover:to-[#2563EB] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6] dark:border-slate-700 dark:bg-[#1B1F36] dark:text-slate-100 dark:hover:from-[#6D28D9] dark:hover:to-[#2563EB] ${
                        isWideFeatured ? 'w-full sm:w-auto' : 'w-full'
                      }`}
                    >
                      <span>Get This Service</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
