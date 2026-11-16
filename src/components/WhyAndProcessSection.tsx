import { BookOpen, Clock, MessageSquare, Smartphone, Sparkles, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { PROCESS_STEPS, WHY_CHOOSE_ITEMS, WhyChooseItem } from '../data/portfolioData';

function renderWhyIcon(iconKey: WhyChooseItem['iconKey']) {
  switch (iconKey) {
    case 'wallet':
      return <Wallet className="h-5 w-5" aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className="h-5 w-5" aria-hidden="true" />;
    case 'smartphone':
      return <Smartphone className="h-5 w-5" aria-hidden="true" />;
    case 'messageSquare':
      return <MessageSquare className="h-5 w-5" aria-hidden="true" />;
    case 'clock':
      return <Clock className="h-5 w-5" aria-hidden="true" />;
    case 'bookOpen':
      return <BookOpen className="h-5 w-5" aria-hidden="true" />;
  }
}

export function WhyAndProcessSection() {
  return (
    <>
      {/* Why Choose Me */}
      <section
        id="why-me"
        className="border-b border-[#E9E4F5] bg-white py-16 sm:py-24 dark:border-slate-800/80 dark:bg-[#0F111E]"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#5B21B6] dark:text-[#A78BFA]">
              Why Choose Me
            </p>
            <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl dark:text-white">
              Reliable Execution With Personal Attention
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(idx * 0.04, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-2xl border border-[#EAE4F7] bg-[#FCFAFF] p-6 transition-colors hover:border-[#C4B5FD] hover:bg-white dark:border-slate-800 dark:bg-[#15182B] dark:hover:border-violet-500/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#5B21B6] dark:bg-violet-950/70 dark:text-violet-300">
                  {renderWhyIcon(item.iconKey)}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[#0F172A] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Four-Step Work Process */}
      <section
        id="process"
        className="border-b border-[#E9E4F5] bg-[#FAF8FF] py-16 sm:py-24 dark:border-slate-800/80 dark:bg-[#0B0D18]"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-[#5B21B6] dark:text-[#A78BFA]">
                Work Process
              </p>
              <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl dark:text-white">
                How We Go From Idea to Delivery
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
              A straightforward four-step workflow designed to keep scope, pricing, and updates
              crystal clear.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex flex-col rounded-2xl border border-[#E5DFF5] bg-white p-6 dark:border-slate-800 dark:bg-[#131627]"
              >
                <span className="font-mono text-2xl font-bold text-[#5B21B6] tabular-nums dark:text-[#A78BFA]">
                  {step.stepNumber}.
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-[#0F172A] dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
