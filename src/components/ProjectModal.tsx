import { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ProjectItem, ServiceId } from '../data/portfolioData';
import { ImageWithFallback } from './ImageWithFallback';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestSimilar: (serviceId: ServiceId, budgetHint: string, projectTitle: string) => void;
}

function mapCategoryToService(project: ProjectItem): { service: ServiceId; budget: string } {
  if (project.category === 'Python' || project.category === 'AI / ML') {
    return { service: 'Python Programming', budget: '₹1,000+' };
  }
  if (project.category === 'Java') {
    return { service: 'Java Programming', budget: '₹1,000+' };
  }
  if (project.category === 'Branding') {
    return { service: 'Poster & Social Media Branding', budget: '₹250 – ₹600' };
  }
  return { service: 'Website Development', budget: '₹1,499 – ₹1,999' };
}

export function ProjectModal({ project, onClose, onRequestSimilar }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0D18]/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#DFD8F5] bg-white shadow-2xl dark:border-slate-800 dark:bg-[#131627]"
          >
            {/* Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#EFEAFD] bg-white/95 px-6 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-[#131627]/95">
              <div>
                <p className="text-xs font-medium text-[#5B21B6] dark:text-[#A78BFA]">
                  {project.category} · {project.mockupLabel}
                </p>
                <h3
                  id="project-modal-title"
                  className="font-display text-xl font-bold text-[#0F172A] dark:text-white"
                >
                  {project.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5DFF5] text-slate-600 transition-colors hover:bg-[#F5F3FF] hover:text-[#0F172A] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-hidden rounded-xl border border-[#E5DFF5] dark:border-slate-800">
                <ImageWithFallback
                  src={project.image}
                  alt={project.imageAlt}
                  fallbackTitle={project.name}
                  aspectClassName="aspect-[16/9]"
                />
              </div>

              {/* Honest Mockup Notice */}
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#E5DFF5] bg-[#FAF8FF] p-3.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-[#181C30] dark:text-slate-300">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#5B21B6] dark:text-[#A78BFA]"
                  aria-hidden="true"
                />
                <span>
                  Preview visual is an illustrative mockup representing this project&apos;s design
                  and technical direction, not a live production screenshot.
                </span>
              </div>

              <div className="mt-6">
                <h4 className="font-display text-sm font-semibold text-[#0F172A] dark:text-white">
                  Project Overview
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.fullOverview}
                </p>
              </div>

              <div className="mt-6">
                <h4 className="font-display text-sm font-semibold text-[#0F172A] dark:text-white">
                  Key Highlights
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB] dark:text-[#60A5FA]"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-[#EFEAFD] pt-5 dark:border-slate-800">
                <h4 className="font-display text-sm font-semibold text-[#0F172A] dark:text-white">
                  Technology Stack
                </h4>
                <p className="mt-2 font-mono text-xs text-slate-600 dark:text-slate-300">
                  {project.techStack.join(' · ')}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-end gap-3">
                {project.liveDemoUrl && /^https?:\/\//i.test(project.liveDemoUrl) && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#DDD6FE] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E1B4B] transition-colors hover:border-[#5B21B6] dark:border-slate-700 dark:bg-[#1B1F36] dark:text-white"
                  >
                    <span>Open Live Demo</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const mapped = mapCategoryToService(project);
                    onClose();
                    onRequestSimilar(mapped.service, mapped.budget, project.name);
                  }}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5B21B6] to-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
                >
                  <span>Request Similar Project</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
