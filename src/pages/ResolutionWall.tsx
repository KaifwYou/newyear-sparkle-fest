import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Plus, Star, Target, Zap } from "lucide-react";
import { toast } from "sonner";

interface Resolution {
  id: string;
  text: string;
  author: string;
  category: string;
  timestamp: Date;
}

const ResolutionWall = () => {
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [newResolution, setNewResolution] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("personal");

  const categories = [
    { id: "personal", label: "Personal Growth", icon: Star, color: "text-gold" },
    { id: "health", label: "Health & Fitness", icon: Heart, color: "text-firework-red" },
    { id: "career", label: "Career & Goals", icon: Target, color: "text-firework-blue" },
    { id: "adventure", label: "Adventures", icon: Zap, color: "text-firework-purple" },
  ];

  // Load resolutions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ny2025-resolutions');
    if (saved) {
      const parsed = JSON.parse(saved).map((r: any) => ({
        ...r,
        timestamp: new Date(r.timestamp)
      }));
      setResolutions(parsed);
    }
  }, []);

  // Save resolutions to localStorage
  const saveResolutions = (newResolutions: Resolution[]) => {
    localStorage.setItem('ny2025-resolutions', JSON.stringify(newResolutions));
    setResolutions(newResolutions);
  };

  const addResolution = () => {
    if (!newResolution.trim() || !authorName.trim()) {
      toast.error("Please fill in both your name and resolution!");
      return;
    }

    const resolution: Resolution = {
      id: Date.now().toString(),
      text: newResolution.trim(),
      author: authorName.trim(),
      category: selectedCategory,
      timestamp: new Date()
    };

    const updatedResolutions = [resolution, ...resolutions];
    saveResolutions(updatedResolutions);
    
    setNewResolution("");
    setAuthorName("");
    
    toast.success("Your resolution has been added to the wall! 🎉");
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : Star;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : "text-gold";
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4 animate-float">
            Resolution Wall
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Share your dreams and goals for 2025. Pin your resolution to the wall and see what others are planning!
          </p>
        </div>

        {/* Add Resolution Form */}
        <Card className="max-w-2xl mx-auto mb-12 bg-card/90 backdrop-blur-sm border-gold/30 celebration-glow">
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gold flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add Your Resolution
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="bg-midnight-light border-border/30"
              />
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-midnight-light border border-border/30 rounded-md text-foreground"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <Textarea
              placeholder="What's your resolution for 2025?"
              value={newResolution}
              onChange={(e) => setNewResolution(e.target.value)}
              className="bg-midnight-light border-border/30 min-h-[100px]"
            />
            
            <Button
              onClick={addResolution}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground celebration-glow hover-celebrate"
              size="lg"
            >
              <Heart className="w-5 h-5 mr-2" />
              Pin to Wall
            </Button>
          </div>
        </Card>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${category.color} hover:scale-105 transition-transform`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Resolutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resolutions
            .filter(resolution => selectedCategory === "all" || resolution.category === selectedCategory)
            .map((resolution, index) => {
              const IconComponent = getCategoryIcon(resolution.category);
              const colorClass = getCategoryColor(resolution.category);
              
              return (
                <Card
                  key={resolution.id}
                  className="bg-card/80 backdrop-blur-sm border-border/30 hover:border-gold/50 transition-all duration-300 hover-celebrate"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <IconComponent className={`w-5 h-5 ${colorClass}`} />
                      <span className="text-xs text-muted-foreground">
                        {resolution.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-foreground leading-relaxed">
                      "{resolution.text}"
                    </p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-border/20">
                      <span className="text-sm font-medium text-gold">
                        - {resolution.author}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-background/50 ${colorClass}`}>
                        {categories.find(c => c.id === resolution.category)?.label}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>

        {/* Empty State */}
        {resolutions.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold text-muted-foreground mb-2">
              Start the Wall!
            </h3>
            <p className="text-muted-foreground">
              Be the first to share your resolution for 2025
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-6 bg-card/60 backdrop-blur-sm rounded-full px-6 py-3 border border-border/30">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-firework-red" />
              <span className="text-sm">
                <span className="font-bold text-firework-red">{resolutions.length}</span> Resolutions
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-gold" />
              <span className="text-sm">
                <span className="font-bold text-gold">{new Set(resolutions.map(r => r.author)).size}</span> Dreamers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolutionWall;