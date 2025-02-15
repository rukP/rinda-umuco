
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { ContentType } from "@/types/content";

export const useContentQuery = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load content",
          variant: "destructive",
        });
        throw error;
      }

      if (!data) {
        throw new Error("Content not found");
      }

      return data as ContentType;
    },
    retry: false,
  });
};

export const useContentByType = (type: string) => {
  return useQuery({
    queryKey: ['content', type],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', type)
        .order('created_at', { ascending: false });
      
      if (error) {
        toast({
          title: "Error",
          description: `Failed to load ${type} content`,
          variant: "destructive",
        });
        throw error;
      }

      return data as ContentType[];
    },
  });
};
