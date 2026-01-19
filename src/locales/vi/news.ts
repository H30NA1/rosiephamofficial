import { NewsTranslations } from '../types';

export const news: NewsTranslations = {
  title: 'Lịch Kinh Tế',
  subtitle: 'Theo dõi các sự kiện kinh tế có tác động cao và tin tức ảnh hưởng đến thị trường tiền tệ toàn cầu',
  filters: {
    all: 'Tất Cả Sự Kiện',
    high: 'Tác Động Cao',
    medium: 'Tác Động Trung Bình',
    low: 'Tác Động Thấp',
  },
  table: {
    time: 'Thời Gian',
    currency: 'Tiền Tệ',
    impact: 'Tác Động',
    event: 'Sự Kiện',
    actual: 'Thực Tế',
    forecast: 'Dự Báo',
    previous: 'Trước Đó',
  },
  noNews: 'Không có sự kiện kinh tế nào được lên lịch cho hôm nay.',
};
