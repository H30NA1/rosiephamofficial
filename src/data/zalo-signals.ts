export interface ZaloSignal {
    id: number;
    sender: string;
    role: "admin" | "member";
    content: string;
    image?: string;
    timestamp: string;
    labels?: string[];
}

export const liveSignals: ZaloSignal[] = [
    {
        id: 1,
        sender: "Rossy",
        role: "admin",
        content: "📊 PHÂN TÍCH VÀNG (XAUUSD)\n\nKhu vực chờ mua: 2045 - 2048\nTP 1: 2055\nTP 2: 2065\nSL: 2038\n\nLưu ý quản lý vốn 1-2% tài khoản nhé cả nhà! 🌹",
        timestamp: "09:15",
        labels: ["ANALYSIS", "GOLD"]
    },
    {
        id: 2,
        sender: "Rossy",
        role: "admin",
        content: "Feedback tài khoản khách hàng copy trade tuần qua. Lợi nhuận ổn định duy trì 15-20%/tháng. 💰",
        image: "https://storage.googleapis.com/gpt-engineer-file-uploads/RXf7bkS38pbgBmjY9TNngkTtS7h2/uploads/1768631636316.png",
        timestamp: "10:30",
        labels: ["COPY TRADE", "FEEDBACK"]
    },
    {
        id: 3,
        sender: "Rossy",
        role: "admin",
        content: "✅ TP1 HIT +70 PIPS! \n\nCả nhà dời SL về entry hoặc chốt 50% lợi nhuận nhé. Chúc mừng team mình! 🔥",
        timestamp: "13:35",
        labels: ["PROFIT HIT", "SUCCESS"]
    },
    {
        id: 4,
        sender: "Rossy",
        role: "admin",
        content: "Thị trường đang có tin mạnh lúc 20:30. Anh em lưu ý đóng lệnh hoặc dời SL an toàn trước tin nhé.",
        timestamp: "15:20",
        labels: ["MARKET NEWS", "WARNING"]
    }
];
