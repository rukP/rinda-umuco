import { useQuery } from "@tanstack/react-query";
import { mockContent } from "@/lib/mock-data";
import type { ContentType } from "@/types/content";

export const useFeaturedContent = () => {
  return useQuery({
    queryKey: ['featured-content'],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockContent;
    },
  });
};