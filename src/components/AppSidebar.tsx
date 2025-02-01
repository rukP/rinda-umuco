import { Home, Image, Music, BookOpen, Plus, LogIn, UserPlus, Globe, User, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function AppSidebar() {
  const { t, i18n } = useTranslation();
  const { session } = useAuth();

  const menuItems = [
    { title: "Home", icon: Home, url: "/" },
    { title: "Artwork Gallery", icon: Image, url: "/artwork" },
    { title: "Music Collection", icon: Music, url: "/music" },
    { title: "Stories Archive", icon: BookOpen, url: "/stories" },
    { title: "Creative Hubs", icon: Users, url: "/hubs" },
    { title: "Create New", icon: Plus, url: "/create" },
  ];

  const authItems = session ? [
    { title: "My Profile", icon: User, url: "/profile" }
  ] : [
    { title: "Sign In", icon: LogIn, url: "/login" },
    { title: "Sign Up", icon: UserPlus, url: "/signup" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'rw':
        return 'Kinyarwanda';
      case 'en':
        return 'English';
      case 'fr':
        return 'Français';
      default:
        return 'Kinyarwanda';
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Explore</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Globe className="h-4 w-4 mr-2" />
                {getLanguageLabel(i18n.language)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => changeLanguage('rw')}>
                Kinyarwanda
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('fr')}>
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}