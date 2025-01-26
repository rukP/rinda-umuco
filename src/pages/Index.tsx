import { useTranslation } from "react-i18next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContentCard } from "@/components/ContentCard";
import { useFeaturedContent } from "@/hooks/use-content";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const { t } = useTranslation();
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
                {t("home.title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("home.subtitle")}
              </p>
            </header>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-rwandan-terracotta">
                {t("featured.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredContent?.map((content) => (
                  <ContentCard key={content.id} content={content} />
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