import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ContentType } from "@/types/content";

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

const transformContent = (rawContent: RawContent | null): ContentType | null => {
  if (!rawContent) return null;
  
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

export const useSingleContent = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return transformContent(data);
    },
    enabled: Boolean(id),
  });
};