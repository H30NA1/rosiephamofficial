import { Translations, SupportedLanguage } from './types';
import { en } from './en';
import { vi } from './vi';
import { zhCN } from './zh-CN';

// Lazy loading for other languages to reduce bundle size
const translations: Record<SupportedLanguage, Translations | (() => Promise<{ default: Translations }>)> = {
  en,
  vi,
  'zh-CN': zhCN,
  'zh-TW': () => import('./zh-TW').then(m => ({ default: m.zhTW })),
  es: () => import('./es').then(m => ({ default: m.es })),
  ar: () => import('./ar').then(m => ({ default: m.ar })),
  hi: () => import('./hi').then(m => ({ default: m.hi })),
  pt: () => import('./pt').then(m => ({ default: m.pt })),
  bn: () => import('./bn').then(m => ({ default: m.bn })),
  ru: () => import('./ru').then(m => ({ default: m.ru })),
  ja: () => import('./ja').then(m => ({ default: m.ja })),
  de: () => import('./de').then(m => ({ default: m.de })),
  fr: () => import('./fr').then(m => ({ default: m.fr })),
  ko: () => import('./ko').then(m => ({ default: m.ko })),
  tr: () => import('./tr').then(m => ({ default: m.tr })),
  it: () => import('./it').then(m => ({ default: m.it })),
  pl: () => import('./pl').then(m => ({ default: m.pl })),
  uk: () => import('./uk').then(m => ({ default: m.uk })),
  nl: () => import('./nl').then(m => ({ default: m.nl })),
  ro: () => import('./ro').then(m => ({ default: m.ro })),
  el: () => import('./el').then(m => ({ default: m.el })),
  cs: () => import('./cs').then(m => ({ default: m.cs })),
  sv: () => import('./sv').then(m => ({ default: m.sv })),
  hu: () => import('./hu').then(m => ({ default: m.hu })),
  th: () => import('./th').then(m => ({ default: m.th })),
  id: () => import('./id').then(m => ({ default: m.id })),
  ms: () => import('./ms').then(m => ({ default: m.ms })),
  fil: () => import('./fil').then(m => ({ default: m.fil })),
  my: () => import('./my').then(m => ({ default: m.my })),
  km: () => import('./km').then(m => ({ default: m.km })),
  lo: () => import('./lo').then(m => ({ default: m.lo })),
};

export async function getTranslations(lang: SupportedLanguage): Promise<Translations> {
  const translation = translations[lang];
  if (typeof translation === 'function') {
    const loaded = await translation();
    return loaded.default;
  }
  return translation;
}

export function getTranslationsSync(lang: SupportedLanguage): Translations {
  const translation = translations[lang];
  if (typeof translation === 'function') {
    // Fallback to English if translation not loaded
    return en;
  }
  return translation;
}

export { translations };
export * from './types';
export * from './languages';
