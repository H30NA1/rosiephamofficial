// Translation types for type-safe i18n
export interface CommonTranslations {
  nav: {
    home: string;
    about: string;
    charts: string;
    news: string;
    contact: string;
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
    followUs: string;
    quickLinks: string;
    contact: string;
  };
  cta: {
    joinNow: string;
    learnMore: string;
    getStarted: string;
    contactUs: string;
    viewCharts: string;
  };
}

export interface HomeTranslations {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    stats: {
      experience: string;
      expert: string;
      analysis: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    items: {
      signals: { title: string; description: string };
      analysis: { title: string; description: string };
      support: { title: string; description: string };
      education: { title: string; description: string };
    };
  };
  liveTrade: {
    title: string;
    subtitle: string;
  };
  charts: {
    title: string;
    subtitle: string;
    forex: string;
    crypto: string;
  };
  news: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  community: {
    title: string;
    description: string;
  };
}

export interface AboutTranslations {
  title: string;
  subtitle: string;
  story: {
    title: string;
    paragraphs: string[];
  };
  mission: {
    title: string;
    description: string;
  };
  values: {
    title: string;
    items: { title: string; description: string }[];
  };
}

export interface ChartsTranslations {
  title: string;
  subtitle: string;
  forex: string;
  crypto: string;
  description: string;
}

export interface NewsTranslations {
  title: string;
  subtitle: string;
  filters: {
    all: string;
    high: string;
    medium: string;
    low: string;
  };
  table: {
    time: string;
    currency: string;
    impact: string;
    event: string;
    actual: string;
    forecast: string;
    previous: string;
  };
  noNews: string;
  calendar: string;
  economicCalendar: string;
  eventsToday: string;
  upcomingWeek: string;
  upcomingMonth: string;
  upcomingEvents: string;
  impactLabel: string;
  highImpact: string;
  mediumImpact: string;
  lowImpact: string;
  holiday: string;
  nonEconomic: string;
  noEventsFound: string;
  noEventsToday: string;
  noEventsPeriod: string;
  adjustFilters: string;
  source: string;
  live: string;
  noData: string;
}

export interface ContactTranslations {
  title: string;
  subtitle: string;
  form: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    sending: string;
  };
  success: string;
  error: string;
  info: {
    title: string;
    email: string;
    phone: string;
    location: string;
  };
}

export interface Translations {
  common: CommonTranslations;
  home: HomeTranslations;
  about: AboutTranslations;
  charts: ChartsTranslations;
  news: NewsTranslations;
  contact: ContactTranslations;
}

export type SupportedLanguage =
  | 'en' | 'zh-CN' | 'zh-TW' | 'es' | 'ar' | 'hi' | 'pt' | 'bn' | 'ru' | 'ja'
  | 'de' | 'fr' | 'ko' | 'tr' | 'it' | 'pl' | 'uk' | 'nl' | 'ro' | 'el'
  | 'cs' | 'sv' | 'hu' | 'th' | 'vi' | 'id' | 'ms' | 'fil' | 'my' | 'km' | 'lo';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  region: 'global' | 'asia' | 'europe' | 'americas' | 'sea';
}
