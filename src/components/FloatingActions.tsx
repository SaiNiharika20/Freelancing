import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { getWhatsAppUrl } from '../config/siteConfig';

interface FloatingActionsProps {
  onJumpToContact: () => void;
}

export function FloatingActions({ onJumpToContact }: FloatingActionsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 380);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waUrl = getWhatsAppUrl('Hello Sai Niharika, I would like to discuss a project.');

  return (
    <div className="fixed right-4 bottom-4 z-40 flex items-center gap-2.5 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            title="Back to top"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DDD6FE] bg-white/95 text-[#0F172A] shadow-md backdrop-blur-md transition-colors hover:border-[#5B21B6] hover:text-[#5B21B6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6] dark:border-slate-700 dark:bg-[#141728]/95 dark:text-white"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {waUrl ? (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[#16A34A] px-4 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={onJumpToContact}
          aria-label="Open contact enquiry form"
          title="Contact via WhatsApp or Email"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#2563EB] px-4 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>
      )}
    </div>
  );
}
