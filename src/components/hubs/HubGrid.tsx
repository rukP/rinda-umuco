import { HubCard } from "./HubCard";
import type { Hub } from "@/types/hub";

interface HubGridProps {
  hubs?: Hub[];
  isLoading: boolean;
  error: unknown;
}

export function HubGrid({ hubs, isLoading, error }: HubGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg" />
        ))
      ) : error ? (
        <div className="col-span-full text-center text-red-500">
          Failed to load hubs. Please try again later.
        </div>
      ) : hubs?.length === 0 ? (
        <div className="col-span-full text-center text-muted-foreground">
          No hubs found matching your criteria.
        </div>
      ) : (
        hubs?.map((hub) => (
          <HubCard key={hub.id} hub={hub} />
        ))
      )}
    </div>
  );
}