import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";
import { ContentCard } from "@/components/ContentCard";

interface UserProfile {
  email: string;
  username?: string;
  avatar_url?: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userContent, setUserContent] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setProfile({
          email: session.user.email || "",
          username: session.user.user_metadata?.username,
          avatar_url: session.user.user_metadata?.avatar_url,
        });
      }
    };

    getProfile();
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-12 animate-fadeIn">
              <h1 className="text-4xl font-bold text-rwandan-brown mb-4">
                {t("profile.title")}
              </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>{t("profile.personalInfo")}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>
                      {profile?.username?.[0]?.toUpperCase() || profile?.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-medium">{profile?.username || profile?.email}</h3>
                    <p className="text-sm text-muted-foreground">{profile?.email}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold mb-6">{t("profile.myContributions")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userContent.map((content: any, index) => (
                    <ContentCard key={index} {...content} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Profile;