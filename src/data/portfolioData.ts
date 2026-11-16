export type ServiceId =
  | 'Website Development'
  | 'Python Programming'
  | 'Java Programming'
  | 'PowerPoint Presentation Design'
  | 'Technical Documentation'
  | 'Online Coding Tutoring'
  | 'Poster & Social Media Branding';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  summary: string;
}

export interface ServiceItem {
  id: ServiceId;
  shortTitle: string;
  categoryLabel: string;
  startingPrice: string;
  description: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  iconKey: 'globe' | 'terminal' | 'coffee' | 'presentation' | 'fileText' | 'graduationCap' | 'palette';
  defaultBudget: string;
}

export type ProjectCategory = 'All' | 'Websites' | 'Python' | 'Java' | 'AI / ML' | 'Branding';

export interface ProjectItem {
  id: string;
  name: string;
  category: Exclude<ProjectCategory, 'All'>;
  secondaryCategory?: Exclude<ProjectCategory, 'All'>;
  shortDescription: string;
  fullOverview: string;
  highlights: string[];
  techStack: string[];
  image: string;
  imageAlt: string;
  mockupLabel: string;
  /** Populate with a verified live URL when deployed; omitted when no live URL exists yet. */
  liveDemoUrl?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  unit?: string;
  serviceValue: ServiceId;
  budgetHint: string;
  summary: string;
}

export interface PricingCategory {
  id: string;
  title: string;
  subtitle: string;
  tiers: PricingTier[];
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconKey: 'wallet' | 'sparkles' | 'smartphone' | 'messageSquare' | 'clock' | 'bookOpen';
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface TestimonialPlaceholder {
  id: string;
  label: string;
  sampleRole: string;
  sampleProjectType: string;
  placeholderNote: string;
}

export const SKILLS: SkillItem[] = [
  {
    id: 'html',
    name: 'HTML5',
    category: 'Semantic Markup',
    summary: 'Accessible, SEO-friendly page structure with clean semantic tags.',
  },
  {
    id: 'css',
    name: 'CSS3 & Tailwind',
    category: 'Modern Styling',
    summary: 'Flexible grid layouts, responsive breakpoints, and crisp visual polish.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Interactive Logic',
    summary: 'Dynamic DOM interactions, validation, and clean client-side behavior.',
  },
  {
    id: 'react',
    name: 'React',
    category: 'Component Architecture',
    summary: 'Reusable UI components and fast single-page web applications.',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Scripting & Automation',
    summary: 'Readable scripts, data handling, automation tools, and beginner projects.',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Object-Oriented Design',
    summary: 'Structured Core Java classes, console utilities, and OOP mini-projects.',
  },
  {
    id: 'responsive',
    name: 'Responsive Web Development',
    category: 'Cross-Device UX',
    summary: 'Fluid layouts tested across desktops, tablets, Android, and iPhone.',
  },
  {
    id: 'ppt',
    name: 'PowerPoint Design',
    category: 'Visual Storytelling',
    summary: 'Structured slide decks for startup pitches, college projects, and reports.',
  },
  {
    id: 'docs',
    name: 'Technical Documentation',
    category: 'Clear Writing',
    summary: 'Well-organized project reports, SRS documents, and formatted resumes.',
  },
  {
    id: 'poster-branding',
    name: 'Poster & Brand Design',
    category: 'Social Media & Branding',
    summary:
      'Scroll-stopping promotional posters, Instagram/WhatsApp ad creatives, and cohesive brand visual kits.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'Website Development',
    shortTitle: 'Website Development',
    categoryLabel: 'Websites & Frontend',
    startingPrice: '₹999',
    description:
      'Custom, mobile-responsive websites crafted to help businesses, founders, and creators establish a trustworthy online presence.',
    deliverables: [
      'Business websites',
      'Personal portfolios',
      'Landing pages',
      'Responsive websites',
      'Frontend development',
    ],
    image: '/src/assets/images/hero_workspace_laptop_1794843220875.jpg',
    imageAlt: 'Modern laptop displaying clean responsive website design on a developer desk',
    iconKey: 'globe',
    defaultBudget: '₹999 – ₹1,999',
  },
  {
    id: 'Python Programming',
    shortTitle: 'Python Programming',
    categoryLabel: 'Scripts & Automation',
    startingPrice: '₹200/hr',
    description:
      'Practical Python scripts, small automation workflows, academic mini-projects, and step-by-step debugging support.',
    deliverables: [
      'Python basics',
      'Python scripts',
      'Automation',
      'Beginner projects',
      'Debugging assistance',
    ],
    image: '/src/assets/images/project_python_java_code_1794843223289.jpg',
    imageAlt: 'Developer display showing Python automation script and modular code structure',
    iconKey: 'terminal',
    defaultBudget: '₹200 – ₹1,000',
  },
  {
    id: 'Java Programming',
    shortTitle: 'Java Programming',
    categoryLabel: 'Core Java & OOP',
    startingPrice: '₹250/hr',
    description:
      'Clean object-oriented Java programs, structured mini-projects, and clear code walkthroughs tailored to your goals.',
    deliverables: [
      'Core Java',
      'Object-oriented programming',
      'Java applications',
      'Mini-projects',
      'Programming explanations',
    ],
    image: '/src/assets/images/project_python_java_code_1794843223289.jpg',
    imageAlt: 'Dual-pane editor displaying Core Java object-oriented classes',
    iconKey: 'coffee',
    defaultBudget: '₹250 – ₹1,200',
  },
  {
    id: 'PowerPoint Presentation Design',
    shortTitle: 'PPT Design',
    categoryLabel: 'Slides & Pitch Decks',
    startingPrice: '₹300',
    description:
      'Visually cohesive PowerPoint decks with clear hierarchy, diagrams, and balanced layouts for academic or business use.',
    deliverables: [
      'Professional presentations',
      'College project PPTs',
      'Business presentations',
      'Pitch decks',
    ],
    image: '/src/assets/images/service_ppt_tutoring_1794843224153.jpg',
    imageAlt: 'Laptop showing a structured corporate pitch deck presentation on a studio desk',
    iconKey: 'presentation',
    defaultBudget: '₹300 – ₹800',
  },
  {
    id: 'Technical Documentation',
    shortTitle: 'Documentation',
    categoryLabel: 'Reports & Resumes',
    startingPrice: '₹200',
    description:
      'Cleanly formatted technical reports, software documentation, and crisp single-page resumes ready for submission.',
    deliverables: [
      'Project reports',
      'Technical documentation',
      'Resume formatting',
      'Professional documents',
    ],
    image: '/src/assets/images/service_ppt_tutoring_1794843224153.jpg',
    imageAlt: 'Organized project documentation notes beside a sleek laptop on a lavender desk mat',
    iconKey: 'fileText',
    defaultBudget: '₹200 – ₹600',
  },
  {
    id: 'Online Coding Tutoring',
    shortTitle: 'Online Coding Tutoring',
    categoryLabel: '1-on-1 Live Learning',
    startingPrice: '₹200/hr',
    description:
      'Patient, beginner-friendly one-to-one online sessions focused on building real programming confidence through practice.',
    deliverables: [
      'Python for beginners',
      'Java for beginners',
      'C programming',
      'Practical coding',
      'One-to-one online sessions',
    ],
    image: '/src/assets/images/hero_workspace_laptop_1794843220875.jpg',
    imageAlt: 'Clean online coding tutoring workstation ready for live screen-share sessions',
    iconKey: 'graduationCap',
    defaultBudget: '₹200 – ₹250/hr',
  },
  {
    id: 'Poster & Social Media Branding',
    shortTitle: 'Poster & Brand Design',
    categoryLabel: 'Social Media & Branding',
    startingPrice: '₹250',
    description:
      'Eye-catching advertising posters, social media promotional creatives, and cohesive branding visuals designed to make your business stand out.',
    deliverables: [
      'Social media ad posters',
      'Instagram & WhatsApp promotional creatives',
      'Brand color & typography kits',
      'Event, product & launch flyers',
      'Cohesive business banners & highlights',
    ],
    image: '/src/assets/images/service_poster_branding_1794843614216.jpg',
    imageAlt: 'Studio showcase of social media advertising posters and brand color palette cards',
    iconKey: 'palette',
    defaultBudget: '₹250 – ₹800',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'farefusion',
    name: 'FareFusion',
    category: 'Websites',
    shortDescription:
      'Ride price comparison platform concept designed to let commuters compare estimated fares and ETA across options in one view.',
    fullOverview:
      'FareFusion is a ride fare comparison platform concept focused on reducing decision fatigue for daily commuters. The interface organizes pickup/drop routes, fare tiers, and estimated arrival times into a clean, scannable comparison layout.',
    highlights: [
      'Side-by-side fare breakdown and ride category comparison cards',
      'Responsive desktop and mobile layout built for quick route checks',
      'Clear pricing table structure with zero visual clutter',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI'],
    image: '/src/assets/images/project_farefusion_mockup_1794843221698.jpg',
    imageAlt: 'Illustrative mockup of FareFusion ride price comparison web interface on a laptop',
    mockupLabel: 'Illustrative Concept Mockup',
  },
  {
    id: 'medqueueai',
    name: 'MedQueueAI',
    category: 'AI / ML',
    secondaryCategory: 'Websites',
    shortDescription:
      'AI healthcare and emergency assistance project concept built to streamline symptom intake and patient queue visibility.',
    fullOverview:
      'MedQueueAI explores how a calm, accessible web interface can assist patients with initial symptom organization and clinic queue tracking during time-sensitive visits.',
    highlights: [
      'Structured symptom intake flow paired with readable queue cards',
      'High-contrast, low-stress typography tailored for healthcare clarity',
      'Cross-device tablet and desktop layout architecture',
    ],
    techStack: ['React', 'Python', 'UI Architecture', 'AI Workflow Concept'],
    image: '/src/assets/images/project_medqueue_mockup_1794843225336.jpg',
    imageAlt: 'Illustrative mockup of MedQueueAI healthcare queue and triage interface',
    mockupLabel: 'Illustrative Concept Mockup',
  },
  {
    id: 'personal-portfolio',
    name: 'Personal Portfolio',
    category: 'Websites',
    shortDescription:
      'Responsive developer portfolio crafted with light/dark theming, accessible navigation, and direct client enquiry workflows.',
    fullOverview:
      'A conversion-focused freelance portfolio built to showcase web development, programming, presentation design, and coding tutoring services with clear pricing and instant WhatsApp enquiry generation.',
    highlights: [
      'Full light and dark theme support with persistent user preference',
      'Service-to-contact auto-selection and validated WhatsApp enquiry builder',
      'Optimized across desktop, laptop, tablet, Android, and iPhone viewports',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    image: '/src/assets/images/hero_workspace_laptop_1794843220875.jpg',
    imageAlt: 'Illustrative preview of a responsive developer portfolio on a modern laptop',
    mockupLabel: 'Live Web Architecture',
  },
  {
    id: 'python-projects',
    name: 'Python Projects',
    category: 'Python',
    shortDescription:
      'Collection of practical Python programming scripts, file automation helpers, and beginner-friendly problem-solving modules.',
    fullOverview:
      'A suite of clean, well-documented Python programs covering file organization scripts, CSV data parsing utilities, and structured mini-projects designed for practical tasks and student learning.',
    highlights: [
      'Modular functions with readable comments for easy learning and maintenance',
      'Practical automation helpers for repetitive data and file workflows',
      'Debugging exercises and step-by-step logic explanations',
    ],
    techStack: ['Python 3', 'Automation Scripts', 'File I/O', 'CLI Tools'],
    image: '/src/assets/images/project_python_java_code_1794843223289.jpg',
    imageAlt: 'Illustrative IDE preview showing structured Python automation code',
    mockupLabel: 'Illustrative Code Preview',
  },
  {
    id: 'java-applications',
    name: 'Java Applications',
    category: 'Java',
    shortDescription:
      'Core Java and object-oriented programming projects demonstrating clean class design, encapsulation, and menu-driven logic.',
    fullOverview:
      'Core Java console and mini-application builds structured around solid OOP principles—classes, inheritance, interfaces, and collection handling—suitable for academic projects and foundational mastery.',
    highlights: [
      'Clean separation of models, services, and user input validation',
      'Hands-on OOP demonstrations (encapsulation, polymorphism, collections)',
      'Accompanied by clear documentation and line-by-line walkthroughs',
    ],
    techStack: ['Core Java', 'OOP', 'Collections', 'Console Applications'],
    image: '/src/assets/images/project_python_java_code_1794843223289.jpg',
    imageAlt: 'Illustrative IDE preview displaying Core Java object-oriented class structure',
    mockupLabel: 'Illustrative Code Preview',
  },
  {
    id: 'social-media-branding',
    name: 'Social Media Ad Posters & Brand Kits',
    category: 'Branding',
    shortDescription:
      'Advertising poster series and cohesive brand identity kits built for Instagram, WhatsApp promotions, and small business launches.',
    fullOverview:
      'A creative branding and advertising showcase demonstrating consistent typography, color systems, and conversion-focused poster layouts for product drops, local businesses, and digital campaigns.',
    highlights: [
      'Cohesive brand palette and font pairing across multi-post social campaigns',
      'Clean promotional hierarchy highlighting offers, product visuals, and clear CTAs',
      'Ready-to-post formats sized for Instagram feeds, stories, and WhatsApp status',
    ],
    techStack: ['Poster Design', 'Social Media Ads', 'Brand Identity', 'Visual Hierarchy'],
    image: '/src/assets/images/service_poster_branding_1794843614216.jpg',
    imageAlt: 'Illustrative showcase of cohesive social media posters and brand palette cards',
    mockupLabel: 'Illustrative Branding Showcase',
  },
];

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'web-dev',
    title: 'Website Development',
    subtitle: 'Clean, responsive websites tailored to your brand and goals.',
    tiers: [
      {
        name: 'Landing Page',
        price: '₹999',
        serviceValue: 'Website Development',
        budgetHint: '₹999 (Landing Page)',
        summary: 'Single-page responsive showcase with clear call-to-action.',
      },
      {
        name: 'Portfolio Website',
        price: '₹1,499',
        serviceValue: 'Website Development',
        budgetHint: '₹1,499 (Portfolio Website)',
        summary: 'Multi-section personal site for creatives, students, or consultants.',
      },
      {
        name: 'Business Website',
        price: '₹1,999',
        serviceValue: 'Website Development',
        budgetHint: '₹1,999+ (Business Website)',
        summary: 'Structured multi-section company website built for client trust.',
      },
    ],
  },
  {
    id: 'programming',
    title: 'Programming & Tutoring',
    subtitle: 'Practical 1-on-1 online lessons and guided coding help.',
    tiers: [
      {
        name: 'Python Tutoring',
        price: '₹200',
        unit: '/hour',
        serviceValue: 'Online Coding Tutoring',
        budgetHint: '₹200/hour (Python Tutoring)',
        summary: 'Fundamentals, logic building, scripts, and hands-on practice.',
      },
      {
        name: 'Java Tutoring',
        price: '₹250',
        unit: '/hour',
        serviceValue: 'Online Coding Tutoring',
        budgetHint: '₹250/hour (Java Tutoring)',
        summary: 'Core Java syntax, OOP concepts, and mini-project guidance.',
      },
      {
        name: 'C Programming',
        price: '₹200',
        unit: '/hour',
        serviceValue: 'Online Coding Tutoring',
        budgetHint: '₹200/hour (C Programming)',
        summary: 'Pointers, arrays, functions, and foundational problem solving.',
      },
    ],
  },
  {
    id: 'design-docs',
    title: 'Design, Branding & Documentation',
    subtitle: 'Polished slides, social media ad posters, brand kits, and technical reports.',
    tiers: [
      {
        name: 'Social Media Ad Poster',
        price: '₹250',
        unit: '/poster',
        serviceValue: 'Poster & Social Media Branding',
        budgetHint: '₹250 (Social Media Ad Poster)',
        summary: 'Custom promotional poster sized for Instagram, WhatsApp, or event flyers.',
      },
      {
        name: 'Brand Promo Pack (3 Posters)',
        price: '₹600',
        serviceValue: 'Poster & Social Media Branding',
        budgetHint: '₹600 (Brand Promo Pack)',
        summary: '3 cohesive ad posters plus a matching brand color & font guide.',
      },
      {
        name: '10-Slide PPT',
        price: '₹300',
        serviceValue: 'PowerPoint Presentation Design',
        budgetHint: '₹300 (10-Slide PPT)',
        summary: 'Structured visual slides for college projects or business pitches.',
      },
      {
        name: 'Resume Formatting',
        price: '₹200',
        serviceValue: 'Technical Documentation',
        budgetHint: '₹200 (Resume Formatting)',
        summary: 'Clean, ATS-readable layout with sharp typographic hierarchy.',
      },
      {
        name: 'Project Documentation',
        price: '₹400',
        serviceValue: 'Technical Documentation',
        budgetHint: '₹400 (Project Documentation)',
        summary: 'Organized technical report formatting, diagrams, and sections.',
      },
    ],
  },
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: 'affordable',
    title: 'Affordable Pricing',
    description:
      'Transparent, student- and small-business-friendly introductory rates with clear scope upfront.',
    iconKey: 'wallet',
  },
  {
    id: 'modern-designs',
    title: 'Modern Designs',
    description:
      'Minimalist, clean interfaces with thoughtful typography and balanced spacing—never cluttered.',
    iconKey: 'sparkles',
  },
  {
    id: 'responsive',
    title: 'Responsive Websites',
    description:
      'Every layout adapts smoothly across desktop monitors, laptops, tablets, Android, and iPhone.',
    iconKey: 'smartphone',
  },
  {
    id: 'communication',
    title: 'Clear Communication',
    description:
      'Direct updates in plain language so you always know progress, milestones, and next steps.',
    iconKey: 'messageSquare',
  },
  {
    id: 'on-time',
    title: 'On-Time Delivery',
    description:
      'Realistic timelines agreed before starting, with steady progress checkpoints along the way.',
    iconKey: 'clock',
  },
  {
    id: 'teaching',
    title: 'Beginner-Friendly Teaching',
    description:
      'Patient, practical coding explanations tailored to your pace—no intimidating jargon.',
    iconKey: 'bookOpen',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Share Your Requirements',
    description:
      'Tell me what you want to build, format, or learn via the enquiry form or WhatsApp.',
  },
  {
    stepNumber: '02',
    title: 'Discuss Price and Timeline',
    description:
      'We align on exact deliverables, realistic milestones, and a transparent final quote.',
  },
  {
    stepNumber: '03',
    title: 'Development and Updates',
    description:
      'I build or prepare your work systematically and share previews for your feedback.',
  },
  {
    stepNumber: '04',
    title: 'Final Delivery',
    description:
      'You receive the polished, tested files or live tutoring sessions with walkthrough support.',
  },
];

export const TESTIMONIAL_PLACEHOLDERS: TestimonialPlaceholder[] = [
  {
    id: 'sample-1',
    label: 'Sample Testimonial Placeholder',
    sampleRole: 'Website Client Review Slot',
    sampleProjectType: 'Business / Portfolio Website',
    placeholderNote:
      'Reserved for genuine client feedback once upcoming website freelance projects are delivered and reviewed.',
  },
  {
    id: 'sample-2',
    label: 'Sample Testimonial Placeholder',
    sampleRole: 'Tutoring Student Feedback Slot',
    sampleProjectType: 'Python / Java 1-on-1 Sessions',
    placeholderNote:
      'Reserved for verified student testimonials reflecting session clarity, pacing, and practical coding progress.',
  },
  {
    id: 'sample-3',
    label: 'Sample Testimonial Placeholder',
    sampleRole: 'Branding, PPT & Docs Client Slot',
    sampleProjectType: 'Social Media Posters, Branding & Reports',
    placeholderNote:
      'Reserved for authentic client reviews on social media poster design, brand consistency, slide decks, and turnaround reliability.',
  },
];
