import { useQuery } from "@tanstack/react-query";
import { mockContent } from "@/lib/mock-data";
import type { ContentType } from "@/types/content";

export const useContent = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const content = mockContent.find(item => item.id === id);
      if (!content) throw new Error('Content not found');
      return content;
    },
    enabled: Boolean(id),
  });
};