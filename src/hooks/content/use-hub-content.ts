import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ContentType } from "@/types/content";
import { toast } from "@/hooks/use-toast";

const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const useHubContent = (hubId: string) => {
  return useQuery({
    queryKey: ['hub-content', hubId],
    queryFn: async () => {
      try {
        if (!isValidUUID(hubId)) {
          throw new Error('Invalid hub ID format');
        }

        const { data, error } = await supabase
          .from('content')
          .select()
          .eq('hub_id', hubId);

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        return data as ContentType[];
      } catch (error) {
        console.error('Query error:', error);
        const message = error instanceof Error ? error.message : 'Failed to load hub content';
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: Boolean(hubId),
  });
};