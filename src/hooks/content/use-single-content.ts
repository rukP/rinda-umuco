import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ContentType } from "@/types/content";
import { toast } from "@/hooks/use-toast";

const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const useContent = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      try {
        if (!isValidUUID(id)) {
          throw new Error('Invalid content ID format');
        }

        const { data, error } = await supabase
          .from('content')
          .select()
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        if (!data) {
          throw new Error('Content not found');
        }

        return data as ContentType;
      } catch (error) {
        console.error('Query error:', error);
        const message = error instanceof Error ? error.message : 'Failed to load content';
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: Boolean(id),
  });
};