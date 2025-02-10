
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/providers/AuthProvider";
import Index from "@/pages/Index";
import Artwork from "@/pages/Artwork";
import Music from "@/pages/Music";
import Stories from "@/pages/Stories";
import Create from "@/pages/Create";
import CreateArtwork from "@/pages/create/CreateArtwork";
import CreateMusic from "@/pages/create/CreateMusic";
import CreateStory from "@/pages/create/CreateStory";
import CreateArtGallery from "@/pages/create/hub/CreateArtGallery";
import CreateDanceGroup from "@/pages/create/hub/CreateDanceGroup";
import CreateMusicGroup from "@/pages/create/hub/CreateMusicGroup";
import CreateCulturalOrg from "@/pages/create/hub/CreateCulturalOrg";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Profile from "@/pages/Profile";
import ViewProfile from "@/pages/ViewProfile";
import SingleWork from "@/pages/SingleWork";
import Hubs from "@/pages/Hubs";
import ViewHub from "@/pages/ViewHub";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/artwork" element={<Artwork />} />
          <Route path="/music" element={<Music />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/hubs" element={<Hubs />} />
          <Route path="/hubs/:id" element={<ViewHub />} />
          <Route path="/create" element={<Create />} />
          <Route path="/create/artwork" element={<CreateArtwork />} />
          <Route path="/create/music" element={<CreateMusic />} />
          <Route path="/create/story" element={<CreateStory />} />
          <Route path="/create/hub/art_gallery" element={<CreateArtGallery />} />
          <Route path="/create/hub/dance_group" element={<CreateDanceGroup />} />
          <Route path="/create/hub/music_group" element={<CreateMusicGroup />} />
          <Route path="/create/hub/cultural_organization" element={<CreateCulturalOrg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<ViewProfile />} />
          <Route path="/:type/:id" element={<SingleWork />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
