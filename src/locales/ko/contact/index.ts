import { ContactTranslations } from '../../types';

export const contact: ContactTranslations = {
    title: '문의하기',
    subtitle: '트레이딩 지원 및 문의 사항은 저희 팀에 연락해 주세요',
    form: {
        name: '성함',
        email: '이메일 주소',
        subject: '제목',
        message: '메시지 내용',
        submit: '메시지 보내기',
        sending: '보내는 중...',
    },
    success: '메시지가 성공적으로 전송되었습니다! 24시간 이내에 답변해 드리겠습니다.',
    error: '메시지 전송에 실패했습니다. 다시 시도하거나 직접 문의해 주세요.',
    info: {
        title: '연락처 정보',
        email: '이메일',
        phone: '전화번호',
        location: '위치',
    },
};
