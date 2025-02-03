
import { useQuery } from "@tanstack/react-query";
import type { ContentType, Comment } from "@/types/content";
import { mockContent } from "@/lib/mock-data";

const transformContent = (rawContent: any): ContentType => {
  return {
    ...rawContent,
    comments: Array.isArray(rawContent.comments) 
      ? rawContent.comments.map((comment: any) => ({
          id: comment.id || String(Math.random()),
          content: comment.content,
          author: comment.author,
          createdAt: comment.created_at || new Date().toISOString()
        }))
      : []
  };
};

export const useHubContent = (hubId: string) => {
  return useQuery({
    queryKey: ['hub-content', hubId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter mock content by hub_id
      const hubContent = mockContent.filter(content => content.hub_id === hubId);
      return hubContent.map(transformContent);
    },
    enabled: Boolean(hubId),
  });
};
