
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ContentType } from "@/types/content";

export const useSingleContent = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        return null;
      }

      return data as ContentType;
    },
    enabled: Boolean(id),
  });
};
