import { useQuery } from "@tanstack/react-query";
import { mockHubs } from "@/lib/mock-data";
import type { Hub } from "@/types/hub";

export const useHubs = () => {
  return useQuery({
    queryKey: ['hubs'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockHubs;
    },
  });
};

export const useHub = (id: string) => {
  return useQuery({
    queryKey: ['hub', id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const hub = mockHubs.find(h => h.id === id);
      if (!hub) throw new Error('Hub not found');
      return hub;
    },
    enabled: Boolean(id),
  });
};