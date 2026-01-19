import { ContactTranslations } from '../../types';

export const contact: ContactTranslations = {
    title: 'ติดต่อเรา',
    subtitle: 'ติดต่อทีมงานของเราสำหรับการสนับสนุนการเทรดและสอบถามข้อมูล',
    form: {
        name: 'ชื่อ-นามสกุล',
        email: 'ที่อยู่อีเมล',
        subject: 'หัวข้อ',
        message: 'ข้อความของคุณ',
        submit: 'ส่งข้อความ',
        sending: 'กำลังส่ง...',
    },
    success: 'ส่งข้อความสำเร็จ! เราจะตอบกลับคุณภายใน 24 ชั่วโมง',
    error: 'ส่งข้อความไม่สำเร็จ โปรดลองอีกครั้งหรือติดต่อเราโดยตรง',
    info: {
        title: 'ข้อมูลการติดต่อ',
        email: 'อีเมล',
        phone: 'โทรศัพท์',
        location: 'ที่ตั้ง',
    },
};
