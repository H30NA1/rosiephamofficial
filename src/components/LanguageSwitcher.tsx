import { useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages, getLanguagesByRegion } from '@/locales/languages';
import { SupportedLanguage } from '@/locales/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LanguageSwitcher() {
  const { language, setLanguage, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages[language];
  
  const globalLangs = getLanguagesByRegion('global');
  const asiaLangs = getLanguagesByRegion('asia');
  const europeLangs = getLanguagesByRegion('europe');
  const americasLangs = getLanguagesByRegion('americas');
  const seaLangs = getLanguagesByRegion('sea');

  const handleSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const renderLanguageItem = (lang: typeof currentLang) => (
    <DropdownMenuItem
      key={lang.code}
      onClick={() => handleSelect(lang.code)}
      className="flex items-center justify-between cursor-pointer hover:bg-primary/10"
    >
      <span className="flex items-center gap-2">
        <span className="text-base">{lang.flag}</span>
        <span className="text-sm">{lang.nativeName}</span>
      </span>
      {language === lang.code && (
        <Check className="h-4 w-4 text-primary" />
      )}
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 px-2 hover:bg-primary/10"
          disabled={isLoading}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-sm">{currentLang.flag} {currentLang.nativeName}</span>
          <span className="sm:hidden text-sm">{currentLang.flag}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg z-[100]">
        <ScrollArea className="h-[400px]">
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            🌍 Global
          </DropdownMenuLabel>
          {globalLangs.map(renderLanguageItem)}
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            🌏 Southeast Asia
          </DropdownMenuLabel>
          {seaLangs.map(renderLanguageItem)}
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            🌏 Asia
          </DropdownMenuLabel>
          {asiaLangs.map(renderLanguageItem)}
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            🌍 Europe
          </DropdownMenuLabel>
          {europeLangs.map(renderLanguageItem)}
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            🌎 Americas
          </DropdownMenuLabel>
          {americasLangs.map(renderLanguageItem)}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
