import { useTranslation } from "react-i18next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContentCard } from "@/components/ContentCard";
import { useFeaturedContent } from "@/hooks/use-content";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  const { data: content, isLoading, error } = useFeaturedContent();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const filteredAndSortedContent = content
    ?.filter((item) => {
      if (!search) return true;
      const searchLower = search.toLowerCase();
      return (
        item.title?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.category?.toLowerCase().includes(searchLower) ||
        item.author?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime();
        case "oldest":
          return new Date(a.created_at || "").getTime() - new Date(b.created_at || "").getTime();
        case "popular":
          return ((b.views || 0) - (a.views || 0));
        case "title":
          return (a.title || "").localeCompare(b.title || "");
        default:
          return 0;
      }
    });

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

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg" />
                  ))
                ) : error ? (
                  <div className="col-span-full text-center text-red-500">
                    Failed to load content. Please try again later.
                  </div>
                ) : filteredAndSortedContent?.length === 0 ? (
                  <div className="col-span-full text-center text-muted-foreground">
                    No content found matching your search.
                  </div>
                ) : (
                  filteredAndSortedContent?.map((item) => (
                    <ContentCard key={item.id} content={item} />
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;