import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContentCard } from "@/components/ContentCard";
import type { ContentType } from "@/types/content";

const artworkContent: ContentType[] = [
  {
    id: "1",
    type: "artwork",
    title: "Modern Imigongo Art",
    category: "Visual Art",
    image: "/placeholder.svg",
    description: "A contemporary interpretation of traditional Rwandan geometric patterns, featuring bold colors and intricate designs.",
    author: "Alice Mukamana",
  },
  {
    id: "2",
    type: "artwork",
    title: "Traditional Basket Weaving",
    category: "Crafts",
    image: "/placeholder.svg",
    description: "Exquisite Agaseke baskets showcasing the intricate patterns and techniques passed down through generations.",
    author: "Jean Bosco",
  },
  {
    id: "3",
    type: "artwork",
    title: "Contemporary Sculpture",
    category: "Sculpture",
    image: "/placeholder.svg",
    description: "A modern sculpture inspired by Rwanda's hills and traditional motifs.",
    author: "Patrick Nduwumwe",
  },
];

const Artwork = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-12 animate-fadeIn">
              <h1 className="text-4xl font-bold text-rwandan-brown mb-4">
                Rwandan Artwork Gallery
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover beautiful artworks that showcase Rwanda's rich artistic heritage
              </p>
            </header>

            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artworkContent.map((content, index) => (
                  <ContentCard key={index} content={content} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Artwork;