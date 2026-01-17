import { useState, useEffect } from "react";
import { MessageCircle, Users, ExternalLink, CheckCircle2, Search, Phone, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { liveSignals, ZaloSignal } from "@/data/zalo-signals";
import rosieSecondary from "@/assets/rosie-secondary.png";

// IMPORTANT: Zalo API requires an OA Access Token. 
// You can update these values in your environment or directly here.
const ZALO_CONFIG = {
    OA_ACCESS_TOKEN: 'nbdU38rePN36KTyEZMPhTCvLtmU2UXOxl3Ug0BSEG0UYMQG9u2jdACb9lJJtS6uommUz4Fn1PJxT3w01rcf2U-bIedN2AHXKZt_VHeSNDN-ULSDcds0SMAKan4c8IYbnj7xCUOm8SrcVQx5mbobRNw1EY4MvU3DvgIlgNE5-5tF25lDHmtWlNCyOatdoGMvxw1QHIjyYLKUMP-4wtXCN4lrMmnhq0Nu7k4kwF8O8JowsEQmoz4rr3_fzpIhUFGLJdMRgNwaID57YLVnghmD8G9Cod3w1Ho0Wc0JT2B1DDogv5lOnzNqf2_Otq1hiNmOefndEDOPR2alF0knjsKWLTCSlh5VwUH9RxY3qNEDnGNRAAQ1b_WLQIqn7Um6CIubsOtC',
    GROUP_ID: '', // Fill this once you have your OA Group ID from the API
};

const ZaloGroupFeed = () => {
    const [messages, setMessages] = useState<ZaloSignal[]>(liveSignals);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const fetchZaloMessages = async () => {
            if (!ZALO_CONFIG.OA_ACCESS_TOKEN || !ZALO_CONFIG.GROUP_ID) return;

            try {
                // Using Zalo v3.0 GMF Endpoint
                const response = await fetch(`https://openapi.zalo.me/v3.0/oa/group/conversation?group_id=${ZALO_CONFIG.GROUP_ID}`, {
                    headers: {
                        'access_token': ZALO_CONFIG.OA_ACCESS_TOKEN
                    }
                });

                const data = await response.json();

                if (data.error === 0 && data.data) {
                    // Map Zalo API response to our UI structure
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const formattedMessages: ZaloSignal[] = data.data.map((m: any) => ({
                        id: m.message_id,
                        sender: m.from_name || "Rossy",
                        role: "admin",
                        content: m.message,
                        timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        image: m.thumb,
                        labels: m.type === "image" ? ["IMAGE"] : ["SIGNAL"]
                    }));
                    setMessages(formattedMessages);
                    setIsLive(true);
                } else {
                    console.log("Zalo API Error or No ID, falling back to mock data");
                    setIsLive(false);
                }
            } catch (error) {
                console.error("Zalo Fetch Failed:", error);
                setIsLive(false);
            }
        };

        fetchZaloMessages();
    }, []);

    return (
        <div className="bg-[#E2E9F1] rounded-2xl shadow-elevated overflow-hidden border border-[#D0D7DE] max-w-2xl mx-auto flex flex-col h-[700px]">
            {/* Zalo Header */}
            <div className="bg-[#0068FF] text-white px-4 py-3 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden bg-white/10 flex items-center justify-center relative shadow-inner">
                        <img src={rosieSecondary} alt="Rossy Avatar" className="w-full h-full object-cover scale-110" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0068FF] rounded-full"></div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm md:text-base flex items-center gap-1">
                            Rossyy 🌹 Trading Group💕
                            <CheckCircle2 className="w-3.5 h-3.5 fill-white text-[#0068FF]" />
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-white/80">
                                <Users className="w-3 h-3" />
                                <span>52 thành viên</span>
                            </div>
                            <span className="text-[9px] bg-green-500/20 text-green-300 px-1 rounded flex items-center gap-1">
                                <div className={cn(
                                    "w-1 h-1 rounded-full animate-pulse",
                                    isLive ? "bg-green-400" : "bg-orange-400"
                                )} />
                                {isLive ? "Live API Active" : "Local Sync Ready"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Message Feed Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-hide">
                <div className="text-center my-2">
                    <span className="bg-black/10 text-[10px] text-black/60 px-2 py-0.5 rounded-full uppercase tracking-wider font-medium">
                        Hôm nay
                    </span>
                </div>

                {messages.map((msg) => (
                    <div key={msg.id} className="flex gap-2 animate-fade-in group">
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1 shadow-sm border border-white">
                            <img
                                src={msg.sender === "Rossy" ? "https://s120-ava-talk.zadn.vn/4/8/2/1/1/120/e99dbd2b76b674231461032a74103b2a.jpg" : "/logo.jpg"}
                                alt={msg.sender}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Message Bubble */}
                        <div className="flex flex-col gap-1 max-w-[85%]">
                            <span className="text-[11px] font-semibold text-gray-500 ml-1">
                                {msg.sender}
                                {msg.role === "admin" && (
                                    <span className="ml-1 text-[9px] bg-[#D1E4FF] text-[#0068FF] px-1.5 rounded-full font-bold">Admin</span>
                                )}
                            </span>

                            <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm border border-black/5 relative group">
                                {/* Labels/Badges inside message */}
                                {msg.labels && msg.labels.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {msg.labels.map((label, idx) => (
                                            <span key={idx} className="bg-[#0068FF]/10 text-[#0068FF] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <p className="text-sm text-[#1A1A1A] leading-relaxed break-words whitespace-pre-wrap font-medium">
                                    {msg.content}
                                </p>

                                {msg.image && (
                                    <div className="mt-3 rounded-lg overflow-hidden border border-black/5 shadow-inner bg-gray-50">
                                        <img
                                            src={msg.image}
                                            alt="Trade Result"
                                            className="w-full h-auto cursor-zoom-in hover:opacity-95 transition-opacity"
                                        />
                                    </div>
                                )}

                                <div className="mt-1 flex items-center justify-end">
                                    <span className="text-[9px] text-gray-400 font-medium">{msg.timestamp}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Zalo Footer / Call to Action */}
            <div className="bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col gap-3">
                    <p className="text-xs text-muted-foreground text-center italic">
                        This is a free group. For faster signals and 1-1 support:
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-400 truncate">
                            Join link to access 1-1 faster signal group...
                        </div>
                        <a
                            href="https://zalo.me/g/sxkwkm310"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0068FF] hover:bg-[#005AE0] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-soft transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 whitespace-nowrap"
                        >
                            JOIN VIP
                            <MessageCircle className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZaloGroupFeed;
