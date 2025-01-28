import { MainLayout } from "@/components/layouts/MainLayout";
import { ContentCard } from "@/components/ContentCard";
import { useContentByType } from "@/hooks/use-content-query";
import { useTranslation } from "react-i18next";
import { Image } from "lucide-react";

const Artwork = () => {
  const { t } = useTranslation();
  const { data: artworks, isLoading } = useContentByType("artwork");

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Image className="h-8 w-8 text-rwandan-terracotta" />
            <h1 className="text-4xl font-bold text-rwandan-brown">
              {t("artwork.title")}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("artwork.subtitle")}
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
            {artworks?.map((artwork) => (
              <ContentCard key={artwork.id} content={artwork} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Artwork;