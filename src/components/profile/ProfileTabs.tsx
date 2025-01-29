import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentGrid } from "./ContentGrid";
import type { ContentType } from "@/types/content";

interface ProfileTabsProps {
  content?: ContentType[];
}

export function ProfileTabs({ content }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="all">All Content</TabsTrigger>
        <TabsTrigger value="recent">Recent</TabsTrigger>
        <TabsTrigger value="popular">Popular</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <ContentGrid content={content} />
      </TabsContent>

      <TabsContent value="recent">
        <ContentGrid content={content?.slice(0, 6)} />
      </TabsContent>

      <TabsContent value="popular">
        <ContentGrid 
          content={content
            ?.sort((a, b) => ((b.views || 0) - (a.views || 0)))
            .slice(0, 6)
          } 
        />
      </TabsContent>
    </Tabs>
  );
}