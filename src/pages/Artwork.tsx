
import { MainLayout } from "@/components/layouts/MainLayout";
import { ContentCard } from "@/components/ContentCard";
import { useContentByType } from "@/hooks/use-content-query";
import { Button } from "@/components/ui/button";
import { Image, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Artwork = () => {
  const navigate = useNavigate();
  const { data: artworks, isLoading } = useContentByType("artwork");

  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <Image className="h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={() => navigate('/create/artwork')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Artwork
          </Button>
        </div>

        <header className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Image className="h-8 w-8 text-rwandan-terracotta" />
            <h1 className="text-4xl font-bold text-rwandan-brown">
              Rwandan Art Gallery
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore art that showcases the richness of Rwandan culture
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
        ) : artworks?.length === 0 ? (
          <div className="text-center py-12">
            <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No artworks found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Be the first to share your artwork with the community
            </p>
            <Button
              onClick={() => navigate('/create/artwork')}
              className="flex items-center gap-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              Create Artwork
            </Button>
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
