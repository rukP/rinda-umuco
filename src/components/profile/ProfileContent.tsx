import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileTabs } from "./ProfileTabs";
import type { ContentType } from "@/types/content";

interface ProfileContentProps {
  content?: ContentType[];
  isLoading: boolean;
}

export function ProfileContent({ content, isLoading }: ProfileContentProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[300px]" />
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <ProfileTabs content={content} />
      </CardContent>
    </Card>
  );
}