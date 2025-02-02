import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ContentGrid } from "@/components/profile/ContentGrid";

interface HubContentProps {
  hubId: string;
}

export function HubContent({ hubId }: HubContentProps) {
  const { data: hubContent, isLoading } = useQuery({
    queryKey: ['hub-content', hubId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('hub_id', hubId);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading content...</div>;
  }

  return <ContentGrid content={hubContent} />;
}