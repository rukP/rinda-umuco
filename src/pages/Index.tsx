import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContentCard } from "@/components/ContentCard";

const featuredContent = [
  {
    title: "Traditional Dance Performance",
    category: "Music",
    image: "/placeholder.svg",
    description: "Experience the beauty of traditional Rwandan dance through this captivating performance.",
    author: "Marie Uwase",
  },
  {
    title: "The Wise King",
    category: "Stories",
    description: "A traditional tale about wisdom and leadership in ancient Rwanda.",
    author: "Jean Paul Habimana",
  },
  {
    title: "Modern Imigongo",
    category: "Artwork",
    image: "/placeholder.svg",
    description: "A contemporary take on traditional Rwandan geometric patterns.",
    author: "Claire Mutesi",
  },
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-12 animate-fadeIn">
              <h1 className="text-4xl font-bold text-rwandan-brown mb-4">
                Preserve & Share Rwandan Culture
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover and contribute to Rwanda's rich cultural heritage
              </p>
            </header>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-rwandan-terracotta">
                Featured Content
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredContent.map((content, index) => (
                  <ContentCard key={index} {...content} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;