import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ContentType } from "@/types/content";
import { toast } from "@/hooks/use-toast";

export const useFeaturedContent = () => {
  return useQuery({
    queryKey: ['featured-content'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('content')
          .select()
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        return data as ContentType[];
      } catch (error) {
        console.error('Query error:', error);
        toast({
          title: "Error",
          description: "Failed to load content. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
  });
};