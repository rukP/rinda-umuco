import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@/lib/i18n";
import Index from "./pages/Index";
import Artwork from "./pages/Artwork";
import ArtworkView from "./pages/ArtworkView";
import Music from "./pages/Music";
import Stories from "./pages/Stories";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ViewProfile from "./pages/ViewProfile";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/artwork" element={<Artwork />} />
          {/* Redirect old artwork URLs to new work URLs */}
          <Route path="/artwork/:id" element={<Navigate to={(location) => location.pathname.replace('artwork', 'work')} />} />
          <Route path="/work/:id" element={<ArtworkView />} />
          <Route path="/music" element={<Music />} />
          <Route path="/stories" element={<Stories />} />
          <Route 
            path="/create" 
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/profile/:username" element={<ViewProfile />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;