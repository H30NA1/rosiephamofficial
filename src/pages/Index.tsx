import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, BarChart3, Users, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import heroBg from "@/assets/hero-bg.jpg";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Michael Nguyen",
    role: "Forex Trader",
    content: "Working with Rosie transformed my trading approach. Her calm, methodical strategies helped me achieve consistent 15% monthly returns.",
    rating: 5,
    profit: "+47%",
  },
  {
    name: "Sarah Chen",
    role: "Crypto Investor",
    content: "Rosie's guidance gave me the confidence to navigate volatile markets. Her risk management techniques are exceptional.",
    rating: 5,
    profit: "+62%",
  },
  {
    name: "David Park",
    role: "Stock Trader",
    content: "The personalized attention and expert analysis I received exceeded all expectations. Highly recommend for serious traders.",
    rating: 5,
    profit: "+38%",
  },
  {
    name: "Lisa Tran",
    role: "Day Trader",
    content: "Rosie's peaceful approach to trading helped me overcome emotional decision-making. My portfolio has never been healthier.",
    rating: 5,
    profit: "+55%",
  },
];

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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
              <span className="text-sm font-medium">Professional Trading Services</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Welcome to Trading with{" "}
              <span className="text-gradient">Rosie Phạm</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Empowering your financial future with expert trading strategies. 
              Experience a calm, professional approach to building sustainable wealth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="shadow-soft hover:shadow-card transition-all">
                <Link to="/contact">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#results">See Client Results</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-8 right-8 hidden lg:flex gap-6">
          {[
            { value: "500+", label: "Happy Clients" },
            { value: "98%", label: "Success Rate" },
            { value: "5+", label: "Years Experience" },
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

      {/* Client Results Section */}
      <section id="results" className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how our clients have achieved remarkable success through tailored trading strategies
              and expert guidance.
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl bg-card shadow-elevated p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="hidden md:block">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl font-serif font-bold text-primary">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-serif font-bold text-primary">
                        {testimonials[currentTestimonial].profit}
                      </div>
                      <div className="text-xs text-muted-foreground">Portfolio Growth</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial
                        ? "bg-primary w-6"
                        : "bg-border hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trading Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive trading solutions designed to help you achieve your financial goals
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
            Join hundreds of successful traders who have transformed their financial future
            with expert guidance and proven strategies.
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
