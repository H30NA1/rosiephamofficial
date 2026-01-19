import { ContactTranslations } from '../../types';

export const contact: ContactTranslations = {
    title: 'お問い合わせ',
    subtitle: 'トレードのサポートやお問い合わせについては、当チームまでご連絡ください',
    form: {
        name: '氏名',
        email: 'メールアドレス',
        subject: '件名',
        message: 'メッセージ',
        submit: 'メッセージを送信',
        sending: '送信中...',
    },
    success: 'メッセージが正常に送信されました。24時間以内にご連絡いたします。',
    error: 'メッセージの送信に失敗しました。もう一度お試しいただくか、直接お問い合わせください。',
    info: {
        title: '連絡先情報',
        email: 'メール',
        phone: '電話',
        location: '所在地',
    },
};
