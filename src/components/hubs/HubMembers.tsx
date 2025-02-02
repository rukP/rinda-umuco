import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface HubMembersProps {
  hubId: string;
}

export function HubMembers({ hubId }: HubMembersProps) {
  const [isPromoting, setIsPromoting] = useState(false);

  const { data: members, isLoading } = useQuery({
    queryKey: ['hub-members', hubId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hub_members')
        .select('*, profiles:user_id(*)')
        .eq('hub_id', hubId);

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
        .eq('hub_id', hubId)
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

  if (isLoading) {
    return <div>Loading members...</div>;
  }

  return (
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
  );
}