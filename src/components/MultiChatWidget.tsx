import { useState } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const MultiChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const contacts = [
        {
            name: "Zalo",
            icon: (
                <div className="w-10 h-10 rounded-full bg-[#0068FF] flex items-center justify-center text-white shadow-lg">
                    <span className="font-bold text-xs">Zalo</span>
                </div>
            ),
            url: "https://zalo.me/0377895316",
            color: "hover:bg-[#0068FF]/10",
            textColor: "text-[#0068FF]",
        },
        {
            name: "WhatsApp",
            icon: (
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </div>
            ),
            url: "https://wa.me/84377895316",
            color: "hover:bg-[#25D366]/10",
            textColor: "text-[#25D366]",
        },
        {
            name: "Telegram",
            icon: (
                <div className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white shadow-lg">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.441-.168.575-.542.766-.746.785-.445.041-.782-.293-1.212-.575-.673-.441-1.054-.716-1.708-1.146-.755-.498-.266-.771.165-1.218.113-.117 2.073-1.899 2.112-2.066.005-.021.01-.098-.036-.139-.046-.041-.113-.027-.162-.016-.069.015-1.168.741-3.291 2.174-.312.214-.594.319-.846.313-.277-.006-.811-.157-1.208-.286-.487-.158-.874-.242-.84-.51.017-.14.212-.284.582-.432 2.274-1.023 3.791-1.698 4.551-2.025 2.171-.926 2.622-1.087 2.915-1.092.065-.001.209.015.302.091.078.064.099.15.105.218.006.069.006.136.001.272z" />
                    </svg>
                </div>
            ),
            url: "https://t.me/official_rosie_pham_96",
            color: "hover:bg-[#0088cc]/10",
            textColor: "text-[#0088cc]",
        }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Expanded Menu */}
            <div className={cn(
                "flex flex-col gap-3 transition-all duration-300 origin-bottom scale-0 opacity-0",
                isOpen && "scale-100 opacity-100 mb-2"
            )}>
                {contacts.map((contact, index) => (
                    <a
                        key={contact.name}
                        href={contact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex items-center gap-3 pr-4 pl-1 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300 hover:-translate-x-2 group",
                            contact.color
                        )}
                        style={{ transitionDelay: `${index * 50}ms` }}
                    >
                        {contact.icon}
                        <span className={cn("text-sm font-semibold", contact.textColor)}>
                            Chat on {contact.name}
                        </span>
                    </a>
                ))}
            </div>

            {/* Main Toggle Button */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 overflow-hidden group",
                        isOpen
                            ? "bg-slate-800 rotate-90 text-white"
                            : "bg-primary text-primary-foreground hover:scale-110 active:scale-95"
                    )}
                >
                    {isOpen ? (
                        <X className="w-6 h-6 animate-in fade-in zoom-in duration-300" />
                    ) : (
                        <MessageCircle className="w-7 h-7 animate-in fade-in zoom-in duration-300 group-hover:rotate-12" />
                    )}
                </button>

                {/* Pulsing Notification */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-accent text-[10px] font-bold text-accent-foreground items-center justify-center shadow-md">
                            1
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
};

export default MultiChatWidget;
