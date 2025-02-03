import { useQuery } from "@tanstack/react-query";
import { mockContent } from "@/lib/mock-data";
import type { ContentType } from "@/types/content";

export const useHubContent = (hubId: string) => {
  return useQuery({
    queryKey: ['hub-content', hubId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockContent.filter(item => item.hubId === hubId);
    },
    enabled: Boolean(hubId),
  });
};