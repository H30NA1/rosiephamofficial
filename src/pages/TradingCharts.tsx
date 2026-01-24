import { useEffect, useRef, useState } from "react";
import { LineChart, CandlestickChart, BookOpen } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const chartSymbols = {
  forex: "OANDA:XAUUSD",
  crypto: "BINANCE:BTCUSDT",
};

const TradingCharts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMarket, setActiveMarket] = useState<keyof typeof chartSymbols>("forex");
  const { t, language } = useLanguage();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        symbol: chartSymbols[activeMarket],
        interval: "30",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: language,
        enable_publishing: false,
        allow_symbol_change: true,
        calendar: false,
        hide_side_toolbar: false,
        studies: [
          "RSI@tv-basicstudies",
          "IchimokuCloud@tv-basicstudies",
          "Volume@tv-basicstudies",
          "MACD@tv-basicstudies"
        ],
        support_host: "https://www.tradingview.com",
      });

      containerRef.current.appendChild(script);
    }
  }, [activeMarket, language]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <CandlestickChart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-up">
            {t.charts.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up">
            {t.charts.subtitle}
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
                  {t.charts.forex}
                </TabsTrigger>
                <TabsTrigger value="crypto" className="gap-2 py-3">
                  <CandlestickChart className="w-5 h-5" />
                  {t.charts.crypto}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* TradingView Widget - Bigger and More Interactive */}
            <div className="bg-card shadow-soft border border-border/30 overflow-hidden" style={{ height: "800px" }}>
              <div
                ref={containerRef}
                className="tradingview-widget-container w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent mb-4">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs tracking-widest uppercase font-medium">{t.home.features.items.education.title}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.charts.description}
            </h2>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              {t.common.cta.learnMore}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TradingCharts;
