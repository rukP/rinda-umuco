
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ContentType } from "@/types/content";

export const useContentByAuthor = (author: string) => {
  return useQuery({
    queryKey: ['author-content', author],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('author', author)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as ContentType[];
    },
    enabled: Boolean(author),
  });
};
