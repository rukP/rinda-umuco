import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        navigate('/login');
        return null;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        // If profile doesn't exist, create a default one
        if (error.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: session.user.id,
                full_name: session.user.email?.split('@')[0] || 'New User',
                avatar_url: '',
                bio: '',
                location: '',
                website: '',
                social_links: {}
              }
            ])
            .select()
            .single();

          if (createError) {
            toast({
              title: "Error",
              description: "Failed to create profile",
              variant: "destructive",
            });
            throw createError;
          }
          return newProfile;
        }

        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: content, isLoading: contentLoading } = useQuery({
    queryKey: ['user-content', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];

      const { data, error } = await supabase
        .from('content')
        .select()
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
      return data;
    },
    enabled: !!session?.user?.id,
  });

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

export default Profile;