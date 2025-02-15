
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Hub } from "@/types/hub";

export const useHub = (id: string) => {
  return useQuery({
    queryKey: ['hub', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hubs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data as Hub;
    },
    enabled: Boolean(id),
  });
};

export const useHubs = () => {
  return useQuery({
    queryKey: ['hubs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hubs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as Hub[];
    },
  });
};
