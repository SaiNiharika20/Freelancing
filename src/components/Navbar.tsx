import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onHireMe: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ isDark, onToggleTheme, onHireMe }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E9E4F5] bg-white/85 backdrop-blur-md transition-colors duration-200 dark:border-slate-800/80 dark:bg-[#0B0D18]/85">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className="h-[2.5px] w-full bg-gradient-to-r from-[#5B21B6] via-[#2563EB] to-[#EC4899]"
      />

      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
          className="font-display text-lg font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B21B6] dark:text-white"
        >
          {SITE_CONFIG.name}
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6 lg:gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="group relative py-1 text-sm font-medium text-slate-600 transition-colors hover:text-[#5B21B6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B21B6] dark:text-slate-300 dark:hover:text-white"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-[#5B21B6] to-[#2563EB] transition-all duration-200 group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5DFF5] bg-[#FAF8FF] text-slate-700 transition-colors hover:border-[#C4B5FD] hover:text-[#5B21B6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6] dark:border-slate-800 dark:bg-[#141728] dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-white"
          >
            {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onHireMe();
            }}
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#5B21B6] to-[#2563EB] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:opacity-95 hover:shadow-md active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6]"
          >
            Hire Me
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5DFF5] bg-white text-slate-700 transition-colors hover:text-[#5B21B6] md:hidden dark:border-slate-800 dark:bg-[#141728] dark:text-slate-200"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-t border-[#E9E4F5] bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-[#0F1221]"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="flex min-h-[44px] items-center rounded-lg px-3 py-2 text-base font-medium text-slate-700 transition-colors hover:bg-[#F5F3FF] hover:text-[#5B21B6] dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 pt-2 border-t border-[#E9E4F5] dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onHireMe();
                  }}
                  className="flex min-h-[44px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#5B21B6] to-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Hire Me
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
