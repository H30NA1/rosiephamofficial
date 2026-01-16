import { useState } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ZaloChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Open Zalo with the message - this opens the Zalo app or web
      const zaloUrl = `https://zalo.me/0377895316`;
      window.open(zaloUrl, "_blank");
      setMessage("");
      setIsOpen(false);
    }
  };

  const handleCall = () => {
    window.location.href = "tel:+840377895316";
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-card rounded-2xl shadow-elevated overflow-hidden animate-scale-in border border-border">
            {/* Header */}
            <div className="bg-primary px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">RP</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-foreground text-sm">Rosie Phạm</h4>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-xs text-primary-foreground/80">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="p-4 min-h-[200px] bg-secondary/20">
              {/* Welcome Message */}
              <div className="flex gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">RP</span>
                </div>
                <div className="bg-card rounded-xl rounded-tl-sm px-3 py-2 shadow-soft max-w-[80%]">
                  <p className="text-sm text-foreground">
                    Xin chào! 👋 Welcome to Trading with Rosie Phạm. How can I help you today?
                  </p>
                  <span className="text-xs text-muted-foreground mt-1 block">Just now</span>
                </div>
              </div>

              {/* Quick Replies */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {["Trading signals", "Consultation", "Pricing"].map((reply) => (
                    <button
                      key={reply}
                      onClick={() => setMessage(reply)}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-xs rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <button
                  onClick={handleCall}
                  className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 hover:bg-green-500/20 transition-colors flex-shrink-0"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-secondary/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Opens Zalo for live chat
              </p>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full shadow-elevated flex items-center justify-center transition-all duration-300 hover:scale-110",
            isOpen ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
          )}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>

        {/* Notification Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            1
          </span>
        )}
      </div>
    </>
  );
};

export default ZaloChat;
