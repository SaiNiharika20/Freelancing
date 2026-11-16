import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PortfolioSection } from './components/PortfolioSection';
import { PricingSection } from './components/PricingSection';
import { ProjectModal } from './components/ProjectModal';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhyAndProcessSection } from './components/WhyAndProcessSection';
import { ProjectItem, ServiceId } from './data/portfolioData';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const [selectedService, setSelectedService] = useState<ServiceId>('Website Development');
  const [selectedBudget, setSelectedBudget] = useState<string>('₹999 – ₹1,999');
  const [prefillNote, setPrefillNote] = useState<string | undefined>(undefined);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('sn-theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [isDark]);

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceAndScroll = (
    serviceId: ServiceId,
    budgetHint: string,
    projectTitle?: string
  ) => {
    setSelectedService(serviceId);
    setSelectedBudget(budgetHint);
    if (projectTitle) {
      setPrefillNote(`I am interested in a project similar to "${projectTitle}".`);
    }
    scrollToSection('#contact');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-[#FAF8FF] text-[#0F172A] transition-colors duration-200 dark:bg-[#0B0D18] dark:text-[#F8FAFC]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[#5B21B6] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <Navbar
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          onHireMe={() => scrollToSection('#contact')}
        />

        <main id="main-content">
          <HeroSection
            onHireMe={() => scrollToSection('#contact')}
            onExploreWork={() => scrollToSection('#portfolio')}
          />

          <AboutSection />

          <ServicesSection
            onSelectService={(serviceId, budgetHint) =>
              handleSelectServiceAndScroll(serviceId, budgetHint)
            }
          />

          <PortfolioSection onViewProject={(project) => setActiveProject(project)} />

          <PricingSection
            onSelectTier={(serviceId, budgetHint) =>
              handleSelectServiceAndScroll(serviceId, budgetHint)
            }
          />

          <WhyAndProcessSection />

          <TestimonialsSection onStartProject={() => scrollToSection('#contact')} />

          <ContactSection
            selectedService={selectedService}
            selectedBudget={selectedBudget}
            prefillNote={prefillNote}
            onServiceChange={setSelectedService}
            onBudgetChange={setSelectedBudget}
          />
        </main>

        <Footer />

        <FloatingActions onJumpToContact={() => scrollToSection('#contact')} />

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onRequestSimilar={(serviceId, budgetHint, projectTitle) =>
            handleSelectServiceAndScroll(serviceId, budgetHint, projectTitle)
          }
        />
      </div>
    </MotionConfig>
  );
}
