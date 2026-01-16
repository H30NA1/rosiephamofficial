import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TradeMessage {
  id: number;
  type: "buy" | "sell" | "signal" | "update";
  pair: string;
  action: string;
  price: string;
  timestamp: Date;
  profit?: string;
  entry?: string;
  tp?: string;
  sl?: string;
}

const generateTradeMessages = (): TradeMessage[] => [
  {
    id: 1,
    type: "sell",
    pair: "XAUUSD",
    action: "SELL",
    price: "4615",
    timestamp: new Date(Date.now() - 30000),
    profit: "+$185",
    entry: "4615",
    tp: "4580",
    sl: "4640",
  },
  {
    id: 2,
    type: "buy",
    pair: "EURUSD",
    action: "BUY ZONE",
    price: "1.0850-1.0835",
    timestamp: new Date(Date.now() - 120000),
    entry: "1.0842",
    tp: "1.0920",
    sl: "1.0800",
  },
  {
    id: 3,
    type: "signal",
    pair: "BTCUSDT",
    action: "LONG SIGNAL",
    price: "67,450",
    timestamp: new Date(Date.now() - 180000),
    entry: "67,450",
    tp: "69,500",
    sl: "66,200",
  },
  {
    id: 4,
    type: "update",
    pair: "XAUUSD",
    action: "TP HIT",
    price: "4580",
    timestamp: new Date(Date.now() - 300000),
    profit: "+$350",
  },
  {
    id: 5,
    type: "buy",
    pair: "ETHUSDT",
    action: "BUY",
    price: "3,520",
    timestamp: new Date(Date.now() - 420000),
    entry: "3,520",
    tp: "3,680",
    sl: "3,450",
  },
  {
    id: 6,
    type: "sell",
    pair: "GBPUSD",
    action: "SELL LIMIT",
    price: "1.2720",
    timestamp: new Date(Date.now() - 600000),
    entry: "1.2720",
    tp: "1.2650",
    sl: "1.2780",
  },
];

const newTradeMessages: Omit<TradeMessage, "id" | "timestamp">[] = [
  {
    type: "buy",
    pair: "XAUUSD",
    action: "BUY",
    price: "4605",
    entry: "4605",
    tp: "4650",
    sl: "4575",
  },
  {
    type: "signal",
    pair: "BTCUSDT",
    action: "SCALP LONG",
    price: "68,200",
    entry: "68,200",
    tp: "68,800",
    sl: "67,900",
  },
  {
    type: "update",
    pair: "EURUSD",
    action: "RUNNING",
    price: "1.0865",
    profit: "+$95",
  },
  {
    type: "sell",
    pair: "ETHUSDT",
    action: "SHORT SIGNAL",
    price: "3,480",
    entry: "3,480",
    tp: "3,350",
    sl: "3,540",
  },
];

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
};

const LiveTradeFeed = () => {
  const [messages, setMessages] = useState<TradeMessage[]>(generateTradeMessages());
  const [newMessage, setNewMessage] = useState<TradeMessage | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomTrade = newTradeMessages[Math.floor(Math.random() * newTradeMessages.length)];
      const newTrade: TradeMessage = {
        ...randomTrade,
        id: Date.now(),
        timestamp: new Date(),
      };
      
      setNewMessage(newTrade);
      setMessages(prev => [newTrade, ...prev.slice(0, 7)]);
      
      setTimeout(() => setNewMessage(null), 3000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Activity className="w-5 h-5 text-primary" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Live Trade Updates</h3>
              <p className="text-xs text-muted-foreground">Real-time signals from our traders</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Auto-updating</span>
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "px-6 py-4 transition-all duration-500",
              newMessage?.id === message.id && "bg-primary/5 animate-pulse"
            )}
          >
            <div className="flex items-start gap-4">
              {/* Type Icon */}
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  message.type === "buy" || message.type === "signal"
                    ? "bg-green-500/10"
                    : message.type === "sell"
                    ? "bg-red-500/10"
                    : "bg-primary/10"
                )}
              >
                {message.type === "buy" || message.type === "signal" ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : message.type === "sell" ? (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                ) : (
                  <Activity className="w-5 h-5 text-primary" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-bold uppercase",
                      message.type === "buy" || message.type === "signal"
                        ? "bg-green-500/10 text-green-600"
                        : message.type === "sell"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {message.action}
                  </span>
                  <span className="font-semibold text-foreground">{message.pair}</span>
                  {message.profit && (
                    <span className="text-green-600 font-semibold text-sm">{message.profit}</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>Price: <span className="text-foreground font-medium">{message.price}</span></span>
                  {message.entry && <span>Entry: <span className="text-foreground">{message.entry}</span></span>}
                  {message.tp && <span className="text-green-600">TP: {message.tp}</span>}
                  {message.sl && <span className="text-red-500">SL: {message.sl}</span>}
                </div>
              </div>

              {/* Timestamp */}
              <div className="text-xs text-muted-foreground flex-shrink-0">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-secondary/30 px-6 py-3 text-center">
        <p className="text-sm text-muted-foreground">
          💡 Join our community for exclusive trading signals
        </p>
      </div>
    </div>
  );
};

export default LiveTradeFeed;
