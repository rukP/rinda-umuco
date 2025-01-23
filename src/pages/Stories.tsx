import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContentCard } from "@/components/ContentCard";

const storiesContent = [
  {
    title: "The Wise Hare",
    category: "Folk Tale",
    description: "A beloved tale about a clever hare who outsmarts larger animals, teaching valuable lessons about wisdom over strength.",
    author: "Elder Kamanzi",
  },
  {
    title: "Unity is Strength",
    category: "Proverb",
    description: "Exploring the meaning behind the famous Rwandan proverb 'Umwe si umwe' (One person is no person).",
    author: "Prof. Mutesi",
  },
  {
    title: "The First King",
    category: "Historical Tale",
    description: "The origin story of Rwanda's first Mwami (king) and the founding of the kingdom.",
    author: "Historical Society",
  },
];

const Stories = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-12 animate-fadeIn">
              <h1 className="text-4xl font-bold text-rwandan-brown mb-4">
                Stories & Proverbs
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover the wisdom and imagination in Rwanda's oral traditions
              </p>
            </header>

            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storiesContent.map((content, index) => (
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

export default Stories;