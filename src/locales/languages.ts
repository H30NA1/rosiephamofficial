import { LanguageInfo, SupportedLanguage } from './types';

export const languages: Record<SupportedLanguage, LanguageInfo> = {
  // Global/Major Languages
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'global' },
  'zh-CN': { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', region: 'asia' },
  'zh-TW': { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼', region: 'asia' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'americas' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'global' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'asia' },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', region: 'americas' },
  bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', region: 'asia' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', region: 'europe' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'asia' },
  
  // European Languages
  de: { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'europe' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'europe' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', region: 'asia' },
  tr: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', region: 'europe' },
  it: { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'europe' },
  pl: { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', region: 'europe' },
  uk: { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', region: 'europe' },
  nl: { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', region: 'europe' },
  ro: { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', region: 'europe' },
  el: { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', region: 'europe' },
  cs: { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', region: 'europe' },
  sv: { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', region: 'europe' },
  hu: { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', region: 'europe' },
  
  // Southeast Asian Languages
  th: { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', region: 'sea' },
  vi: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', region: 'sea' },
  id: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', region: 'sea' },
  ms: { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', region: 'sea' },
  fil: { code: 'fil', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', region: 'sea' },
  my: { code: 'my', name: 'Burmese', nativeName: 'မြန်မာဘာသာ', flag: '🇲🇲', region: 'sea' },
  km: { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭', region: 'sea' },
  lo: { code: 'lo', name: 'Lao', nativeName: 'ລາວ', flag: '🇱🇦', region: 'sea' },
};

export const getLanguagesByRegion = (region: LanguageInfo['region']) => {
  return Object.values(languages).filter(lang => lang.region === region);
};

export const getAllLanguages = () => Object.values(languages);
