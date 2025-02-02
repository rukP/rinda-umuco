import { useHubContent } from "@/hooks/content";
import { ContentGrid } from "@/components/profile/ContentGrid";

interface HubContentProps {
  hubId: string;
}

export function HubContent({ hubId }: HubContentProps) {
  const { data: hubContent, isLoading, error } = useHubContent(hubId);

  if (isLoading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div>Failed to load hub content. Please try again later.</div>;
  }

  return <ContentGrid content={hubContent} />;
}