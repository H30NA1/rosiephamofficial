import { ArrowRight, Target, Heart, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import rosiePortrait from "@/assets/rosie-portrait.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Every trading decision is backed by thorough analysis and strategic planning.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "We believe in transparent, honest practices that prioritize your financial wellbeing.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering exceptional results through continuous learning and improvement.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Meet <span className="text-gradient">Rosie Phạm</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Your trusted guide in the world of trading. With over 5 years of experience
                in financial markets, I've dedicated my career to helping individuals
                achieve their financial goals through informed, strategic trading.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey began with a passion for understanding market dynamics and
                a desire to share that knowledge with others. Today, I work with clients
                worldwide, providing personalized guidance and support on their trading journey.
              </p>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={rosiePortrait}
                  alt="Rosie Phạm - Trading Expert"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-primary/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
              Trading Philosophy
            </h2>
            <blockquote className="text-xl md:text-2xl text-foreground italic leading-relaxed mb-8">
              "Our approach is centered around building sustainable wealth in a calm,
              consistent, and responsible manner. Success in trading isn't about
              quick wins—it's about making informed decisions that compound over time."
            </blockquote>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card text-center hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
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

      {/* Mission Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card-gradient rounded-3xl p-8 md:p-12 shadow-elevated">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed mb-8">
              Empowering individuals to make informed, profitable trading decisions in a
              peaceful and supportive environment. We believe everyone deserves access to
              professional trading guidance, regardless of their starting point.
            </p>
            <div className="text-center">
              <Button size="lg" asChild className="shadow-soft">
                <Link to="/contact">
                  Join Our Community
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
