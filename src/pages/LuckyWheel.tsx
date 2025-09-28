import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Star, Sparkles } from "lucide-react";
import { toast } from "sonner";

const predictions = [
  "You'll make a wonderful new friend! 👫",
  "A surprise trip is coming your way! ✈️",
  "Love will find you when you least expect it! 💕",
  "A creative breakthrough awaits! 🎨",
  "Financial abundance is heading your direction! 💰",
  "You'll discover a hidden talent! 🌟",
  "An exciting opportunity will knock! 🚪",
  "Adventure calls your name! 🗺️",
  "Success will crown your efforts! 👑",
  "A dream will finally come true! ✨",
  "Good health and energy will surround you! 💪",
  "Wisdom will guide your important decisions! 🦉",
  "Laughter will fill your days! 😄",
  "A mentor will appear to help you grow! 🌱",
  "Your kindness will return tenfold! 🌈",
  "Technology will open new doors for you! 💻",
];

const wheelColors = [
  "from-firework-red to-firework-red/80",
  "from-firework-blue to-firework-blue/80", 
  "from-firework-green to-firework-green/80",
  "from-firework-purple to-firework-purple/80",
  "from-gold to-gold/80",
  "from-accent to-accent/80",
];

const LuckyWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState("");
  const [wheelRotation, setWheelRotation] = useState(0);
  const [spinCount, setSpinCount] = useState(0);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Calculate random rotation (multiple full spins + random position)
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalPosition = Math.random() * 360;
    const totalRotation = wheelRotation + (spins * 360) + finalPosition;
    
    setWheelRotation(totalRotation);

    // Show spinning state
    setTimeout(() => {
      // Select random prediction
      const selectedPrediction = predictions[Math.floor(Math.random() * predictions.length)];
      setCurrentPrediction(selectedPrediction);
      setIsSpinning(false);
      setSpinCount(prev => prev + 1);
      
      toast.success("Your 2025 prediction is revealed! 🔮", {
        duration: 3000,
      });
    }, 3000);
  };

  const resetWheel = () => {
    setWheelRotation(0);
    setCurrentPrediction("");
    setSpinCount(0);
    toast.success("Wheel reset! Ready for new predictions! 🎡");
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4 animate-float">
            Lucky Spin Wheel
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Spin the wheel and discover what amazing things 2025 has in store for you!
          </p>
        </div>

        {/* Spin Counter */}
        <div className="text-center mb-8">
          <Card className="inline-block bg-card/80 backdrop-blur-sm border-gold/30 px-6 py-3">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-gold" />
              <span className="text-lg font-bold text-gold">
                Spins: {spinCount}
              </span>
            </div>
          </Card>
        </div>

        {/* Wheel Container */}
        <div className="flex flex-col items-center space-y-8">
          {/* Wheel */}
          <div className="relative">
            {/* Wheel Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-gold celebration-glow"></div>
            </div>

            {/* Wheel */}
            <div 
              className={`w-80 h-80 rounded-full border-8 border-gold celebration-glow-strong relative overflow-hidden transition-transform duration-3000 ease-out ${
                isSpinning ? 'animate-spin' : ''
              }`}
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                background: `conic-gradient(
                  ${wheelColors.map((color, i) => 
                    `var(--gradient-celebration) ${i * (360/wheelColors.length)}deg ${(i + 1) * (360/wheelColors.length)}deg`
                  ).join(', ')}
                )`
              }}
            >
              {/* Wheel Sections */}
              {wheelColors.map((_, index) => (
                <div
                  key={index}
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{
                    transform: `rotate(${index * (360 / wheelColors.length)}deg)`,
                    transformOrigin: 'center',
                  }}
                >
                  <div 
                    className="text-white font-bold text-sm absolute top-8"
                    style={{
                      transform: `rotate(${-(index * (360 / wheelColors.length))}deg)`,
                    }}
                  >
                    {index + 1}
                  </div>
                </div>
              ))}

              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gold rounded-full border-4 border-gold-light flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-midnight animate-sparkle" />
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`text-xl px-12 py-6 ${
              isSpinning 
                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                : 'bg-primary hover:bg-primary/90 text-primary-foreground celebration-glow hover-celebrate'
            }`}
            size="lg"
          >
            {isSpinning ? (
              <>
                <RotateCcw className="w-6 h-6 mr-3 animate-spin" />
                Spinning...
              </>
            ) : (
              <>
                <Star className="w-6 h-6 mr-3" />
                Spin for Your Luck!
              </>
            )}
          </Button>

          {/* Reset Button */}
          {spinCount > 0 && (
            <Button
              onClick={resetWheel}
              variant="outline"
              className="border-border/30 hover:border-gold/50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Wheel
            </Button>
          )}
        </div>

        {/* Prediction Result */}
        {currentPrediction && (
          <div className="mt-12 max-w-2xl mx-auto">
            <Card className="bg-card/90 backdrop-blur-sm border-gold/50 celebration-glow-strong animate-scale-in">
              <div className="p-8 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center celebration-glow">
                    <Star className="w-8 h-8 text-midnight animate-sparkle" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gold">
                  Your 2025 Prediction
                </h3>
                
                <p className="text-xl text-foreground leading-relaxed">
                  {currentPrediction}
                </p>
                
                <div className="pt-4 border-t border-border/20">
                  <p className="text-sm text-muted-foreground">
                    Believe in the magic of new beginnings! ✨
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Fortune Tips */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-card/60 backdrop-blur-sm border-border/30 p-6 text-center hover-celebrate">
            <Star className="w-12 h-12 text-gold mx-auto mb-4 animate-float" />
            <h4 className="text-lg font-bold text-gold mb-2">Positive Energy</h4>
            <p className="text-sm text-foreground/70">
              The wheel responds to positive thoughts and open hearts
            </p>
          </Card>
          
          <Card className="bg-card/60 backdrop-blur-sm border-border/30 p-6 text-center hover-celebrate">
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-4 animate-sparkle" />
            <h4 className="text-lg font-bold text-accent mb-2">Make It Real</h4>
            <p className="text-sm text-foreground/70">
              Your actions can turn these predictions into reality
            </p>
          </Card>
          
          <Card className="bg-card/60 backdrop-blur-sm border-border/30 p-6 text-center hover-celebrate">
            <RotateCcw className="w-12 h-12 text-secondary mx-auto mb-4 animate-float" />
            <h4 className="text-lg font-bold text-secondary mb-2">Keep Spinning</h4>
            <p className="text-sm text-foreground/70">
              Life is full of wonderful surprises - spin again anytime!
            </p>
          </Card>
        </div>

        {/* Achievement */}
        {spinCount >= 5 && (
          <div className="text-center mt-12">
            <Card className="inline-block bg-card/90 backdrop-blur-sm border-gold/50 celebration-glow-strong px-8 py-4">
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8 text-gold animate-sparkle" />
                <div>
                  <h3 className="text-xl font-bold text-gold">Fortune Seeker!</h3>
                  <p className="text-sm text-foreground/80">
                    You've spun {spinCount} times - the universe is listening! 🌌
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LuckyWheel;