
import { Home, Image, Music, BookOpen, Plus, LogIn, UserPlus, User, Users } from "lucide-react";
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
import { useAuth } from "@/hooks/use-auth";
import { LanguageSelector } from "@/components/LanguageSelector";

export function AppSidebar() {
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

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2">
              <LanguageSelector />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
