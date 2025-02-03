import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ContentType } from "@/types/content";

export const useHubContent = (hubId: string) => {
  return useQuery({
    queryKey: ['hub-content', hubId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('hub_id', hubId);

      if (error) throw error;
      return data as ContentType[];
    },
    enabled: Boolean(hubId),
  });
};