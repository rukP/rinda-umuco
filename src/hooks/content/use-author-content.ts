import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ContentType } from "@/types/content";
import { toast } from "@/hooks/use-toast";

export const useContentByAuthor = (author: string) => {
  return useQuery({
    queryKey: ['author-content', author],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('content')
          .select()
          .eq('author', author)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        return data as ContentType[];
      } catch (error) {
        console.error('Query error:', error);
        toast({
          title: "Error",
          description: "Failed to load author content. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
  });
};