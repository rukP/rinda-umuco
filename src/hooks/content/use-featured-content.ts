
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ContentType } from "@/types/content";

export const useFeaturedContent = () => {
  return useQuery({
    queryKey: ['featured-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as ContentType[];
    },
  });
};
