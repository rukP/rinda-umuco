import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContentCard } from "@/components/ContentCard";
import type { ContentType } from "@/types/content";

const musicContent: ContentType[] = [
  {
    id: "1",
    type: "music",
    title: "Traditional Inanga Performance",
    category: "Traditional Music",
    mediaUrl: "https://www.youtube.com/embed/example1",
    description: "A mesmerizing performance of Rwanda's traditional trough-zither, showcasing ancient melodies.",
    author: "Emmanuel Habimana",
    lyrics: "Traditional lyrics...",
    isDance: false,
  },
  {
    id: "2",
    type: "music",
    title: "Modern Fusion Rhythms",
    category: "Contemporary",
    mediaUrl: "https://www.youtube.com/embed/example2",
    description: "Blending traditional Rwandan instruments with modern beats to create unique soundscapes.",
    author: "Marie Claire",
    lyrics: "Modern fusion lyrics...",
    isDance: false,
  },
  {
    id: "3",
    type: "music",
    title: "Ceremonial Drums Ensemble",
    category: "Traditional Music",
    mediaUrl: "https://www.youtube.com/embed/example3",
    description: "A powerful performance of traditional Rwandan drumming, featuring the iconic Ingoma drums.",
    author: "The Royal Drummers",
    lyrics: "Ceremonial lyrics...",
    isDance: true,
  },
];

const Music = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-12 animate-fadeIn">
              <h1 className="text-4xl font-bold text-rwandan-brown mb-4">
                Rwandan Music Collection
              </h1>
              <p className="text-lg text-muted-foreground">
                Experience the rhythms and melodies of Rwanda's musical heritage
              </p>
            </header>

            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {musicContent.map((content, index) => (
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

export default Music;