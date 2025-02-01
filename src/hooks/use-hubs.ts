import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import type { Hub } from "@/types/hub";

export const useHubs = () => {
  return useQuery({
    queryKey: ['hubs'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('hubs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        return data as Hub[];
      } catch (error) {
        console.error('Error fetching hubs:', error);
        toast({
          title: "Error",
          description: "Failed to load hubs. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
  });
};