import { ContentCard } from "@/components/ContentCard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
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
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content?.map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content?.slice(0, 6).map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content?.sort((a, b) => ((b.popularity || 0) - (a.popularity || 0)))
                .slice(0, 6)
                .map((item) => (
                  <ContentCard key={item.id} content={item} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}