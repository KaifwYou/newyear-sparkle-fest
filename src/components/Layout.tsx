import { NavLink, Outlet } from "react-router-dom";
import { Clock, Heart, Gamepad2, RotateCcw, Images, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const navItems = [
    { to: "/", icon: Clock, label: "Countdown" },
    { to: "/resolutions", icon: Heart, label: "Resolutions" },
    { to: "/fireworks", icon: Gamepad2, label: "Fireworks" },
    { to: "/lucky-wheel", icon: RotateCcw, label: "Lucky Wheel" },
    { to: "/memories", icon: Images, label: "Memories" },
  ];

  return (
    <div className="min-h-screen bg-midnight">
      {/* Navigation */}
      <nav className="border-b border-border/20 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-gold animate-sparkle" />
              <span className="text-2xl font-bold text-gold">NY 2025</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink key={to} to={to}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`
                        flex items-center space-x-2 transition-all duration-300
                        ${isActive 
                          ? "bg-primary text-primary-foreground celebration-glow" 
                          : "text-foreground/80 hover:text-gold hover:bg-card/60"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{label}</span>
                    </Button>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Floating Sparkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-sparkle rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;