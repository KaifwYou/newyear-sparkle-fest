import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Countdown from "./pages/Countdown";
import ResolutionWall from "./pages/ResolutionWall";
import FireworkGame from "./pages/FireworkGame";
import LuckyWheel from "./pages/LuckyWheel";
import MemorySlideshow from "./pages/MemorySlideshow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Countdown />} />
            <Route path="resolutions" element={<ResolutionWall />} />
            <Route path="fireworks" element={<FireworkGame />} />
            <Route path="lucky-wheel" element={<LuckyWheel />} />
            <Route path="memories" element={<MemorySlideshow />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
