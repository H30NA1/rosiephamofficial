# Translation Folder Structure

## Before (Flat Structure)
```
src/locales/vi/
├── common.ts
├── home.ts
├── about.ts
├── charts.ts
├── news.ts
├── contact.ts
└── index.ts
```

## After (Organized Structure) ✅
```
src/locales/vi/
├── home/
│   └── index.ts          # All home page text
├── about/
│   └── index.ts          # All about page text
├── charts/
│   └── index.ts          # All charts page text
├── news/
│   └── index.ts          # All news/calendar text
├── contact/
│   └── index.ts          # All contact page text
├── header/
│   └── index.ts          # Navigation menu items
├── footer/
│   └── index.ts          # Footer links and text
├── common/
│   └── index.ts          # Shared CTAs and buttons
└── index.ts              # Main export file
```

## Benefits of New Structure

### 1. **Better Organization**
- Each page has its own dedicated folder
- Easy to find and update specific page translations
- Clear separation between components (Header, Footer, Pages)

### 2. **Scalability**
- Easy to add more translations per page
- Can add sub-folders if pages grow complex
- Example: `home/hero/`, `home/features/`, etc.

### 3. **Maintainability**
- Changes to one page don't affect others
- Easier code reviews
- Better git diffs

### 4. **Team Collaboration**
- Multiple people can work on different pages
- Less merge conflicts
- Clear ownership of translation sections

## Translation Coverage

### ✅ Fully Translated Components

1. **Header Navigation**
   - Home, About, Charts, News, Contact
   - Get Started button

2. **Footer**
   - Quick Links section
   - Contact information
   - Social media labels
   - Copyright text

3. **Home Page**
   - Hero section
   - Statistics
   - Features (4 items)
   - Live trade feed
   - Charts section
   - News section
   - Community CTA

4. **About Page**
   - Title and subtitle
   - Journey story (3 paragraphs)
   - Mission statement
   - Core values (4 items)

5. **Charts Page**
   - Page title and description
   - Market tabs (Forex, Crypto)
   - TradingView chart interface

6. **News Page**
   - Economic calendar
   - Filter options
   - Table headers
   - Impact labels
   - Status messages

7. **Contact Page**
   - Form fields
   - Submit button
   - Success/error messages
   - Contact information

8. **Common Elements**
   - All CTA buttons
   - Shared navigation
   - Shared footer elements

## How Translations Are Loaded

```typescript
// Main index.ts combines all translations
import { home } from './home';
import { about } from './about';
import { charts } from './charts';
import { news } from './news';
import { contact } from './contact';
import { header } from './header';
import { footer } from './footer';
import { common as commonCta } from './common';

// Combine into CommonTranslations structure
const common: CommonTranslations = {
  nav: header.nav,
  footer: footer,
  cta: commonCta.cta,
};

// Export complete translations
export const vi: Translations = {
  common,
  home,
  about,
  charts,
  news,
  contact,
};
```

## Usage in Components

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { t, language } = useLanguage();
  
  return (
    <div>
      <h1>{t.home.hero.title}</h1>
      <p>{t.home.hero.description}</p>
      <button>{t.common.cta.getStarted}</button>
    </div>
  );
}
```

## TradingView Chart Integration

```typescript
// Charts now use dynamic language
const { t, language } = useLanguage();

useEffect(() => {
  const script = document.createElement("script");
  script.innerHTML = JSON.stringify({
    // ... other config
    locale: language, // ✅ Dynamic language
    // ... other config
  });
}, [activeMarket, language]); // ✅ Re-render on language change
```

This ensures the TradingView chart interface matches the website language!
