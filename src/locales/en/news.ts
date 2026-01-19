import { NewsTranslations } from '../types';

export const news: NewsTranslations = {
  title: 'Economic Calendar',
  subtitle: 'Track high-impact economic events and news releases affecting global currency markets',
  filters: {
    all: 'All Events',
    high: 'High Impact',
    medium: 'Medium Impact',
    low: 'Low Impact',
  },
  table: {
    time: 'Time',
    currency: 'Currency',
    impact: 'Impact',
    event: 'Event',
    actual: 'Actual',
    forecast: 'Forecast',
    previous: 'Previous',
  },
  noNews: 'No economic events scheduled for today.',
};
