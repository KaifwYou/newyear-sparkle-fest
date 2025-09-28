import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Images, Upload, Heart, Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";

interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  isPreset?: boolean;
}

const presetMemories: Memory[] = [
  {
    id: "preset-1",
    title: "New Year's Eve 2024",
    description: "The magical countdown that brought us here - filled with hope and excitement for what's to come!",
    date: "December 31, 2024",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    isPreset: true,
  },
  {
    id: "preset-2", 
    title: "Summer Adventures",
    description: "Those sunny days that made our hearts warm and spirits soar. Beach trips, picnics, and endless laughter.",
    date: "July 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    isPreset: true,
  },
  {
    id: "preset-3",
    title: "Graduation Day",
    description: "A milestone achieved, dreams realized, and the beginning of a new chapter in life's adventure.",
    date: "June 10, 2024", 
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    isPreset: true,
  },
  {
    id: "preset-4",
    title: "Family Reunion",
    description: "Hearts together, stories shared, and bonds that make every moment precious and meaningful.",
    date: "August 22, 2024",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714eeab42?w=800&h=600&fit=crop",
    isPreset: true,
  },
  {
    id: "preset-5",
    title: "First Snow",
    description: "Winter's gentle arrival painting the world in pristine white, bringing wonder and peace.",
    date: "December 5, 2024",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
    isPreset: true,
  },
];

const MemorySlideshow = () => {
  const [memories, setMemories] = useState<Memory[]>(presetMemories);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemory, setNewMemory] = useState({
    title: "",
    description: "",
    date: "",
    imageUrl: "",
  });

  // Auto-play slideshow
  useState(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && memories.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % memories.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const addMemory = () => {
    if (!newMemory.title.trim() || !newMemory.imageUrl.trim()) {
      toast.error("Please fill in the title and image URL!");
      return;
    }

    const memory: Memory = {
      id: Date.now().toString(),
      title: newMemory.title.trim(),
      description: newMemory.description.trim(),
      date: newMemory.date || new Date().toLocaleDateString(),
      imageUrl: newMemory.imageUrl.trim(),
    };

    setMemories(prev => [...prev, memory]);
    setNewMemory({ title: "", description: "", date: "", imageUrl: "" });
    setShowAddForm(false);
    
    toast.success("Memory added to your slideshow! 📸");
  };

  const currentMemory = memories[currentIndex];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4 animate-float">
            Memory Slideshow
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Celebrate the beautiful moments that made this year special
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`${
              isPlaying
                ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            } celebration-glow`}
          >
            {isPlaying ? "⏸️ Pause" : "▶️ Play"} Slideshow
          </Button>

          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            variant="outline"
            className="border-border/30 hover:border-gold/50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Memory
          </Button>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Images className="w-4 h-4" />
            <span>{currentIndex + 1} of {memories.length}</span>
          </div>
        </div>

        {/* Add Memory Form */}
        {showAddForm && (
          <Card className="max-w-2xl mx-auto mb-8 bg-card/90 backdrop-blur-sm border-gold/30 celebration-glow">
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-gold flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Add Your Memory
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Memory title"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-midnight-light border-border/30"
                />
                
                <Input
                  type="date"
                  value={newMemory.date}
                  onChange={(e) => setNewMemory(prev => ({ ...prev, date: e.target.value }))}
                  className="bg-midnight-light border-border/30"
                />
              </div>
              
              <Input
                placeholder="Image URL (e.g., from Unsplash, your cloud storage, etc.)"
                value={newMemory.imageUrl}
                onChange={(e) => setNewMemory(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="bg-midnight-light border-border/30"
              />
              
              <Input
                placeholder="Describe this special moment..."
                value={newMemory.description}
                onChange={(e) => setNewMemory(prev => ({ ...prev, description: e.target.value }))}
                className="bg-midnight-light border-border/30"
              />
              
              <div className="flex space-x-3">
                <Button
                  onClick={addMemory}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground celebration-glow"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Add Memory
                </Button>
                
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="border-border/30"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Main Slideshow */}
        {memories.length > 0 && currentMemory && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/90 backdrop-blur-sm border-gold/30 celebration-glow overflow-hidden">
              {/* Image */}
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img
                  src={currentMemory.imageUrl}
                  alt={currentMemory.title}
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop";
                  }}
                />
                
                {/* Navigation Arrows */}
                <Button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none"
                  size="sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                
                <Button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none"
                  size="sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {memories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex ? "bg-gold scale-125" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold text-gold">
                    {currentMemory.title}
                  </h2>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{currentMemory.date}</span>
                  </div>
                </div>
                
                {currentMemory.description && (
                  <p className="text-foreground/90 leading-relaxed text-lg">
                    {currentMemory.description}
                  </p>
                )}

                {currentMemory.isPreset && (
                  <div className="inline-flex items-center space-x-2 text-xs text-gold bg-gold/10 px-3 py-1 rounded-full">
                    <Heart className="w-3 h-3" />
                    <span>Curated Memory</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Memory Gallery */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gold text-center mb-8">
            All Memories ({memories.length})
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {memories.map((memory, index) => (
              <button
                key={memory.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                  index === currentIndex
                    ? "border-gold celebration-glow"
                    : "border-border/30 hover:border-gold/50"
                }`}
              >
                <img
                  src={memory.imageUrl}
                  alt={memory.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop";
                  }}
                />
                
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium text-center px-2">
                    {memory.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {memories.length === 0 && (
          <div className="text-center py-12">
            <Images className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold text-muted-foreground mb-2">
              No Memories Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first special moment
            </p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground celebration-glow"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Memory
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemorySlideshow;