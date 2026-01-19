import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { SupportedLanguage, Translations } from '@/locales/types';
import { getTranslations, getTranslationsSync } from '@/locales';
import { en } from '@/locales/en';

const LANGUAGE_COOKIE_KEY = 'rosie_pham_language';
const COOKIE_EXPIRY_DAYS = 365;

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function detectBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === 'undefined') return 'en';
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  const langCode = browserLang?.split('-')[0]?.toLowerCase();
  
  const languageMap: Record<string, SupportedLanguage> = {
    en: 'en',
    vi: 'vi',
    zh: 'zh-CN',
    es: 'es',
    ar: 'ar',
    hi: 'hi',
    pt: 'pt',
    bn: 'bn',
    ru: 'ru',
    ja: 'ja',
    de: 'de',
    fr: 'fr',
    ko: 'ko',
    tr: 'tr',
    it: 'it',
    pl: 'pl',
    uk: 'uk',
    nl: 'nl',
    ro: 'ro',
    el: 'el',
    cs: 'cs',
    sv: 'sv',
    hu: 'hu',
    th: 'th',
    id: 'id',
    ms: 'ms',
    fil: 'fil',
    my: 'my',
    km: 'km',
    lo: 'lo',
  };

  return languageMap[langCode] || 'en';
}

function getInitialLanguage(): SupportedLanguage {
  // First check cookie
  const cookieLang = getCookie(LANGUAGE_COOKIE_KEY) as SupportedLanguage | null;
  if (cookieLang) return cookieLang;
  
  // Then check localStorage as fallback
  if (typeof localStorage !== 'undefined') {
    const storedLang = localStorage.getItem(LANGUAGE_COOKIE_KEY) as SupportedLanguage | null;
    if (storedLang) return storedLang;
  }
  
  // Finally detect from browser
  return detectBrowserLanguage();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(getInitialLanguage);
  const [translations, setTranslations] = useState<Translations>(getTranslationsSync(getInitialLanguage()));
  const [isLoading, setIsLoading] = useState(false);

  const setLanguage = useCallback(async (lang: SupportedLanguage) => {
    setIsLoading(true);
    setLanguageState(lang);
    
    // Persist to cookie and localStorage
    setCookie(LANGUAGE_COOKIE_KEY, lang, COOKIE_EXPIRY_DAYS);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LANGUAGE_COOKIE_KEY, lang);
    }
    
    // Update HTML lang attribute for SEO
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
    
    try {
      const newTranslations = await getTranslations(lang);
      setTranslations(newTranslations);
    } catch (error) {
      console.error('Failed to load translations:', error);
      setTranslations(en);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load initial translations
  useEffect(() => {
    const loadInitialTranslations = async () => {
      const initialLang = getInitialLanguage();
      if (typeof document !== 'undefined') {
        document.documentElement.lang = initialLang;
      }
      
      try {
        const initialTranslations = await getTranslations(initialLang);
        setTranslations(initialTranslations);
      } catch (error) {
        console.error('Failed to load initial translations:', error);
      }
    };
    
    loadInitialTranslations();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
