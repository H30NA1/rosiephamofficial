import { useState, useEffect } from "react";
import { Calendar, Clock, AlertTriangle, TrendingUp, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsEvent {
  id: number;
  time: string;
  currency: string;
  impact: "high" | "medium" | "low";
  event: string;
  actual?: string;
  forecast?: string;
  previous?: string;
}

// Simulated Forex Factory-style news data (USD focused for homepage)
const generateUSDNews = (): NewsEvent[] => [
  {
    id: 1,
    time: "08:30",
    currency: "USD",
    impact: "high",
    event: "Core CPI m/m",
    actual: "0.3%",
    forecast: "0.2%",
    previous: "0.2%",
  },
  {
    id: 2,
    time: "10:00",
    currency: "USD",
    impact: "high",
    event: "FOMC Statement",
    forecast: "",
    previous: "",
  },
  {
    id: 3,
    time: "13:00",
    currency: "USD",
    impact: "medium",
    event: "Fed Chair Powell Speaks",
    forecast: "",
    previous: "",
  },
  {
    id: 4,
    time: "08:30",
    currency: "USD",
    impact: "high",
    event: "Non-Farm Payrolls",
    actual: "256K",
    forecast: "180K",
    previous: "212K",
  },
  {
    id: 5,
    time: "08:30",
    currency: "USD",
    impact: "medium",
    event: "Unemployment Rate",
    actual: "4.1%",
    forecast: "4.2%",
    previous: "4.2%",
  },
  {
    id: 6,
    time: "10:00",
    currency: "USD",
    impact: "medium",
    event: "ISM Manufacturing PMI",
    forecast: "48.5",
    previous: "49.3",
  },
];

const generateAllNews = (): NewsEvent[] => [
  ...generateUSDNews(),
  {
    id: 7,
    time: "02:00",
    currency: "EUR",
    impact: "high",
    event: "ECB Interest Rate Decision",
    actual: "4.50%",
    forecast: "4.50%",
    previous: "4.50%",
  },
  {
    id: 8,
    time: "04:30",
    currency: "GBP",
    impact: "high",
    event: "BOE Interest Rate Decision",
    forecast: "5.25%",
    previous: "5.25%",
  },
  {
    id: 9,
    time: "19:30",
    currency: "AUD",
    impact: "medium",
    event: "RBA Rate Statement",
    forecast: "",
    previous: "",
  },
  {
    id: 10,
    time: "23:50",
    currency: "JPY",
    impact: "medium",
    event: "BOJ Policy Rate",
    actual: "-0.10%",
    forecast: "-0.10%",
    previous: "-0.10%",
  },
  {
    id: 11,
    time: "09:00",
    currency: "CHF",
    impact: "low",
    event: "SNB Chairman Jordan Speaks",
    forecast: "",
    previous: "",
  },
  {
    id: 12,
    time: "21:30",
    currency: "CAD",
    impact: "high",
    event: "Employment Change",
    forecast: "15.0K",
    previous: "24.9K",
  },
  {
    id: 13,
    time: "17:00",
    currency: "NZD",
    impact: "medium",
    event: "RBNZ Interest Rate Decision",
    forecast: "5.50%",
    previous: "5.50%",
  },
];

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-amber-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-muted";
  }
};

const getCurrencyFlag = (currency: string) => {
  const flags: Record<string, string> = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    JPY: "🇯🇵",
    AUD: "🇦🇺",
    CAD: "🇨🇦",
    CHF: "🇨🇭",
    NZD: "🇳🇿",
  };
  return flags[currency] || "🏳️";
};

interface ForexNewsProps {
  showOnlyUSD?: boolean;
  maxItems?: number;
}

const ForexNews = ({ showOnlyUSD = true, maxItems }: ForexNewsProps) => {
  const [news, setNews] = useState<NewsEvent[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const allNews = showOnlyUSD ? generateUSDNews() : generateAllNews();
    setNews(maxItems ? allNews.slice(0, maxItems) : allNews);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [showOnlyUSD, maxItems]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {showOnlyUSD ? "USD Economic Calendar" : "Forex Factory News"}
              </h3>
              <p className="text-xs text-muted-foreground">{today}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-3 bg-secondary/30 border-b border-border flex items-center gap-4 text-xs">
        <span className="text-muted-foreground">Impact:</span>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-muted-foreground">High</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-muted-foreground">Low</span>
        </div>
      </div>

      {/* News Feed */}
      <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
        {news.map((item) => (
          <div
            key={item.id}
            className="px-6 py-4 hover:bg-secondary/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Time & Impact */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0 w-16">
                <span className="text-sm font-medium text-foreground">{item.time}</span>
                <div className={cn("w-3 h-3 rounded-full", getImpactColor(item.impact))} />
              </div>

              {/* Currency */}
              <div className="flex items-center gap-2 flex-shrink-0 w-16">
                <span className="text-lg">{getCurrencyFlag(item.currency)}</span>
                <span className="font-semibold text-foreground text-sm">{item.currency}</span>
              </div>

              {/* Event */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{item.event}</p>
                {item.impact === "high" && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                    <span className="text-xs text-amber-600">High volatility expected</span>
                  </div>
                )}
              </div>

              {/* Data */}
              <div className="flex gap-4 text-xs flex-shrink-0">
                {item.actual && (
                  <div className="text-center">
                    <div className="text-muted-foreground">Actual</div>
                    <div className={cn(
                      "font-semibold",
                      item.forecast && parseFloat(item.actual) > parseFloat(item.forecast)
                        ? "text-green-600"
                        : item.forecast && parseFloat(item.actual) < parseFloat(item.forecast)
                        ? "text-red-500"
                        : "text-foreground"
                    )}>
                      {item.actual}
                    </div>
                  </div>
                )}
                {item.forecast && (
                  <div className="text-center">
                    <div className="text-muted-foreground">Forecast</div>
                    <div className="font-medium text-foreground">{item.forecast}</div>
                  </div>
                )}
                {item.previous && (
                  <div className="text-center">
                    <div className="text-muted-foreground">Previous</div>
                    <div className="font-medium text-muted-foreground">{item.previous}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-secondary/30 px-6 py-3 text-center">
        <p className="text-sm text-muted-foreground">
          📊 Data inspired by Forex Factory • For educational purposes
        </p>
      </div>
    </div>
  );
};

export default ForexNews;
