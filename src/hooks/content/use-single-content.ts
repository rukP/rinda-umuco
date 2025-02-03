
import { useQuery } from "@tanstack/react-query";
import type { ContentType, Comment } from "@/types/content";
import { mockContent } from "@/lib/mock-data";

interface RawContent {
  id: string;
  title: string;
  description: string;
  type: "artwork" | "music" | "story" | "poetry";
  image?: string;
  mediaUrl?: string;
  category?: string;
  author?: string;
  isDance?: boolean;
  inspiration?: string;
  lyrics?: string;
  verses?: string;
  content?: string;
  lesson?: string;
  created_at?: string;
  updated_at?: string;
  views?: number;
  likes?: number;
  comments: any;
  user_id: string;
  hub_id?: string;
}

const isValidContentType = (type: string): type is RawContent['type'] => {
  return ['artwork', 'music', 'story', 'poetry'].includes(type);
};

const transformContent = (rawContent: any): ContentType | null => {
  if (!rawContent) return null;
  
  if (!isValidContentType(rawContent.type)) {
    console.error('Invalid content type:', rawContent.type);
    return null;
  }

  return {
    ...rawContent,
    type: rawContent.type as RawContent['type'],
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

export const useSingleContent = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find content by id in mock data
      const content = mockContent.find(item => item.id === id);
      if (!content) return null;
      
      return transformContent(content);
    },
    enabled: Boolean(id),
  });
};
