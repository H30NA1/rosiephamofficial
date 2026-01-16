import { useEffect, useRef, useState } from "react";
import { LineChart, CandlestickChart, BookOpen } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const chartSymbols = {
  forex: "FX:EURUSD",
  crypto: "BINANCE:BTCUSDT",
};

const tips = [
  {
    title: "Understand Candlestick Patterns",
    description: "Candlestick charts show open, high, low, and close prices. Green candles indicate price increase, red indicates decrease.",
  },
  {
    title: "Use Support and Resistance",
    description: "Identify key price levels where the market tends to reverse. These levels help determine entry and exit points.",
  },
  {
    title: "Follow the Trend",
    description: "The trend is your friend. Look for higher highs and higher lows in uptrends, lower highs and lower lows in downtrends.",
  },
  {
    title: "Manage Your Risk",
    description: "Never risk more than 1-2% of your capital on a single trade. Always use stop-loss orders to protect your investments.",
  },
];

const TradingCharts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMarket, setActiveMarket] = useState<keyof typeof chartSymbols>("forex");

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: chartSymbols[activeMarket],
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: true,
        calendar: false,
        hide_side_toolbar: false,
        studies: ["RSI@tv-basicstudies", "MASimple@tv-basicstudies", "MACD@tv-basicstudies"],
        support_host: "https://www.tradingview.com",
      });

      containerRef.current.appendChild(script);
    }
  }, [activeMarket]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <CandlestickChart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-up">
            Real-time Trading Charts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up">
            Explore live market data and gain insights from professional trading charts.
            Monitor stocks, forex, and cryptocurrency markets in real-time.
          </p>
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Market Selector */}
            <Tabs defaultValue="forex" className="mb-8" onValueChange={(value) => setActiveMarket(value as keyof typeof chartSymbols)}>
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2">
                <TabsTrigger value="forex" className="gap-2 py-3">
                  <LineChart className="w-5 h-5" />
                  Forex Trading
                </TabsTrigger>
                <TabsTrigger value="crypto" className="gap-2 py-3">
                  <CandlestickChart className="w-5 h-5" />
                  Crypto Trading
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* TradingView Widget - Bigger and More Interactive */}
            <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
              <div
                ref={containerRef}
                className="tradingview-widget-container"
                style={{ height: "800px", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Learning Resources</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Chart Reading Tips
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Master the art of technical analysis with these essential trading tips.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Learn More About Trading
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TradingCharts;
