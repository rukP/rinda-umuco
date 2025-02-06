
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Hub } from "@/types/hub";

// Mock data
const mockHubs: Hub[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Sample Art Gallery",
    description: "A beautiful art gallery",
    type: "art_gallery",
    location: "Kigali",
    admin_id: "1",
  },
];

export const useHubs = () => {
  return useQuery({
    queryKey: ['hubs'],
    queryFn: async () => {
      return mockHubs;
    },
  });
};

export const useHub = (id: string) => {
  return useQuery({
    queryKey: ['hub', id],
    queryFn: async () => {
      return mockHubs[0];
    },
    enabled: Boolean(id),
  });
};

export const useCreateHub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (hubData: Omit<Hub, 'id' | 'created_at' | 'updated_at'>) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...hubData, id: Math.random().toString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hubs'] });
    },
  });
};
