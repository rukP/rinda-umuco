import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { ContentType } from "@/types/content";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: profile, isLoading: profileLoading, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
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
    }
  });

  const { data: content, isLoading: contentLoading } = useQuery({
    queryKey: ['user-content'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load content",
          variant: "destructive",
        });
        throw error;
      }

      return data as ContentType[];
    }
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8 animate-fadeIn">
              <div className="flex justify-between items-start">
                <ProfileHeader profile={profile} />
                {profile && (
                  <EditProfileDialog 
                    profile={profile} 
                    onUpdate={refetchProfile}
                  />
                )}
              </div>
              <ProfileContent content={content} isLoading={contentLoading || profileLoading} />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Profile;