import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Globe, Twitter, Instagram, Youtube, MapPin } from "lucide-react";

interface ProfileHeaderProps {
  profile: {
    full_name?: string;
    avatar_url?: string;
    location?: string;
    bio?: string;
    website?: string;
    social_links?: {
      twitter?: string;
      instagram?: string;
      youtube?: string;
    };
  };
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const socialLinks = profile?.social_links || {};

  return (
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
  );
}