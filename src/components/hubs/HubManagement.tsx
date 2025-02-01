import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useHub } from "@/hooks/use-hubs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentGrid } from "@/components/profile/ContentGrid";
import { useQuery } from "@tanstack/react-query";
import { User, UserPlus } from "lucide-react";

export function HubManagement() {
  const { id } = useParams<{ id: string }>();
  const { data: hub, isLoading: isHubLoading } = useHub(id!);
  const [isPromoting, setIsPromoting] = useState(false);

  const { data: members, isLoading: isMembersLoading } = useQuery({
    queryKey: ['hub-members', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hub_members')
        .select('*, profiles:user_id(*)')
        .eq('hub_id', id);

      if (error) throw error;
      return data;
    },
  });

  const { data: hubContent } = useQuery({
    queryKey: ['hub-content', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('hub_id', id);

      if (error) throw error;
      return data;
    },
  });

  const promoteToAdmin = async (userId: string) => {
    try {
      setIsPromoting(true);
      const { error } = await supabase
        .from('hub_members')
        .update({ role: 'admin' })
        .eq('hub_id', id)
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Member has been promoted to admin",
      });
    } catch (error) {
      console.error('Error promoting member:', error);
      toast({
        title: "Error",
        description: "Failed to promote member",
        variant: "destructive",
      });
    } finally {
      setIsPromoting(false);
    }
  };

  if (isHubLoading || isMembersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members?.map((member) => (
              <div key={member.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{member.profiles?.full_name || 'Anonymous'}</span>
                  </div>
                  <span className="text-sm text-muted-foreground capitalize">
                    {member.role}
                  </span>
                </div>
                {member.role === 'member' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => promoteToAdmin(member.user_id)}
                    disabled={isPromoting}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Promote to Admin
                  </Button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content">
          <ContentGrid content={hubContent} />
        </TabsContent>
      </Tabs>
    </div>
  );
}