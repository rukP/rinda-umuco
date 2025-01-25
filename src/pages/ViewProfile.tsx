import { useParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useContentByAuthor } from "@/hooks/use-content";
import { toast } from "@/hooks/use-toast";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";

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
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
  });

  const { data: content, isLoading: contentLoading } = useContentByAuthor(username || '');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-7xl mx-auto">
            {profileLoading ? (
              <ProfileSkeleton />
            ) : (
              <div className="space-y-8 animate-fadeIn">
                <ProfileHeader profile={profile} />
                <ProfileContent content={content} isLoading={contentLoading} />
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ViewProfile;