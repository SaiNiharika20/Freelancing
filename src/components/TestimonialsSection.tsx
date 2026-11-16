import { ArrowRight, MessageSquareQuote } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIAL_PLACEHOLDERS } from '../data/portfolioData';

interface TestimonialsSectionProps {
  onStartProject: () => void;
}

export function TestimonialsSection({ onStartProject }: TestimonialsSectionProps) {
  return (
    <section
      id="testimonials"
      className="border-b border-[#E9E4F5] bg-white py-16 sm:py-24 dark:border-slate-800/80 dark:bg-[#0F111E]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#5B21B6] dark:text-[#A78BFA]">
              Client Feedback
            </p>
            <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl dark:text-white">
              Client Testimonials (Sample Placeholders)
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              No fabricated reviews or invented ratings are displayed here. These sample
              placeholder slots will be updated exclusively with genuine feedback from real clients
              and tutoring students.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartProject}
            className="inline-flex min-h-[44px] w-fit items-center gap-2 rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-4 py-2.5 text-xs font-semibold text-[#4C1D95] transition-colors hover:border-[#5B21B6] hover:bg-[#F5F3FF] whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-[#15182B] dark:text-slate-100"
          >
            <span>Start a Project</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIAL_PLACEHOLDERS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col justify-between rounded-2xl border border-dashed border-[#D8CFF5] bg-[#FCFAFF] p-6 dark:border-slate-700 dark:bg-[#15182B]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span>{item.label}</span>
                  <MessageSquareQuote
                    className="h-4 w-4 text-[#5B21B6] dark:text-[#A78BFA]"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-4 text-sm italic leading-relaxed text-slate-600 dark:text-slate-300">
                  &ldquo;{item.placeholderNote}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-[#EFEAFD] pt-4 dark:border-slate-800">
                <p className="font-display text-sm font-semibold text-[#0F172A] dark:text-white">
                  {item.sampleRole}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {item.sampleProjectType}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
