import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Users } from "lucide-react";
import type { Hub } from "@/types/hub";

interface HubCardProps {
  hub: Hub;
}

export function HubCard({ hub }: HubCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/hubs/${hub.id}`}>
        {hub.banner_url && (
          <div className="relative h-32 overflow-hidden">
            <img
              src={hub.banner_url}
              alt={`${hub.name} banner`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={hub.logo_url} alt={hub.name} />
            <AvatarFallback>{hub.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-semibold hover:text-rwandan-terracotta transition-colors">
              {hub.name}
            </CardTitle>
            <p className="text-sm text-rwandan-terracotta capitalize">
              {hub.type.replace(/_/g, ' ')}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2 mb-4">
            {hub.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {hub.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{hub.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Members</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}