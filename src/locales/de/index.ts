import { Translations, CommonTranslations } from '../types';
import { home } from './home';
import { about } from './about';
import { charts } from './charts';
import { news } from './news';
import { contact } from './contact';
import { header } from './header';
import { footer } from './footer';
import { common as commonCta } from './common';

const common: CommonTranslations = {
    nav: header.nav,
    footer: footer,
    cta: commonCta.cta,
};

export const de: Translations = {
    common,
    home,
    about,
    charts,
    news,
    contact,
};
