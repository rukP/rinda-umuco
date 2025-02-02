import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ContentGrid } from "@/components/profile/ContentGrid";

interface HubContentProps {
  hubId: string;
}

export function HubContent({ hubId }: HubContentProps) {
  const { data: hubContent, isLoading, error } = useQuery({
    queryKey: ['hub-content', hubId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select()
        .eq('hub_id', hubId);

      if (error) {
        console.error('Error fetching hub content:', error);
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div>Failed to load hub content. Please try again later.</div>;
  }

  return <ContentGrid content={hubContent} />;
}