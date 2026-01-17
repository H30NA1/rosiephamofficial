import { useState, useMemo } from "react";
import { Calendar, Clock, AlertTriangle, TrendingUp, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { forexData } from "@/data/forex-data";

// Type definitions based on the scraped data structure
interface RawEvent {
  id: number;
  name: string;
  currency: string;
  impactName: string; // "low" | "medium" | "high" | "holiday"
  timeLabel: string;
  actual: string;
  forecast: string;
  previous: string;
  date: string; // Start date of the group (we add this during flattening)
  dateline: number; // Unix timestamp
}

interface DayGroup {
  date: string;
  dateline: number;
  events: RawEvent[];
}

const getImpactColor = (impact: string) => {
  switch (impact.toLowerCase()) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-orange-400";
    case "low":
      return "bg-yellow-400";
    case "holiday":
      return "bg-gray-400";
    default:
      return "bg-muted";
  }
};

const getImpactLabel = (impact: string) => {
  switch (impact.toLowerCase()) {
    case "high":
      return "High Impact";
    case "medium":
      return "Medium Impact";
    case "low":
      return "Low Impact";
    case "holiday":
      return "Holiday";
    default:
      return "Non-Economic";
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
    CNY: "🇨🇳",
  };
  return flags[currency] || "🌍";
};

interface ForexNewsProps {
  currencyFilter?: string;
  impactFilter?: "all" | "high" | "medium" | "low";
  filterDate?: "today" | "upcoming" | "upcoming_week" | "upcoming_month" | "all";
  maxItems?: number;
  className?: string;
}

const ForexNews = ({
  currencyFilter = "ALL",
  impactFilter = "all",
  filterDate = "all",
  maxItems,
  className
}: ForexNewsProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Parse and flatten data or keep it grouped by day
  const daysData = useMemo(() => {
    const rawDays = forexData.days as unknown as DayGroup[];

    // Get current date for filtering.
    const now = new Date();
    // Reset time to start of day for comparison
    now.setHours(0, 0, 0, 0);

    // Flatten to filter
    let allEvents = rawDays.flatMap(day => {
      return day.events.map(e => ({
        ...e,
        date: e.date // Use the event's specific date
      }));
    });

    // 1. Filter by Currency
    if (currencyFilter !== "ALL") {
      allEvents = allEvents.filter(e => e.currency === currencyFilter);
    }

    // 2. Filter by Impact
    if (impactFilter !== "all") {
      allEvents = allEvents.filter(e => e.impactName.toLowerCase() === impactFilter.toLowerCase());
    }

    // 3. Filter by Date
    if (filterDate !== "all") {
      allEvents = allEvents.filter(e => {
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0);

        if (filterDate === "today") {
          return eventDate.getTime() === now.getTime();
        }

        if (filterDate === "upcoming_week") {
          // Logic: Display this week but exclude old dates (past days)
          // Meaning: Today <= Date <= End of Week

          // Calculate end of week (Saturday) - adjusting for week start?
          // Usually standard week is Sun-Sat or Mon-Sun.
          // Let's assume standard Calendar week ends on Saturday.
          const endOfWeek = new Date(now);
          const day = now.getDay();
          const diff = 6 - day; // days remaining to Saturday
          endOfWeek.setDate(now.getDate() + diff);
          endOfWeek.setHours(23, 59, 59, 999);

          return eventDate.getTime() >= now.getTime() && eventDate.getTime() <= endOfWeek.getTime();
        }

        if (filterDate === "upcoming_month") {
          // Logic: Display this month but exclude old dates
          // Meaning: Today <= Date <= End of Month

          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          endOfMonth.setHours(23, 59, 59, 999);

          return eventDate.getTime() >= now.getTime() && eventDate.getTime() <= endOfMonth.getTime();
        }

        // Fallback for generic "upcoming" (future only)
        if (filterDate === "upcoming") {
          return eventDate.getTime() >= now.getTime();
        }

        return true;
      });
    }

    // 4. Limit items
    if (maxItems) {
      allEvents = allEvents.slice(0, maxItems);
    }

    // Re-group by date for display
    const groups: DayGroup[] = [];
    allEvents.forEach(event => {
      let group = groups.find(g => g.date === event.date);
      if (!group) {
        group = { date: event.date, dateline: 0, events: [] };
        groups.push(group);
      }
      group.events.push(event);
    });

    // Sort groups by date
    groups.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return groups;
  }, [currencyFilter, impactFilter, filterDate, maxItems]);

  const getTitle = () => {
    if (filterDate === 'today') return "Events for Today";
    if (filterDate === 'upcoming_week') return "Upcoming This Week";
    if (filterDate === 'upcoming_month') return "Upcoming This Month";
    return "Upcoming Events";
  };

  return (
    <div className={cn("bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50", className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground tracking-tight">
                {currencyFilter !== "ALL" ? `${currencyFilter} Calendar` : "Economic Calendar"}
              </h3>
              <p className="text-xs text-muted-foreground font-medium">
                {getTitle()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-background/50 px-3 py-1 rounded-full border border-border/50">
            <Clock className="w-3 h-3 text-primary" />
            <span>{currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-3 bg-secondary/20 border-b border-border flex flex-wrap items-center gap-4 text-xs">
        <span className="font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Impact:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-500 shadow-sm" />
          <span className="hidden sm:inline text-muted-foreground">High</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-orange-400 shadow-sm" />
          <span className="hidden sm:inline text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 shadow-sm" />
          <span className="hidden sm:inline text-muted-foreground">Low</span>
        </div>
      </div>

      {/* News Feed Grouped by Day */}
      <div className="divide-y divide-border max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
        {daysData.length === 0 ? (
          <div className="p-10 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <Filter className="w-8 h-8 opacity-20" />
            <p>No events found for {filterDate === 'today' ? 'today' : 'this period'}.</p>
            {(currencyFilter !== 'ALL' || impactFilter !== 'all') && (
              <p className="text-xs opacity-70">Try adjusting your filters.</p>
            )}
          </div>
        ) : (
          daysData.map((day) => (
            <div key={day.date} className="bg-background/50">
              {/* Day Header */}
              <div className="sticky top-0 z-10 bg-secondary/90 backdrop-blur-sm px-6 py-2 border-y border-border/50 first:border-t-0 shadow-sm">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/70 flex items-center gap-2">
                  <div className="w-1 h-3 bg-primary rounded-full"></div>
                  {day.date}
                </h4>
              </div>

              {/* Events List */}
              <div className="divide-y divide-border/30">
                {day.events.map((item) => (
                  <div
                    key={item.id}
                    className="group px-6 py-3 hover:bg-secondary/20 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6">

                      {/* Time & Impact */}
                      <div className="flex flex-col items-center gap-1.5 flex-shrink-0 w-14 sm:w-16">
                        <span className="font-mono text-xs font-medium text-foreground/80">{item.timeLabel}</span>
                        <div
                          className={cn("w-8 sm:w-10 h-1 rounded-full", getImpactColor(item.impactName))}
                          title={getImpactLabel(item.impactName)}
                        />
                      </div>

                      {/* Currency */}
                      <div className="hidden sm:flex flex-col items-center justify-center gap-1 flex-shrink-0 w-10 sm:w-12 bg-secondary/30 rounded-lg py-1.5">
                        <span className="text-lg leading-none">{getCurrencyFlag(item.currency)}</span>
                        <span className="text-[9px] font-bold text-muted-foreground">{item.currency}</span>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="sm:hidden text-lg">{getCurrencyFlag(item.currency)}</span>
                          <p className="font-medium text-foreground text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {item.name}
                          </p>
                        </div>
                        {item.impactName === "high" && (
                          <div className="inline-flex items-center gap-1 text-[9px] text-red-500/90 font-medium">
                            <AlertTriangle className="w-3 h-3" />
                            <span>High Impact</span>
                          </div>
                        )}
                      </div>

                      {/* Data Columns */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-6 text-xs flex-shrink-0 w-auto">
                        <div className="flex flex-col items-end min-w-[50px]">
                          <span className="text-[9px] uppercase text-muted-foreground/70 mb-0.5">Actual</span>
                          <span className={cn(
                            "font-bold font-mono",
                            item.actual ? "text-foreground" : "text-muted-foreground/30",
                          )}>
                            {item.actual || "-"}
                          </span>
                        </div>
                        <div className="flex flex-col items-end min-w-[50px]">
                          <span className="text-[9px] uppercase text-muted-foreground/70 mb-0.5">Forecast</span>
                          <span className="font-medium font-mono text-muted-foreground">{item.forecast || "-"}</span>
                        </div>
                        <div className="flex flex-col items-end hidden md:flex min-w-[50px]">
                          <span className="text-[9px] uppercase text-muted-foreground/70 mb-0.5">Previous</span>
                          <span className="font-medium font-mono text-muted-foreground">{item.previous || "-"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="bg-secondary/10 px-6 py-2 border-t border-border flex justify-between items-center text-[10px]">
        <span className="text-muted-foreground">Source: Forex Factory</span>
        <span className={cn("flex items-center gap-1.5", daysData.length > 0 ? "text-green-600" : "text-amber-500")}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
          {daysData.length > 0 ? "Live" : "No Data"}
        </span>
      </div>
    </div>
  );
};

export default ForexNews;
