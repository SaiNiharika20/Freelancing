import { BookOpen, Code2, Cpu, FileSpreadsheet, Globe, Layout, Palette, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SKILLS } from '../data/portfolioData';

function getSkillIcon(id: string) {
  switch (id) {
    case 'html':
    case 'css':
    case 'javascript':
      return <Code2 className="h-4 w-4" aria-hidden="true" />;
    case 'react':
      return <Layout className="h-4 w-4" aria-hidden="true" />;
    case 'python':
    case 'java':
      return <Terminal className="h-4 w-4" aria-hidden="true" />;
    case 'responsive':
      return <Globe className="h-4 w-4" aria-hidden="true" />;
    case 'ppt':
      return <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />;
    case 'docs':
      return <BookOpen className="h-4 w-4" aria-hidden="true" />;
    case 'poster-branding':
      return <Palette className="h-4 w-4" aria-hidden="true" />;
    default:
      return <Cpu className="h-4 w-4" aria-hidden="true" />;
  }
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-b border-[#E9E4F5] bg-white py-16 sm:py-24 dark:border-slate-800/80 dark:bg-[#0F111E]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Narrative Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-semibold tracking-wider text-[#5B21B6] dark:text-[#A78BFA]">
              About Me
            </p>
            <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl dark:text-white">
              Turning Ideas Into Digital Experiences
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Hello! I&apos;m <strong className="font-semibold text-[#0F172A] dark:text-white">{SITE_CONFIG.name}</strong>, a
                Computer Science Engineering student based in {SITE_CONFIG.location}. I focus on
                building clean, responsive websites, practical programming utilities, and structured
                technical deliverables.
              </p>
              <p>
                Whether you need a modern landing page for a growing business, assistance with Python
                or Core Java coursework and mini-projects, a sharp presentation deck, or patient
                one-to-one coding tutoring, I approach every requirement with clarity and care.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-[#E9E4F5] bg-[#FAF8FF] p-5 dark:border-slate-800 dark:bg-[#15182B]">
              <p className="text-xs font-semibold text-[#5B21B6] dark:text-[#C4B5FD]">
                Current Focus &amp; Availability
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {SITE_CONFIG.availability} Remote collaborations across India and worldwide, plus
                flexible evening and weekend online tutoring slots.
              </p>
            </div>
          </motion.div>

          {/* Animated Skill Cards Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SKILLS.map((skill, idx) => {
                const isTrailingWide = SKILLS.length % 3 === 1 && idx === SKILLS.length - 1;
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(idx * 0.04, 0.25),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -3 }}
                    className={`group rounded-2xl border border-[#EAE4F7] bg-[#FCFAFF] p-4 transition-colors hover:border-[#C4B5FD] hover:bg-white dark:border-slate-800 dark:bg-[#15182B] dark:hover:border-violet-500/40 dark:hover:bg-[#191D33] ${
                      isTrailingWide ? 'sm:col-span-2 lg:col-span-3' : ''
                    }`}
                  >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#5B21B6] transition-colors group-hover:bg-[#5B21B6] group-hover:text-white dark:bg-violet-950/70 dark:text-violet-300 dark:group-hover:bg-violet-600 dark:group-hover:text-white">
                      {getSkillIcon(skill.id)}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {skill.category}
                    </span>
                  </div>
                  <h3 className="mt-3.5 font-display text-base font-semibold text-[#0F172A] dark:text-white">
                    {skill.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {skill.summary}
                  </p>
                </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
