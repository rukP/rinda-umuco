import { useQuery } from "@tanstack/react-query";
import { mockContent } from "@/lib/mock-data";
import type { ContentType } from "@/types/content";

export const useContentByAuthor = (author: string) => {
  return useQuery({
    queryKey: ['author-content', author],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockContent.filter(item => item.author === author);
    },
  });
};