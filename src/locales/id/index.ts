import { Translations, CommonTranslations } from '../types';
import { home } from './home';
import { about } from './about';
import { charts } from './charts';
import { news } from './news';
import { contact } from './contact';
import { header } from './header';
import { footer } from './footer';
import { common as commonCta } from './common';

// Combine header, footer, and common CTAs into the common translations structure
const common: CommonTranslations = {
    nav: header.nav,
    footer: footer,
    cta: commonCta.cta,
};

export const id: Translations = {
    common,
    home,
    about,
    charts,
    news,
    contact,
};
