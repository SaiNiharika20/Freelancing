import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  FileText,
  Globe,
  MapPin,
  Presentation,
  Terminal,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onHireMe: () => void;
  onExploreWork: () => void;
}

type CodeTab = 'react' | 'python' | 'java';

const CODE_SNIPPETS: Record<
  CodeTab,
  { label: string; filename: string; lines: string[]; output: string }
> = {
  react: {
    label: 'React UI',
    filename: 'HeroShowcase.tsx',
    lines: [
      'export function ClientWebsite({ brand }: Props) {',
      '  return (',
      '    <section className="responsive-grid">',
      '      <h1>{brand.headline}</h1>',
      '      <CTA href="#contact">Start Project</CTA>',
      '    </section>',
      '  );',
      '}',
    ],
    output: 'Responsive layout compiled · Mobile & Desktop ready',
  },
  python: {
    label: 'Python',
    filename: 'automate_report.py',
    lines: [
      'def summarize_records(rows: list[dict]) -> dict:',
      '    cleaned = [r for r in rows if r.get("active")]',
      '    total = sum(float(r["amount"]) for r in cleaned)',
      '    return {"count": len(cleaned), "total": round(total, 2)}',
      '',
      'if __name__ == "__main__":',
      '    print("Automation ready for client workflow")',
    ],
    output: 'Script validated · Clean modular output',
  },
  java: {
    label: 'Java OOP',
    filename: 'TaskManager.java',
    lines: [
      'public class TaskManager {',
      '    private final List<ProjectTask> tasks = new ArrayList<>();',
      '',
      '    public void addTask(String title, Priority level) {',
      '        tasks.add(new ProjectTask(title, level));',
      '    }',
      '}',
    ],
    output: 'OOP classes structured · Ready for walkthrough',
  },
};

export function HeroSection({ onHireMe, onExploreWork }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<CodeTab>('react');
  const snippet = CODE_SNIPPETS[activeTab];

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[#E9E4F5] bg-[#FAF8FF] py-14 sm:py-20 lg:py-24 dark:border-slate-800/80 dark:bg-[#0B0D18]"
    >
      {/* Subtle atmospheric gradient mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hero-mesh-light dark:hero-mesh-dark"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Brand Pitch */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-6"
          >
            {/* Availability Indicator (clean icon + text, no pulsing dot) */}
            <div className="mb-5 inline-flex w-fit items-center gap-2 border-b border-[#DDD6FE] pb-2 text-sm font-medium text-[#5B21B6] dark:border-violet-800/60 dark:text-[#C4B5FD]">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Available for Freelance Projects &amp; Online Teaching</span>
            </div>

            <h1 className="font-display text-balance text-[clamp(2.25rem,4.2vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-[#0F172A] dark:text-white">
              Let&apos;s Build Something{' '}
              <span className="bg-gradient-to-r from-[#5B21B6] via-[#2563EB] to-[#DB2777] bg-clip-text text-transparent dark:from-[#A78BFA] dark:via-[#60A5FA] dark:to-[#F472B6]">
                Amazing
              </span>{' '}
              Together.
            </h1>

            <p className="mt-4 font-display text-lg font-semibold leading-snug text-[#1E1B4B] sm:text-xl dark:text-slate-200">
              Creative Websites. Smart Coding Solutions. Professional Digital Services.
            </p>

            <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-slate-600 dark:text-slate-300">
              I&apos;m {SITE_CONFIG.name}, a freelance developer and programmer helping businesses and
              individuals create modern digital experiences.
            </p>

            <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {SITE_CONFIG.intro}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onHireMe}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5B21B6] to-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:opacity-95 hover:shadow-md active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6]"
              >
                <span>Hire Me</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#D8CFF5] bg-white px-6 py-3 text-sm font-semibold text-[#1E1B4B] transition-colors hover:border-[#5B21B6] hover:bg-[#F5F3FF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6] dark:border-slate-700 dark:bg-[#141728] dark:text-slate-100 dark:hover:border-violet-400 dark:hover:bg-[#1B1F36]"
              >
                <span>Explore My Work</span>
              </button>
            </div>

            {/* Clean metadata line */}
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#E9E4F5] pt-5 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#5B21B6] dark:text-[#A78BFA]" aria-hidden="true" />
                {SITE_CONFIG.location}
              </span>
              <span aria-hidden="true">·</span>
              <span>Web Development</span>
              <span aria-hidden="true">·</span>
              <span>Python &amp; Java</span>
              <span aria-hidden="true">·</span>
              <span>PPT, Posters &amp; Branding</span>
              <span aria-hidden="true">·</span>
              <span>Online Tutoring</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Laptop Mockup + Workspace Visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col justify-between gap-4 lg:col-span-6"
          >
            {/* Interactive Laptop Mockup Frame */}
            <div className="relative rounded-2xl border border-[#DFD8F5] bg-white/90 p-3 shadow-[0_18px_45px_-22px_rgba(91,33,182,0.22)] backdrop-blur-md dark:border-slate-800 dark:bg-[#131627]/90">
              {/* Top Window Chrome */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFEAFD] pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <Code2 className="h-4 w-4 text-[#5B21B6] dark:text-[#A78BFA]" aria-hidden="true" />
                  <span className="font-mono">{snippet.filename}</span>
                </div>

                {/* Code Switcher Tabs */}
                <div
                  role="tablist"
                  aria-label="Interactive code preview switcher"
                  className="flex items-center gap-1 rounded-lg bg-[#F4F0FD] p-1 dark:bg-[#0D101E]"
                >
                  {(Object.keys(CODE_SNIPPETS) as CodeTab[]).map((tabKey) => {
                    const isActive = activeTab === tabKey;
                    return (
                      <button
                        key={tabKey}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTab(tabKey)}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-white text-[#5B21B6] shadow-xs dark:bg-[#1E223A] dark:text-white'
                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                      >
                        {CODE_SNIPPETS[tabKey].label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code Surface */}
              <div className="mt-3 overflow-x-auto rounded-xl bg-[#0F1322] p-4 text-left text-xs leading-6 text-slate-200">
                <pre className="font-mono">
                  {snippet.lines.map((line, index) => (
                    <div key={`${activeTab}-${index}`} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="w-4 select-none text-right text-slate-500 tabular-nums"
                      >
                        {index + 1}
                      </span>
                      <span className="text-slate-100">{line || ' '}</span>
                    </div>
                  ))}
                </pre>
                <div className="mt-3 border-t border-slate-800 pt-2.5 font-mono text-[11px] text-[#A5B4FC]">
                  {snippet.output}
                </div>
              </div>

              {/* Laptop Base Lip */}
              <div
                aria-hidden="true"
                className="mx-auto mt-2.5 h-1.5 w-24 rounded-full bg-[#E5DFF5] dark:bg-slate-700"
              />
            </div>

            {/* Secondary Row: Studio Workspace Image + Floating Service Affordance Tiles */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              <div className="overflow-hidden rounded-2xl border border-[#DFD8F5] bg-white sm:col-span-7 dark:border-slate-800 dark:bg-[#131627]">
                <ImageWithFallback
                  src="/src/assets/images/hero_workspace_laptop_1794843220875.jpg"
                  alt="Modern freelance developer studio workspace with laptop and code editor"
                  fallbackTitle="Developer Studio Workspace"
                  aspectClassName="aspect-[16/9]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:col-span-5 sm:grid-cols-1">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.16 }}
                  className="flex items-center gap-3 rounded-xl border border-[#DFD8F5] bg-white/95 p-3 dark:border-slate-800 dark:bg-[#131627]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EDE9FE] text-[#5B21B6] dark:bg-violet-950/70 dark:text-violet-300">
                    <Globe className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-[#0F172A] dark:text-white">
                      Websites
                    </p>
                    <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                      From ₹999
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.16 }}
                  className="flex items-center gap-3 rounded-xl border border-[#DFD8F5] bg-white/95 p-3 dark:border-slate-800 dark:bg-[#131627]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#DBEAFE] text-[#1D4ED8] dark:bg-blue-950/70 dark:text-blue-300">
                    <Terminal className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-[#0F172A] dark:text-white">
                      Python &amp; Java
                    </p>
                    <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                      Code &amp; Tutoring
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.16 }}
                  className="flex items-center gap-3 rounded-xl border border-[#DFD8F5] bg-white/95 p-3 dark:border-slate-800 dark:bg-[#131627]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FCE7F3] text-[#BE185D] dark:bg-pink-950/70 dark:text-pink-300">
                    <Presentation className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-[#0F172A] dark:text-white">
                      PPT &amp; Docs
                    </p>
                    <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                      Decks &amp; Reports
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Proof / Capability Strip Below Split */}
        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-[#E9E4F5] pt-8 sm:grid-cols-4 dark:border-slate-800">
          <div>
            <p className="font-display text-lg font-bold text-[#0F172A] dark:text-white">
              Responsive Web
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              React, HTML, CSS &amp; Tailwind builds
            </p>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-[#0F172A] dark:text-white">
              Python &amp; Java
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Scripts, OOP projects &amp; debugging
            </p>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-[#0F172A] dark:text-white">
              1-on-1 Tutoring
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Python, Java &amp; C for beginners
            </p>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-[#0F172A] dark:text-white">
              PPT, Posters &amp; Branding
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Social ad posters, brand kits &amp; decks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
