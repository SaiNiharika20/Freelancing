import { useMemo, useState } from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECTS, ProjectCategory, ProjectItem } from '../data/portfolioData';
import { ImageWithFallback } from './ImageWithFallback';

interface PortfolioSectionProps {
  onViewProject: (project: ProjectItem) => void;
}

const CATEGORIES: ProjectCategory[] = ['All', 'Websites', 'Python', 'Java', 'AI / ML', 'Branding'];

export function PortfolioSection({ onViewProject }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    return PROJECTS.filter(
      (project) =>
        project.category === selectedCategory || project.secondaryCategory === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <section
      id="portfolio"
      className="border-b border-[#E9E4F5] bg-white py-16 sm:py-24 dark:border-slate-800/80 dark:bg-[#0F111E]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#5B21B6] dark:text-[#A78BFA]">
              Portfolio &amp; Projects
            </p>
            <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl dark:text-white">
              Selected Projects &amp; Technical Builds
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Visual cards below use illustrative concept mockups and IDE previews to demonstrate
              interface design and code architecture.
            </p>
          </div>

          {/* Interactive Category Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#E5DFF5] bg-[#FAF8FF] p-1.5 dark:border-slate-800 dark:bg-[#15182B]"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6] ${
                    active
                      ? 'bg-gradient-to-r from-[#5B21B6] to-[#2563EB] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-white hover:text-[#0F172A] dark:text-slate-300 dark:hover:bg-[#1E223A] dark:hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => {
            const isFeatured = selectedCategory === 'All' && idx === 0;
            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-[#E5DFF5] bg-[#FCFAFF] transition-all duration-200 hover:-translate-y-1 hover:border-[#C4B5FD] hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.24)] dark:border-slate-800 dark:bg-[#15182B] dark:hover:border-violet-500/40 ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="relative overflow-hidden border-b border-[#EFEAFD] dark:border-slate-800">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.imageAlt}
                    fallbackTitle={project.name}
                    aspectClassName={isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'}
                    className="transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {/* Clean Unboxed Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="text-[#5B21B6] dark:text-[#A78BFA]">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.mockupLabel}</span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold text-[#0F172A] dark:text-white">
                    {project.name}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack as clean unboxed typographic text */}
                  <p className="mt-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                    {project.techStack.join(' · ')}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onViewProject(project)}
                      className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5B21B6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6] dark:bg-violet-600 dark:hover:bg-violet-500"
                    >
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>View Details</span>
                    </button>

                    {/* Live Demo rendered ONLY when a real URL exists */}
                    {project.liveDemoUrl && /^https?:\/\//i.test(project.liveDemoUrl) && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl border border-[#DDD6FE] bg-white px-4 py-2 text-xs font-semibold text-[#1E1B4B] transition-colors hover:border-[#5B21B6] hover:text-[#5B21B6] whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-[#1B1F36] dark:text-slate-100"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
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
