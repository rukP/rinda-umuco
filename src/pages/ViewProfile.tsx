import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentCard } from "@/components/ContentCard";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-7xl mx-auto">
            {profileLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-[250px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            ) : (
              <header className="text-center mb-12 animate-fadeIn">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback>{profile?.full_name?.[0]}</AvatarFallback>
                </Avatar>
                <h1 className="text-4xl font-bold text-rwandan-brown mb-4">
                  {profile?.full_name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {profile?.bio}
                </p>
              </header>
            )}

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
                {/* Similar grid but with filtered recent content */}
              </TabsContent>

              <TabsContent value="popular">
                {/* Similar grid but with filtered popular content */}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ViewProfile;