import { MainLayout } from "@/components/layouts/MainLayout";
import { HubGrid } from "@/components/hubs/HubGrid";
import { HubFilters } from "@/components/hubs/HubFilters";
import { useHubs } from "@/hooks/use-hubs";
import { useState } from "react";
import type { HubType } from "@/types/hub";

const Hubs = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<HubType | "all">("all");
  const { data: hubs, isLoading, error } = useHubs();

  const filteredHubs = hubs?.filter((hub) => {
    const matchesSearch = search.trim() === "" || 
      hub.name.toLowerCase().includes(search.toLowerCase()) ||
      hub.description?.toLowerCase().includes(search.toLowerCase()) ||
      hub.location?.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "all" || hub.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <MainLayout>
      <div className="container max-w-7xl py-8 animate-fadeIn">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-rwandan-brown mb-4">
            Creative Hubs
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover and join creative organizations and groups
          </p>
        </header>

        <HubFilters
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
        />

        <HubGrid 
          hubs={filteredHubs} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </MainLayout>
  );
};

export default Hubs;