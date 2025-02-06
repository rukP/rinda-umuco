
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Hub } from "@/types/hub";

export const useHubs = () => {
  return useQuery({
    queryKey: ['hubs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hubs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Hub[];
    },
  });
};

export const useHub = (id: string) => {
  return useQuery({
    queryKey: ['hub', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hubs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Hub;
    },
    enabled: Boolean(id),
  });
};

export const useCreateHub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (hubData: Omit<Hub, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('hubs')
        .insert(hubData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hubs'] });
    },
  });
};
