import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, BarChart3, Users, LineChart, CandlestickChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import LiveTradeFeed from "@/components/LiveTradeFeed";
import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const chartSymbols = {
  forex: "FX:EURUSD",
  crypto: "BINANCE:BTCUSDT",
};

const services = [
  {
    icon: BarChart3,
    title: "Real-time Market Analysis",
    description: "Stay ahead with up-to-the-minute market insights and technical analysis from our expert team.",
  },
  {
    icon: Users,
    title: "Expert Training & Guidance",
    description: "Learn proven trading strategies through personalized mentorship and comprehensive training programs.",
  },
  {
    icon: Shield,
    title: "Transparent Environment",
    description: "Trade with confidence in our reliable, transparent platform built on trust and integrity.",
  },
];

const Index = () => {
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
        studies: ["RSI@tv-basicstudies", "MASimple@tv-basicstudies"],
        support_host: "https://www.tradingview.com",
      });

      containerRef.current.appendChild(script);
    }
  }, [activeMarket]);

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Trusted Forex & Crypto Trading Platform</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Welcome to Trading with{" "}
              <span className="text-gradient">Rosie Phạm</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Empowering your financial future with expert Forex and Crypto trading strategies. 
              Experience real-time trading results and a calm, professional approach to building sustainable wealth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="shadow-soft hover:shadow-card transition-all">
                <Link to="/contact">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#live-trades">See Live Updates</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-8 right-8 hidden lg:flex gap-6">
          {[
            { value: "5+", label: "Years Experience" },
            { value: "Forex", label: "& Crypto Expert" },
            { value: "24/7", label: "Market Analysis" },
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

      {/* Live Trade Updates Section */}
      <section id="live-trades" className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real-Time Trading Results
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch live trade updates from our community. See actual entry points, take profits, 
              and real-time market signals as they happen.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <LiveTradeFeed />
          </div>
        </div>
      </section>

      {/* Trading Charts Section */}
      <section id="charts" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Live Trading Charts
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore real-time Forex and Crypto market data. Analyze trends, identify opportunities, 
              and make informed trading decisions with professional-grade charts.
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
                  Forex Trading
                </TabsTrigger>
                <TabsTrigger value="crypto" className="gap-2">
                  <CandlestickChart className="w-4 h-4" />
                  Crypto Trading
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* TradingView Widget */}
            <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
              <div
                ref={containerRef}
                className="tradingview-widget-container"
                style={{ height: "700px", width: "100%" }}
              />
            </div>

            <div className="text-center mt-6">
              <Button variant="outline" size="lg" asChild>
                <Link to="/trading-charts">
                  View Full Charts Page
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Forex & Crypto Trading Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive Forex and Crypto trading solutions designed to help you achieve your financial goals
              with confidence and peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
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
      <section className="py-20 md:py-28 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Trading Journey?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join a disciplined community of aspiring traders and build sustainable wealth
            with 5+ years of expert guidance, real-time signals, and proven strategies.
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="shadow-elevated hover:scale-105 transition-transform"
          >
            <Link to="/contact">
              Get in Touch Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
