import { MainLayout } from "@/components/layouts/MainLayout";
import { HubManagement } from "@/components/hubs/HubManagement";
import { useHub } from "@/hooks/use-hubs";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, Settings } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditHubForm } from "@/components/hubs/EditHubForm";
import { useAuth } from "@/hooks/use-auth";
import { HubContent } from "@/components/hubs/HubContent";

export default function ViewHub() {
  const { id } = useParams<{ id: string }>();
  const { data: hub, isLoading, error } = useHub(id!);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { session } = useAuth();

  if (isLoading) {
    return (
      <MainLayout>
        <div>Loading...</div>
      </MainLayout>
    );
  }

  if (error || !hub) {
    return (
      <MainLayout>
        <div>Failed to load hub</div>
      </MainLayout>
    );
  }

  const isAdmin = session?.user?.id === hub.admin_id;

  return (
    <MainLayout>
      <div className="container max-w-7xl py-8 animate-fadeIn">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-rwandan-brown mb-4">
              {hub.name}
            </h1>
            {hub.description && (
              <p className="text-lg text-muted-foreground">
                {hub.description}
              </p>
            )}
            {hub.location && (
              <p className="text-sm text-muted-foreground mt-2">
                📍 {hub.location}
              </p>
            )}
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Hub
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
          )}
        </header>

        <HubContent hubId={id!} />

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Hub</DialogTitle>
            </DialogHeader>
            <EditHubForm hub={hub} onSuccess={() => setIsEditDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}