export interface ContactConfig {
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
}

export interface BrandConfig {
  name: string;
  location: string;
  title: string;
  intro: string;
  availability: string;
  contact: ContactConfig;
}

/**
 * Editable Personal Brand & Contact Configuration
 * Replace the bracketed placeholders below with your real details before deploying.
 */
export const SITE_CONFIG: BrandConfig = {
  name: 'Sai Niharika',
  location: 'Hyderabad, India',
  title:
    'Freelance Web Developer | Python & Java Programmer | PPT, Poster & Brand Designer | Online Coding Tutor',
  intro:
    'I transform ideas into beautiful websites, practical programming solutions and professional digital experiences.',
  availability: 'Open for freelance projects and online teaching.',
  contact: {
    email: '[YOUR EMAIL]',
    whatsapp: '[YOUR PHONE NUMBER WITH COUNTRY CODE]',
    linkedin: '[YOUR LINKEDIN URL]',
    github: '[YOUR GITHUB URL]',
  },
};

export function isPlaceholderValue(value: string): boolean {
  const trimmed = value.trim();
  return !trimmed || (trimmed.startsWith('[') && trimmed.endsWith(']'));
}

export function sanitizePhoneForWhatsApp(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

export function isWhatsAppConfigured(): boolean {
  if (isPlaceholderValue(SITE_CONFIG.contact.whatsapp)) return false;
  return sanitizePhoneForWhatsApp(SITE_CONFIG.contact.whatsapp).length >= 8;
}

export function isEmailConfigured(): boolean {
  if (isPlaceholderValue(SITE_CONFIG.contact.email)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_CONFIG.contact.email.trim());
}

export function isUrlConfigured(url: string): boolean {
  if (isPlaceholderValue(url)) return false;
  return /^https?:\/\/.+/i.test(url.trim());
}

export interface EnquiryPayload {
  fullName: string;
  email: string;
  service: string;
  budget: string;
  description: string;
}

export function buildWhatsAppEnquiryMessage(payload: EnquiryPayload): string {
  return [
    `Hello ${SITE_CONFIG.name},`,
    ``,
    `I would like to enquire about your freelance services:`,
    `- Name: ${payload.fullName.trim()}`,
    `- Email: ${payload.email.trim()}`,
    `- Service Required: ${payload.service.trim()}`,
    `- Estimated Budget: ${payload.budget.trim()}`,
    ``,
    `Project / Requirement Details:`,
    payload.description.trim(),
    ``,
    `Looking forward to discussing timeline and next steps.`,
  ].join('\n');
}

export function getWhatsAppUrl(message?: string): string | null {
  if (!isWhatsAppConfigured()) return null;
  const digits = sanitizePhoneForWhatsApp(SITE_CONFIG.contact.whatsapp);
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function getMailtoUrl(subject?: string, body?: string): string | null {
  if (!isEmailConfigured()) return null;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${SITE_CONFIG.contact.email.trim()}${query ? `?${query}` : ''}`;
}
