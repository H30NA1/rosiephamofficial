import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, BarChart3, LineChart, CandlestickChart, Newspaper, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ZaloGroupFeed from "@/components/ZaloGroupFeed";
import ForexNews from "@/components/ForexNews";
import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const chartSymbols = {
  forex: "OANDA:XAUUSD",
  crypto: "BINANCE:BTCUSDT",
};

const Index = () => {
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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-accent/10 text-accent mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">{t.home.hero.subtitle}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t.home.hero.title.split('Rosie Phạm')[0]}
              <span className="text-gradient">Rosie Phạm</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {t.home.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="shadow-soft hover:shadow-card transition-all">
                <Link to="/contact">
                  {t.common.cta.getStarted}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#live-trades">{t.common.cta.learnMore}</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-8 right-8 hidden lg:flex gap-6">
          {[
            { value: "5+", label: t.home.hero.stats.experience },
            { value: "Forex", label: t.home.hero.stats.expert },
            { value: "24/7", label: t.home.hero.stats.analysis },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-card animate-float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="text-2xl font-serif font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Zalo Group Feed Section */}
      <section id="live-trades" className="py-20 md:py-28 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-accent/10 text-accent mb-4">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{t.home.community.title}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.home.liveTrade.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.home.liveTrade.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <ZaloGroupFeed />
          </div>
        </div>
      </section>

      {/* Trading Charts Section */}
      <section id="charts" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.home.charts.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.home.charts.subtitle}
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Market Selector */}
            <Tabs
              defaultValue="forex"
              className="mb-6"
              onValueChange={(value) => setActiveMarket(value as keyof typeof chartSymbols)}
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="forex" className="gap-2">
                  <LineChart className="w-4 h-4" />
                  {t.home.charts.forex}
                </TabsTrigger>
                <TabsTrigger value="crypto" className="gap-2">
                  <CandlestickChart className="w-4 h-4" />
                  {t.home.charts.crypto}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* TradingView Widget */}
            <div className="bg-card rounded-2xl shadow-elevated overflow-hidden" style={{ height: "700px" }}>
              <div
                ref={containerRef}
                className="tradingview-widget-container w-full h-full"
              />
            </div>

            <div className="text-center mt-6">
              <Button variant="outline" size="lg" asChild>
                <Link to="/charts">
                  {t.common.cta.viewCharts}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Forex News Section */}
      <section id="news" className="py-20 md:py-28 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-accent/10 text-accent mb-4">
              <Newspaper className="w-4 h-4" />
              <span className="text-sm font-medium">{t.home.news.subtitle}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.home.news.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.charts.description}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ForexNews showOnlyUSD={true} filterDate="today" />

            <div className="text-center mt-6">
              <Button variant="outline" size="lg" asChild>
                <Link to="/news">
                  {t.home.news.viewAll}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.home.features.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.home.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BarChart3, ...t.home.features.items.signals },
              { icon: LineChart, ...t.home.features.items.analysis },
              { icon: TrendingUp, ...t.home.features.items.support },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-card-gradient rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-background mb-6 tracking-wide">
            {t.home.community.title}
          </h2>
          <p className="text-background/70 max-w-2xl mx-auto mb-10 text-lg">
            {t.home.community.description}
          </p>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-background/30 text-background hover:bg-background hover:text-foreground"
          >
            <Link to="/contact">
              {t.common.cta.contactUs}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
