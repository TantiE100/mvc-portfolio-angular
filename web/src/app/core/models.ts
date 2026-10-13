export interface Profile {
  id: number;
  full_name: string;
  headline: string;
  typed_roles: string;
  about_intro: string;
  about_summary: string;
  about_extra: string;
  birth_date: string | null;
  age: number | null;
  website: string | null;
  phone: string | null;
  city: string | null;
  degree: string | null;
  email: string | null;
  freelance: string | null;
  address: string | null;
  avatar_path: string;
  hero_path: string;
  latitude: number | null;
  longitude: number | null;
  map_span: number;
}

export interface SocialLink {
  css_class: string;
  icon: string;
  url: string;
}

export interface Stat {
  icon: string;
  value: number;
  label: string;
  caption: string | null;
}

export interface Skill {
  name: string;
  percent: number;
}

export interface ResumeItem {
  title: string;
  period: string | null;
  place: string | null;
  body: string | null;
  bullets: string[];
}

export interface PortfolioItem {
  category: string;
  title: string;
  description: string | null;
  image_path: string;
  details_url: string | null;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  profile: Profile;
  socials: SocialLink[];
  stats: Stat[];
  skills: Skill[];
  education: ResumeItem[];
  experience: ResumeItem[];
  portfolio: PortfolioItem[];
  portfolioCategories: string[];
  services: Service[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavLink {
  href: string;
  icon: string;
  label: string;
}
