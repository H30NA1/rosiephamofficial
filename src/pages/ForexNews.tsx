import { Calendar, Clock, Filter, Globe } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ForexNewsComponent from "@/components/ForexNews";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const currencies = [
  { code: "ALL", label: "All Currencies", flag: "🌍" },
  { code: "USD", label: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", label: "Euro", flag: "🇪🇺" },
  { code: "GBP", label: "British Pound", flag: "🇬🇧" },
  { code: "JPY", label: "Japanese Yen", flag: "🇯🇵" },
  { code: "AUD", label: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", label: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", label: "Swiss Franc", flag: "🇨🇭" },
  { code: "NZD", label: "New Zealand Dollar", flag: "🇳🇿" },
];

const ForexNewsPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("ALL");
  const [selectedImpact, setSelectedImpact] = useState<"all" | "high" | "medium" | "low">("all");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-up">
            Forex Economic Calendar
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up">
            Stay informed with real-time economic events and news that impact currency markets.
            Track high-impact announcements and plan your trades accordingly.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-secondary/30 border-b border-border sticky top-16 md:top-20 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Currency Filter */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex gap-2">
                {currencies.slice(0, 5).map((currency) => (
                  <Button
                    key={currency.code}
                    variant={selectedCurrency === currency.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCurrency(currency.code)}
                    className="flex-shrink-0"
                  >
                    <span className="mr-1">{currency.flag}</span>
                    {currency.code}
                  </Button>
                ))}
              </div>
            </div>

            {/* Impact Filter */}
            <Tabs 
              value={selectedImpact} 
              onValueChange={(v) => setSelectedImpact(v as typeof selectedImpact)}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="high" className="gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  High
                </TabsTrigger>
                <TabsTrigger value="medium" className="gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Medium
                </TabsTrigger>
                <TabsTrigger value="low" className="gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Low
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* News Calendar */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Today's Events */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-2xl font-bold text-foreground">Today's Events</h2>
              </div>
              <ForexNewsComponent showOnlyUSD={selectedCurrency === "USD"} />
            </div>

            {/* Upcoming Events */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-2xl font-bold text-foreground">Upcoming This Week</h2>
              </div>
              <ForexNewsComponent showOnlyUSD={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
              How to Use the Economic Calendar
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                  <span className="w-4 h-4 rounded-full bg-red-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">High Impact Events</h3>
                <p className="text-sm text-muted-foreground">
                  These events can cause significant market volatility. Consider avoiding new positions 
                  or tightening stop-losses before these releases.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-soft">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                  <span className="w-4 h-4 rounded-full bg-amber-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Medium Impact Events</h3>
                <p className="text-sm text-muted-foreground">
                  These events can cause moderate price movement. Stay alert and monitor your 
                  positions when these are released.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-soft">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <span className="w-4 h-4 rounded-full bg-green-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Low Impact Events</h3>
                <p className="text-sm text-muted-foreground">
                  These events typically have minimal market impact but can still provide 
                  useful context for your trading decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForexNewsPage;
