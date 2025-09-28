import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw, Trophy } from "lucide-react";
import { toast } from "sonner";

interface Firework {
  id: string;
  x: number;
  y: number;
  color: string;
  quote: string;
}

const motivationalQuotes = [
  "Dream big, start small, but most importantly, start! 🌟",
  "The best time to plant a tree was 20 years ago. The second best time is now! 🌳",
  "You are never too old to set another goal or dream a new dream! ✨",
  "Success is not final, failure is not fatal: it is the courage to continue that counts! 💪",
  "The future belongs to those who believe in the beauty of their dreams! 🦋",
  "Every expert was once a beginner. Every pro was once an amateur! 🚀",
  "You don't have to be great to get started, but you have to get started to be great! ⭐",
  "The only impossible journey is the one you never begin! 🗺️",
  "Believe you can and you're halfway there! 🎯",
  "Your limitation—it's only your imagination! 💫",
  "Great things never come from comfort zones! 🦅",
  "Don't watch the clock; do what it does. Keep going! ⏰",
  "The harder you work for something, the greater you'll feel when you achieve it! 🏆",
  "Don't stop when you're tired. Stop when you're done! 🔥",
  "Success doesn't just find you. You have to go out and get it! 🎪",
];

const fireworkColors = [
  "bg-firework-red",
  "bg-firework-blue", 
  "bg-firework-green",
  "bg-firework-purple",
  "bg-gold",
];

const FireworkGame = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuote, setCurrentQuote] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const createFirework = (x: number, y: number) => {
    const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
    const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    const firework: Firework = {
      id: Date.now().toString(),
      x,
      y,
      color,
      quote,
    };

    setFireworks(prev => [...prev, firework]);
    setCurrentQuote(quote);
    setShowQuote(true);
    setScore(prev => prev + 10);

    // Remove firework after animation
    setTimeout(() => {
      setFireworks(prev => prev.filter(f => f.id !== firework.id));
    }, 1000);

    // Hide quote after showing it
    setTimeout(() => {
      setShowQuote(false);
    }, 3000);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    createFirework(x, y);
  };

  const resetGame = () => {
    setScore(0);
    setFireworks([]);
    setCurrentQuote("");
    setShowQuote(false);
    setGameStarted(false);
    toast.success("Game reset! Click anywhere to launch fireworks! 🎆");
  };

  useEffect(() => {
    if (score > 0 && score % 100 === 0) {
      toast.success(`Amazing! You've reached ${score} points! 🏆`, {
        duration: 2000,
      });
    }
  }, [score]);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4 animate-float">
            Firework Game
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Click anywhere to launch fireworks and discover motivational quotes for 2025!
          </p>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm border-gold/30 px-6 py-3">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-gold" />
              <span className="text-lg font-bold text-gold">Score: {score}</span>
            </div>
          </Card>
          
          <Button
            onClick={resetGame}
            variant="outline"
            className="border-border/30 hover:border-gold/50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Game
          </Button>
        </div>

        {/* Game Area */}
        <div className="relative">
          <Card 
            className="w-full h-[600px] bg-midnight/50 backdrop-blur-sm border-border/30 cursor-crosshair overflow-hidden relative"
            onClick={handleClick}
          >
            {/* Instructions */}
            {!gameStarted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Sparkles className="w-16 h-16 text-gold mx-auto animate-sparkle" />
                  <h3 className="text-2xl font-bold text-gold">
                    Click anywhere to launch fireworks!
                  </h3>
                  <p className="text-foreground/70">
                    Each firework reveals a motivational quote for your 2025 journey
                  </p>
                </div>
              </div>
            )}

            {/* Fireworks */}
            {fireworks.map((firework) => (
              <div
                key={firework.id}
                className={`absolute w-8 h-8 ${firework.color} rounded-full animate-firework pointer-events-none`}
                style={{
                  left: firework.x - 16,
                  top: firework.y - 16,
                }}
              >
                {/* Particles */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 ${firework.color} rounded-full`}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-20px)`,
                      animation: `firework 1s ease-out forwards`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Ambient Sparkles */}
            {gameStarted && [...Array(15)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-sparkle rounded-full animate-sparkle pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </Card>

          {/* Quote Display */}
          {showQuote && currentQuote && (
            <Card className="absolute top-4 left-1/2 transform -translate-x-1/2 max-w-md bg-card/95 backdrop-blur-sm border-gold/50 celebration-glow animate-fade-in">
              <div className="p-4 text-center">
                <p className="text-foreground font-medium leading-relaxed">
                  {currentQuote}
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Game Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="bg-card/60 backdrop-blur-sm border-border/30 p-4 text-center">
            <Sparkles className="w-8 h-8 text-gold mx-auto mb-2" />
            <h4 className="font-bold text-gold mb-1">Click Fast</h4>
            <p className="text-sm text-foreground/70">
              Rapid clicks create amazing firework shows!
            </p>
          </Card>
          
          <Card className="bg-card/60 backdrop-blur-sm border-border/30 p-4 text-center">
            <Trophy className="w-8 h-8 text-firework-blue mx-auto mb-2" />
            <h4 className="font-bold text-firework-blue mb-1">Collect Points</h4>
            <p className="text-sm text-foreground/70">
              Each firework gives you 10 points!
            </p>
          </Card>
          
          <Card className="bg-card/60 backdrop-blur-sm border-border/30 p-4 text-center">
            <Sparkles className="w-8 h-8 text-firework-purple mx-auto mb-2" />
            <h4 className="font-bold text-firework-purple mb-1">Get Inspired</h4>
            <p className="text-sm text-foreground/70">
              Every firework reveals motivation for 2025!
            </p>
          </Card>
        </div>

        {/* High Score Display */}
        {score >= 100 && (
          <div className="text-center mt-8">
            <Card className="inline-block bg-card/90 backdrop-blur-sm border-gold/50 celebration-glow-strong px-8 py-4">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-gold animate-sparkle" />
                <div>
                  <h3 className="text-xl font-bold text-gold">Firework Master!</h3>
                  <p className="text-sm text-foreground/80">You're on fire! Keep launching! 🎆</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FireworkGame;