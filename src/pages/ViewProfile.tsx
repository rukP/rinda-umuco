import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentCard } from "@/components/ContentCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Globe, Twitter, Instagram, Youtube, MapPin } from "lucide-react";

const ViewProfile = () => {
  const { username } = useParams();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('full_name', username)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: content, isLoading: contentLoading } = useQuery({
    queryKey: ['author-content', username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('author', username)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const socialLinks = profile?.social_links || {};

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-7xl mx-auto">
            {profileLoading ? (
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-32 w-32 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-[250px]" />
                    <Skeleton className="h-4 w-[300px]" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-fadeIn">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="text-4xl">
                      {profile?.full_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-4 flex-1">
                    <div>
                      <h1 className="text-4xl font-bold text-rwandan-brown mb-2">
                        {profile?.full_name}
                      </h1>
                      {profile?.location && (
                        <p className="text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {profile.location}
                        </p>
                      )}
                    </div>
                    
                    <p className="text-lg max-w-2xl">
                      {profile?.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {profile?.website && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={profile.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4 mr-2" />
                            Website
                          </a>
                        </Button>
                      )}
                      {socialLinks.twitter && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`https://twitter.com/${socialLinks.twitter}`} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </a>
                        </Button>
                      )}
                      {socialLinks.instagram && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`https://instagram.com/${socialLinks.instagram}`} target="_blank" rel="noopener noreferrer">
                            <Instagram className="h-4 w-4 mr-2" />
                            Instagram
                          </a>
                        </Button>
                      )}
                      {socialLinks.youtube && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`https://youtube.com/${socialLinks.youtube}`} target="_blank" rel="noopener noreferrer">
                            <Youtube className="h-4 w-4 mr-2" />
                            YouTube
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="all">All Content</TabsTrigger>
                        <TabsTrigger value="recent">Recent</TabsTrigger>
                        <TabsTrigger value="popular">Popular</TabsTrigger>
                      </TabsList>

                      <TabsContent value="all" className="mt-6">
                        {contentLoading ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                              <Skeleton key={i} className="h-[300px]" />
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {content?.map((item) => (
                              <ContentCard key={item.id} content={item} />
                            ))}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="recent">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {content?.slice(0, 6).map((item) => (
                            <ContentCard key={item.id} content={item} />
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="popular">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {content?.sort((a, b) => (b.likes || 0) - (a.likes || 0))
                            .slice(0, 6)
                            .map((item) => (
                              <ContentCard key={item.id} content={item} />
                            ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ViewProfile;