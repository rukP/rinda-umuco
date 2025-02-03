
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import type { ContentType } from "@/types/content";
import { mockContent } from "@/lib/mock-data";

export const useContentQuery = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const content = mockContent.find(item => item.id === id);
      
      if (!content) {
        toast({
          title: "Error",
          description: "Failed to load content",
          variant: "destructive",
        });
        throw new Error("Content not found");
      }

      return content as ContentType;
    },
    retry: false,
  });
};

export const useContentByType = (type: string) => {
  return useQuery({
    queryKey: ['content', type],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const content = mockContent.filter(item => item.type === type);
      
      if (!content.length) {
        toast({
          title: "Error",
          description: `Failed to load ${type} content`,
          variant: "destructive",
        });
        throw new Error("No content found");
      }

      return content as ContentType[];
    },
  });
};
