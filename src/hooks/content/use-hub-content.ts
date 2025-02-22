import { useQuery } from "@tanstack/react-query";
import type { ContentType } from "@/types/content";
import { mockContent } from "@/lib/mock-data";

export const useHubContent = (hubId: string) => {
  return useQuery({
    queryKey: ['hub-content', hubId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter mock content by hub_id
      const hubContent = mockContent.filter(content => content.hub_id === hubId);
      console.log('Hub content:', hubContent);
      return hubContent;
    },
    enabled: Boolean(hubId),
  });
};