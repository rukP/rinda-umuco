import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

const ArtworkView = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [artwork, setArtwork] = useState<any>(null);

  useEffect(() => {
    // In a real application, fetch artwork data from Supabase here
    setArtwork({
      title: "Sample Artwork",
      description: "This is a sample artwork description",
      image: "/placeholder.svg",
      author: "John Doe",
      author_avatar: null,
      category: "Visual Art",
    });
  }, [id]);

  if (!artwork) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="relative h-96 overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold">{artwork.title}</CardTitle>
                  <span className="text-sm text-rwandan-terracotta">{artwork.category}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{artwork.description}</p>
                
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={artwork.author_avatar} />
                    <AvatarFallback>{artwork.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{artwork.author}</p>
                    <p className="text-sm text-muted-foreground">{t("artwork.creator")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ArtworkView;