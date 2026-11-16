import { useEffect, useState, FormEvent } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  SITE_CONFIG,
  buildWhatsAppEnquiryMessage,
  getMailtoUrl,
  getWhatsAppUrl,
  isEmailConfigured,
  isUrlConfigured,
  isWhatsAppConfigured,
} from '../config/siteConfig';
import { SERVICES, ServiceId } from '../data/portfolioData';

interface ContactSectionProps {
  selectedService: ServiceId;
  selectedBudget: string;
  prefillNote?: string;
  onServiceChange: (service: ServiceId) => void;
  onBudgetChange: (budget: string) => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  service?: string;
  budget?: string;
  description?: string;
}

export function ContactSection({
  selectedService,
  selectedBudget,
  prefillNote,
  onServiceChange,
  onBudgetChange,
}: ContactSectionProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [whatsappHref, setWhatsappHref] = useState<string | null>(null);
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [channelNotice, setChannelNotice] = useState<string | null>(null);

  useEffect(() => {
    if (prefillNote) {
      setDescription(prefillNote);
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  }, [prefillNote]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!selectedService) {
      nextErrors.service = 'Please choose the service you need.';
    }
    if (!selectedBudget.trim()) {
      nextErrors.budget = 'Please provide an estimated budget or tier.';
    }
    if (description.trim().length < 15) {
      nextErrors.description =
        'Please describe your project or learning goals (at least 15 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setChannelNotice(null);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setGeneratedMessage(null);
      return;
    }

    const message = buildWhatsAppEnquiryMessage({
      fullName,
      email,
      service: selectedService,
      budget: selectedBudget,
      description,
    });

    const waUrl = getWhatsAppUrl(message);
    const emailUrl = getMailtoUrl(
      `Freelance Enquiry: ${selectedService} (${fullName.trim()})`,
      message
    );

    setGeneratedMessage(message);
    setWhatsappHref(waUrl);
    setMailtoHref(emailUrl);
    setCopied(false);

    if (waUrl) {
      const anchor = document.createElement('a');
      anchor.href = waUrl;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  };

  const handleCopyMessage = async () => {
    if (!generatedMessage) return;
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const waReady = isWhatsAppConfigured();
  const emailReady = isEmailConfigured();
  const linkedinReady = isUrlConfigured(SITE_CONFIG.contact.linkedin);
  const githubReady = isUrlConfigured(SITE_CONFIG.contact.github);

  return (
    <section
      id="contact"
      className="bg-[#FAF8FF] py-16 sm:py-24 dark:bg-[#0B0D18]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Channels & Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#5B21B6] dark:text-[#A78BFA]">
                Contact
              </p>
              <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl dark:text-white">
                Let&apos;s Discuss Your Project or Learning Goals
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Fill in the enquiry form to generate a structured WhatsApp message with your
                project details, or reach out directly through any channel below.
              </p>

              <div className="mt-6 flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                <MapPin className="h-4 w-4 text-[#5B21B6] dark:text-[#A78BFA]" aria-hidden="true" />
                <span>{SITE_CONFIG.location} · Available Remotely</span>
              </div>

              {/* Direct Contact Action Buttons */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {waReady ? (
                  <a
                    href={getWhatsAppUrl() || '#contact'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setChannelNotice(
                        `WhatsApp is set to "${SITE_CONFIG.contact.whatsapp}". Update src/config/siteConfig.ts with your phone number with country code to enable direct WhatsApp launch.`
                      )
                    }
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#DDD6FE] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#5B21B6] hover:text-[#5B21B6] dark:border-slate-800 dark:bg-[#131627] dark:text-white"
                  >
                    <MessageCircle className="h-4 w-4 text-[#16A34A]" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </button>
                )}

                {emailReady ? (
                  <a
                    href={getMailtoUrl(`Freelance Enquiry for ${SITE_CONFIG.name}`) || '#contact'}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#DDD6FE] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#5B21B6] hover:text-[#5B21B6] dark:border-slate-800 dark:bg-[#131627] dark:text-white"
                  >
                    <Mail className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                    <span>Email</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setChannelNotice(
                        `Email is set to "${SITE_CONFIG.contact.email}". Update src/config/siteConfig.ts with your email address to enable direct mailto links.`
                      )
                    }
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#DDD6FE] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#5B21B6] hover:text-[#5B21B6] dark:border-slate-800 dark:bg-[#131627] dark:text-white"
                  >
                    <Mail className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                    <span>Email</span>
                  </button>
                )}

                {linkedinReady ? (
                  <a
                    href={SITE_CONFIG.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#DDD6FE] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#5B21B6] hover:text-[#5B21B6] dark:border-slate-800 dark:bg-[#131627] dark:text-white"
                  >
                    <Linkedin className="h-4 w-4 text-[#0A66C2]" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setChannelNotice(
                        `LinkedIn is set to "${SITE_CONFIG.contact.linkedin}". Add your profile URL in src/config/siteConfig.ts.`
                      )
                    }
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#DDD6FE] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#5B21B6] hover:text-[#5B21B6] dark:border-slate-800 dark:bg-[#131627] dark:text-white"
                  >
                    <Linkedin className="h-4 w-4 text-[#0A66C2]" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </button>
                )}

                {githubReady ? (
                  <a
                    href={SITE_CONFIG.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#DDD6FE] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#5B21B6] hover:text-[#5B21B6] dark:border-slate-800 dark:bg-[#131627] dark:text-white"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setChannelNotice(
                        `GitHub is set to "${SITE_CONFIG.contact.github}". Add your GitHub URL in src/config/siteConfig.ts.`
                      )
                    }
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#DDD6FE] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#5B21B6] hover:text-[#5B21B6] dark:border-slate-800 dark:bg-[#131627] dark:text-white"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    <span>GitHub</span>
                  </button>
                )}
              </div>

              {channelNotice && (
                <div
                  role="status"
                  className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#DDD6FE] bg-white p-3.5 text-xs leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-[#131627] dark:text-slate-300"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#5B21B6] dark:text-[#A78BFA]"
                    aria-hidden="true"
                  />
                  <span>{channelNotice}</span>
                </div>
              )}
            </div>

            {/* Editable Contact Summary Card */}
            <div className="mt-8 rounded-2xl border border-[#E5DFF5] bg-white p-5 text-xs dark:border-slate-800 dark:bg-[#131627]">
              <p className="font-display text-sm font-semibold text-[#0F172A] dark:text-white">
                Configured Contact Endpoints
              </p>
              <dl className="mt-3 space-y-2 text-slate-600 dark:text-slate-400">
                <div className="flex justify-between gap-3">
                  <dt className="font-medium">Email</dt>
                  <dd className="truncate font-mono">{SITE_CONFIG.contact.email}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-medium">WhatsApp</dt>
                  <dd className="truncate font-mono">{SITE_CONFIG.contact.whatsapp}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-medium">LinkedIn</dt>
                  <dd className="truncate font-mono">{SITE_CONFIG.contact.linkedin}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-medium">GitHub</dt>
                  <dd className="truncate font-mono">{SITE_CONFIG.contact.github}</dd>
                </div>
              </dl>
            </div>
          </motion.div>

          {/* Right Column: Validated Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-[#E5DFF5] bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-[#131627]"
            >
              <h3 className="font-display text-xl font-bold text-[#0F172A] dark:text-white">
                Send a Project Enquiry
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                All fields are required so I can prepare an accurate reply.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="contact-full-name"
                    className="block text-xs font-semibold text-[#0F172A] dark:text-slate-200"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                    }}
                    aria-invalid={Boolean(errors.fullName)}
                    placeholder="Enter your name"
                    className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FCFAFF] px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#5B21B6] focus:outline-none dark:border-slate-700 dark:bg-[#0F1221] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-400"
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[#0F172A] dark:text-slate-200"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    aria-invalid={Boolean(errors.email)}
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FCFAFF] px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#5B21B6] focus:outline-none dark:border-slate-700 dark:bg-[#0F1221] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-400"
                  />
                  {errors.email && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Service Required */}
                <div>
                  <label
                    htmlFor="contact-service"
                    className="block text-xs font-semibold text-[#0F172A] dark:text-slate-200"
                  >
                    Service Required
                  </label>
                  <select
                    id="contact-service"
                    value={selectedService}
                    onChange={(e) => {
                      onServiceChange(e.target.value as ServiceId);
                      if (errors.service) setErrors((p) => ({ ...p, service: undefined }));
                    }}
                    aria-invalid={Boolean(errors.service)}
                    className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FCFAFF] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#5B21B6] focus:outline-none dark:border-slate-700 dark:bg-[#0F1221] dark:text-white dark:focus:border-violet-400"
                  >
                    {SERVICES.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.id}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.service}</span>
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="contact-budget"
                    className="block text-xs font-semibold text-[#0F172A] dark:text-slate-200"
                  >
                    Budget (INR or Custom)
                  </label>
                  <input
                    id="contact-budget"
                    type="text"
                    value={selectedBudget}
                    onChange={(e) => {
                      onBudgetChange(e.target.value);
                      if (errors.budget) setErrors((p) => ({ ...p, budget: undefined }));
                    }}
                    aria-invalid={Boolean(errors.budget)}
                    placeholder="e.g. ₹999 – ₹1,999 or ₹200/hr"
                    className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FCFAFF] px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#5B21B6] focus:outline-none dark:border-slate-700 dark:bg-[#0F1221] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-400"
                  />
                  {errors.budget && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.budget}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Project Description */}
              <div className="mt-5">
                <label
                  htmlFor="contact-description"
                  className="block text-xs font-semibold text-[#0F172A] dark:text-slate-200"
                >
                  Project Description
                </label>
                <textarea
                  id="contact-description"
                  rows={4}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors((p) => ({ ...p, description: undefined }));
                  }}
                  aria-invalid={Boolean(errors.description)}
                  placeholder="Share your goals, preferred timeline, number of pages/slides, or coding topics..."
                  className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FCFAFF] px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#5B21B6] focus:outline-none dark:border-slate-700 dark:bg-[#0F1221] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-400"
                />
                {errors.description && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.description}</span>
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Prepares a formatted enquiry for WhatsApp with an email fallback.
                </p>

                <button
                  type="submit"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5B21B6] to-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:opacity-95 hover:shadow-md active:scale-[0.98] whitespace-nowrap shrink-0"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Generate WhatsApp Enquiry</span>
                </button>
              </div>

              {/* Transparent Output Panel (Never fakes submission) */}
              {generatedMessage && (
                <div
                  role="region"
                  aria-live="polite"
                  className="mt-6 rounded-xl border border-[#D8CFF5] bg-[#FAF8FF] p-5 dark:border-slate-700 dark:bg-[#0F1221]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-display text-sm font-bold text-[#0F172A] dark:text-white">
                      {whatsappHref
                        ? 'WhatsApp Enquiry Ready'
                        : 'Enquiry Message Prepared — Configure Phone Number to Auto-Launch WhatsApp'}
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[#DDD6FE] bg-white px-3 py-1.5 text-xs font-semibold text-[#4C1D95] transition-colors hover:border-[#5B21B6] dark:border-slate-700 dark:bg-[#181C30] dark:text-slate-200"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>
                  </div>

                  {!whatsappHref && (
                    <p className="mt-2 text-xs leading-relaxed text-amber-700 dark:text-amber-300">
                      WhatsApp is currently set to the placeholder{' '}
                      <code className="font-mono">{SITE_CONFIG.contact.whatsapp}</code>. Replace it
                      in <code className="font-mono">src/config/siteConfig.ts</code> with a real
                      phone number including country code so visitors open WhatsApp directly.
                    </p>
                  )}

                  <pre className="mt-3 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-lg border border-[#E5DFF5] bg-white p-3.5 font-mono text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-[#141728] dark:text-slate-300">
                    {generatedMessage}
                  </pre>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#16A34A] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-95"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        <span>Open in WhatsApp</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}

                    {mailtoHref ? (
                      <a
                        href={mailtoHref}
                        className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#DDD6FE] bg-white px-4 py-2 text-xs font-semibold text-[#1E1B4B] transition-colors hover:border-[#5B21B6] dark:border-slate-700 dark:bg-[#181C30] dark:text-white"
                      >
                        <Mail className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                        <span>Send via Email Fallback</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Email fallback activates automatically once{' '}
                        <code className="font-mono">{SITE_CONFIG.contact.email}</code> is updated.
                      </span>
                    )}
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
