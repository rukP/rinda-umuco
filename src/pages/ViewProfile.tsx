import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      if (!username) {
        toast({
          title: "Error",
          description: "Username is required",
          variant: "destructive",
        });
        navigate('/');
        return null;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('full_name', decodeURIComponent(username))
        .maybeSingle();
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
        throw error;
      }

      if (!data) {
        toast({
          title: "Profile not found",
          description: `No profile found for username "${username}"`,
          variant: "destructive",
        });
        navigate('/');
        return null;
      }

      return data;
    },
    retry: false,
  });

  const { data: content, isLoading: contentLoading } = useContentByAuthor(username || '');

  if (!username) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-7xl mx-auto">
            {profileLoading ? (
              <ProfileSkeleton />
            ) : profile ? (
              <div className="space-y-8 animate-fadeIn">
                <ProfileHeader profile={profile} />
                <ProfileContent content={content} isLoading={contentLoading} />
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ViewProfile;