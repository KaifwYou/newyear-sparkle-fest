import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Calendar, Clock } from "lucide-react";
import heroImage from "@/assets/hero-celebration.jpg";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    const newYear = new Date("January 1, 2025 00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = newYear - now;

      if (distance < 0) {
        setIsNewYear(true);
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const launchFirework = () => {
    // Create firework effect
    const colors = ['firework-red', 'firework-blue', 'firework-green', 'firework-purple'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const firework = document.createElement('div');
    firework.className = `fixed w-4 h-4 bg-${color} rounded-full animate-firework pointer-events-none z-50`;
    firework.style.left = Math.random() * window.innerWidth + 'px';
    firework.style.top = Math.random() * window.innerHeight + 'px';
    
    document.body.appendChild(firework);
    
    setTimeout(() => {
      document.body.removeChild(firework);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-midnight/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center space-y-12">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-gold animate-countdown-pulse">
              {isNewYear ? "Happy 2025!" : "2025"}
            </h1>
            <p className="text-xl md:text-2xl text-sparkle animate-float">
              {isNewYear ? "Welcome to the New Year!" : "New Year Countdown"}
            </p>
          </div>

          {/* Countdown Timer */}
          {!isNewYear && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <Card key={unit} className="bg-card/80 backdrop-blur-sm border-gold/30 celebration-glow">
                  <div className="p-6 text-center">
                    <div className="text-4xl md:text-6xl font-bold text-gold mb-2">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wide">
                      {unit}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* New Year Message */}
          {isNewYear && (
            <Card className="max-w-2xl mx-auto bg-card/90 backdrop-blur-sm border-gold/50 celebration-glow-strong">
              <div className="p-8 text-center space-y-4">
                <Sparkles className="w-16 h-16 text-gold mx-auto animate-sparkle" />
                <h2 className="text-3xl font-bold text-gold">
                  🎉 Happy New Year! 🎉
                </h2>
                <p className="text-lg text-foreground/90">
                  May 2025 bring you joy, success, and amazing adventures!
                </p>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={launchFirework}
              className="bg-primary hover:bg-primary/90 text-primary-foreground celebration-glow hover-celebrate"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Launch Firework
            </Button>
            
            <Button 
              variant="secondary"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              size="lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Plan 2025
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-16">
            <div className="text-center">
              <Clock className="w-8 h-8 text-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-gold">365</div>
              <div className="text-sm text-muted-foreground">Days of Possibilities</div>
            </div>
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">∞</div>
              <div className="text-sm text-muted-foreground">Dreams to Chase</div>
            </div>
            <div className="text-center">
              <Calendar className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-secondary">12</div>
              <div className="text-sm text-muted-foreground">Months of Adventures</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;