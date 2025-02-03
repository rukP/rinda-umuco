import { useHubContent } from "@/hooks/content";
import { ContentGrid } from "@/components/profile/ContentGrid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useHub } from "@/hooks/use-hubs";

interface HubContentProps {
  hubId: string;
}

export function HubContent({ hubId }: HubContentProps) {
  const navigate = useNavigate();
  const { data: hubContent, isLoading, error } = useHubContent(hubId);
  const { data: hub } = useHub(hubId);
  const { session } = useAuth();

  const isAdmin = session?.user?.id === hub?.admin_id;

  if (isLoading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div>Failed to load hub content. Please try again later.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Content</h2>
        {isAdmin && (
          <Button onClick={() => navigate("/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        )}
      </div>

      {hubContent && hubContent.length > 0 ? (
        <ContentGrid content={hubContent} />
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No content has been added to this hub yet.
          {isAdmin && " Click the button above to add some content."}
        </div>
      )}
    </div>
  );
}