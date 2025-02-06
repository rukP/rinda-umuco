
import { MainLayout } from "@/components/layouts/MainLayout";
import { ContentCard } from "@/components/ContentCard";
import { useContentByType } from "@/hooks/use-content-query";
import { Music as MusicIcon, BookOpen } from "lucide-react";

const Music = () => {
  const { data: musicPieces, isLoading: musicLoading } = useContentByType("music");
  const { data: poetryPieces, isLoading: poetryLoading } = useContentByType("poetry");

  const isLoading = musicLoading || poetryLoading;
  const allContent = [...(musicPieces || []), ...(poetryPieces || [])];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-2">
              <MusicIcon className="h-8 w-8 text-rwandan-terracotta" />
              <BookOpen className="h-8 w-8 text-rwandan-terracotta" />
            </div>
            <h1 className="text-4xl font-bold text-rwandan-brown">
              Music & Poetry
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore musical creations and poetic expressions
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="h-96 bg-muted animate-pulse rounded-lg"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allContent?.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Music;
