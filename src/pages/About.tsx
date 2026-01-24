import { ArrowRight, Target, Heart, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import rosiePrimary from "@/assets/rosie-primary.png";
import rosieSecondary from "@/assets/rosie-secondary.png";
import { useLanguage } from "@/contexts/LanguageContext";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// Import required modules
import { EffectCards } from 'swiper/modules';

const About = () => {
  const { t } = useLanguage();

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
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">{t.about.subtitle}</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t.about.title.split('Rosie Phạm')[0]}<span className="text-gradient">Rosie Phạm</span>
              </h1>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                {t.about.story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
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
                    <SwiperSlide key={index} className="overflow-hidden border border-border/30 bg-card shadow-soft">
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

      {/* Mission Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance uppercase tracking-tight">
                {t.about.mission.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.about.mission.description}
              </p>
            </div>

            <div className="relative">
              <div className="bg-card p-10 md:p-14 shadow-soft border border-border/30 relative z-10">
                <blockquote className="text-xl md:text-2xl text-foreground italic leading-relaxed mb-8 font-serif">
                  "Kỷ luật là chìa khóa của sự tự do tài chính. Tại Rosie Phạm Trading, chúng tôi không chỉ giao dịch, chúng tôi xây dựng một tư duy thị trường đẳng cấp."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-accent" />
                  <span className="font-medium text-foreground uppercase tracking-widest text-xs">Rosie Phạm</span>
                </div>
              </div>
              <div className="absolute -inset-4 bg-accent/5 -rotate-1 -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.about.values.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.about.values.items.map((value, index) => {
              const icons = [Target, Heart, Award];
              const Icon = icons[index % icons.length];
              return (
                <div
                  key={index}
                  className="bg-card p-10 shadow-soft text-center hover:shadow-card transition-all duration-500 border border-border/30 group"
                >
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-8 border border-accent/30 group-hover:border-accent group-hover:bg-accent/5 transition-all">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final SEO CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto bg-foreground text-background p-12 md:p-20 shadow-elevated relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 blur-[100px] -mr-40 -mt-40" />
            <h2 className="font-serif text-3xl md:text-5xl font-medium mb-8 relative z-10 tracking-wide">
              {t.home.community.title}
            </h2>
            <p className="text-lg md:text-xl opacity-70 mb-12 relative z-10 max-w-2xl mx-auto leading-relaxed">
              {t.home.community.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background hover:text-foreground" asChild>
                <Link to="/contact">{t.common.cta.contactUs}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-background/30 text-background hover:bg-background hover:text-foreground">
                <a href="https://zalo.me/g/sxkwkm310" target="_blank" rel="noopener noreferrer">{t.common.cta.joinNow}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
