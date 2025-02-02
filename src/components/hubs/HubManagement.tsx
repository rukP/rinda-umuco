import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHub } from "@/hooks/use-hubs";
import { useAuth } from "@/hooks/use-auth";
import { HubMembers } from "./HubMembers";
import { HubContent } from "./HubContent";

export function HubManagement() {
  const { id } = useParams<{ id: string }>();
  const { data: hub, isLoading } = useHub(id!);
  const { session } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hub) {
    return <div>Hub not found</div>;
  }

  const isAdmin = session?.user?.id === hub.admin_id;

  if (!isAdmin) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Access Restricted</h2>
        <p className="text-muted-foreground">
          Only hub administrators can access this dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">Hub Dashboard</h1>
        <p className="text-muted-foreground">Manage your hub's content and members</p>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <HubMembers hubId={id!} />
        </TabsContent>

        <TabsContent value="content">
          <HubContent hubId={id!} />
        </TabsContent>
      </Tabs>
    </div>
  );
}