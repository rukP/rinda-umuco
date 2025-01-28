import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/lib/i18n";
import Index from "./pages/Index";
import SingleWork from "./pages/SingleWork";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ViewProfile from "./pages/ViewProfile";
import Artwork from "./pages/Artwork";
import Music from "./pages/Music";
import Stories from "./pages/Stories";
import Create from "./pages/Create";
import CreateArtwork from "./pages/create/CreateArtwork";
import CreateMusic from "./pages/create/CreateMusic";
import CreateStory from "./pages/create/CreateStory";
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
          <Route path="/work/:id" element={<SingleWork />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/artwork" element={<Artwork />} />
          <Route path="/music" element={<Music />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/create" element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          } />
          <Route path="/create/artwork" element={
            <ProtectedRoute>
              <CreateArtwork />
            </ProtectedRoute>
          } />
          <Route path="/create/music" element={
            <ProtectedRoute>
              <CreateMusic />
            </ProtectedRoute>
          } />
          <Route path="/create/story" element={
            <ProtectedRoute>
              <CreateStory />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/profile/:username" element={<ViewProfile />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;