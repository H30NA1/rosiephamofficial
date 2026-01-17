import { ArrowRight, Target, Heart, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import rosiePrimary from "@/assets/rosie-primary.png";
import rosieSecondary from "@/assets/rosie-secondary.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// Import required modules
import { EffectCards } from 'swiper/modules';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision Analysis",
      description: "Utilizing the KingIchi Suite for high-probability signals in Gold (XAUUSD) and Crypto markets.",
    },
    {
      icon: Heart,
      title: "Transparent Mentorship",
      description: "Building trust through real-time results and honest guidance for successful trading journeys.",
    },
    {
      icon: Award,
      title: "5+ Years Experience",
      description: "Five years of proven expertise in navigating global financial markets with discipline and strategy.",
    },
  ];

  const creatorImages = [
    { src: rosiePrimary, alt: "Rosie Phạm Professional Portrait" },
    { src: rosieSecondary, alt: "Rosie Phạm Trading Expert" },
  ];

  return (
    <Layout>
      {/* SEO Optimized Header */}
      <section className="py-20 md:py-28 bg-hero-gradient overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Professional Trader & Mentor</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                About <span className="text-gradient">Rosie Phạm</span>
              </h1>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Rosie Phạm is a leading <span className="text-foreground font-semibold">Forex and Crypto trading expert</span> in Vietnam, specialized in <span className="text-foreground font-semibold">Gold (XAUUSD)</span> and high-impact market analysis. With over <span className="text-foreground font-semibold">5 years of professional experience</span>, she has pioneered the use of the <span className="text-foreground font-semibold">KingIchi Trading Suite</span> to deliver consistent, precision-based results.
                </p>
                <p>
                  Her mission is to simplify the complexities of the financial markets for traders of all levels. By combining technical discipline with the proprietary <span className="text-foreground font-semibold">KingIchi indicators</span> (RSI Pro, Wave Pro, and Vol Pro), Rosie provides a roadmap for sustainable wealth building in the digital age.
                </p>
              </div>
            </div>

            <div className="animate-scale-in flex justify-center lg:justify-end">
              <div className="w-full max-w-[480px] perspective-1000">
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="w-full aspect-[3/4] rounded-3xl"
                >
                  {creatorImages.map((img, index) => (
                    <SwiperSlide key={index} className="rounded-3xl shadow-2xl overflow-hidden border-4 border-white bg-card">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="mt-8 text-center text-xs text-muted-foreground animate-pulse font-medium">
                  ← Swipe to see more →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance uppercase tracking-tight">
                Expertise in <span className="text-primary italic">Global Markets</span>
              </h2>
              <ul className="space-y-6">
                {[
                  { label: "Expert XAUUSD Strategy", desc: "Specialized in Gold trading with a focus on institutional liquidity zones." },
                  { label: "KingIchi Methodology", desc: "Exclusive mastery of the King Ichi cloud system for trend following." },
                  { label: "Crypto Portfolio Management", desc: "Identifying long-term trends in BTC and high-potential altcoins." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 group">
                    <div className="mt-1 bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{item.label}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="bg-card p-10 rounded-[2.5rem] shadow-elevated border border-border/50 relative z-10">
                <blockquote className="text-xl md:text-2xl text-foreground italic leading-tight mb-8 font-serif">
                  "Kỷ luật là chìa khóa của sự tự do tài chính. Tại Rosie Phạm Trading, chúng tôi không chỉ giao dịch, chúng tôi xây dựng một tư duy thị trường đẳng cấp."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 px-1 bg-primary rounded-full" />
                  <span className="font-bold text-foreground uppercase tracking-widest text-xs">Rosie Phạm</span>
                </div>
              </div>
              <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] -rotate-2 -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Establishing Market Trust
            </h2>
            <p className="text-muted-foreground">Everything we do is built on these three foundational principles.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-3xl p-8 shadow-card text-center hover:shadow-elevated transition-all duration-500 border border-border/50 group"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-8 group-hover:bg-primary/10 group-hover:-translate-y-2 transition-all">
                  <value.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final SEO CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto bg-slate-900 text-white rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -mr-40 -mt-40" />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-8 relative z-10 tracking-tight">
              Start Your <span className="text-primary italic">Trading Journey</span> Today
            </h2>
            <p className="text-lg md:text-xl opacity-80 mb-12 relative z-10 max-w-2xl mx-auto leading-relaxed">
              Join the official Rosie Phạm community. Receive expert signals, real-time market updates, and 1-on-1 mentorship for Forex, Gold, and Crypto trading.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-10 rounded-2xl text-lg shadow-lg" asChild>
                <Link to="/contact">Get Expert Mentorship</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/20 bg-white/5 hover:bg-white/10 text-white h-14 px-10 rounded-2xl text-lg backdrop-blur-sm transition-all">
                <a href="https://zalo.me/g/sxkwkm310" target="_blank" rel="noopener noreferrer">Join Free Zalo Group</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
