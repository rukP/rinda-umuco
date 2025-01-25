import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContentCard } from "@/components/ContentCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedContent } from "@/hooks/use-content";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const { data: featuredContent, isLoading, error } = useFeaturedContent();

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load content. Please try again later.",
      variant: "destructive",
    });
  }

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
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredContent?.map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;