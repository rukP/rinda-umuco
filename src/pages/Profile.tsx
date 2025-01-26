import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContent } from "@/components/profile/ProfileContent";

const mockProfile = {
  full_name: "John Doe",
  avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  location: "Kigali, Rwanda",
  bio: "Digital artist and storyteller exploring the intersection of traditional Rwandan art and modern digital techniques.",
  website: "https://example.com",
  social_links: {
    twitter: "johndoe",
    instagram: "johndoe.art",
    youtube: "@johndoe"
  }
};

const mockContent = [
  {
    id: "1",
    title: "Traditional Dance",
    description: "A digital interpretation of Rwandan traditional dance",
    type: "artwork",
    image_url: "https://api.dicebear.com/7.x/shapes/svg?seed=1",
    created_at: new Date().toISOString(),
    popularity: 156
  },
  {
    id: "2",
    title: "Modern Patterns",
    description: "Exploring modern patterns inspired by Imigongo",
    type: "artwork",
    image_url: "https://api.dicebear.com/7.x/shapes/svg?seed=2",
    created_at: new Date().toISOString(),
    popularity: 89
  },
  {
    id: "3",
    title: "Digital Landscapes",
    description: "Rwanda's landscapes in digital art",
    type: "artwork",
    image_url: "https://api.dicebear.com/7.x/shapes/svg?seed=3",
    created_at: new Date().toISOString(),
    popularity: 234
  }
];

const Profile = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8 animate-fadeIn">
              <ProfileHeader profile={mockProfile} />
              <ProfileContent content={mockContent} isLoading={false} />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Profile;