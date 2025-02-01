import { MainLayout } from "@/components/layouts/MainLayout";
import { HubManagement } from "@/components/hubs/HubManagement";
import { useHub } from "@/hooks/use-hubs";
import { useParams } from "react-router-dom";

export default function ViewHub() {
  const { id } = useParams<{ id: string }>();
  const { data: hub, isLoading, error } = useHub(id!);

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

  return (
    <MainLayout>
      <div className="container max-w-7xl py-8 animate-fadeIn">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-rwandan-brown mb-4">
            {hub.name}
          </h1>
          {hub.description && (
            <p className="text-lg text-muted-foreground">
              {hub.description}
            </p>
          )}
        </header>

        <HubManagement />
      </div>
    </MainLayout>
  );
}