import { SITE_CONFIG } from '../config/siteConfig';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E9E4F5] bg-white py-10 dark:border-slate-800/80 dark:bg-[#0F111E]">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <p className="font-display text-base font-bold text-[#0F172A] dark:text-white">
            {SITE_CONFIG.name}
          </p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            {SITE_CONFIG.location} · {SITE_CONFIG.title}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-medium text-slate-600 transition-colors hover:text-[#5B21B6] dark:text-slate-400 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          &copy; {year} {SITE_CONFIG.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
