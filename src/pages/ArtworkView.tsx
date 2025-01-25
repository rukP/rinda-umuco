import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArtworkContent } from "@/components/content/ArtworkContent";
import { MusicContent } from "@/components/content/MusicContent";
import { StoryContent } from "@/components/content/StoryContent";
import { CommentsSection } from "@/components/content/CommentsSection";
import { ContentHeader } from "@/components/content/ContentHeader";
import { useContent } from "@/hooks/use-content";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import type { Comment } from "@/types/content";

const ArtworkView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const { data: content, isLoading, error } = useContent(id || '');

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Invalid content ID or content not found. Redirecting to artwork page...",
        variant: "destructive",
      });
      // Redirect after a short delay
      const timeout = setTimeout(() => navigate('/artwork'), 2000);
      return () => clearTimeout(timeout);
    }
  }, [error, navigate]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: content?.title,
        text: content?.description,
        url: window.location.href,
      });
    } catch (err) {
      toast({
        title: "Copied to clipboard!",
        description: "Share the link with your friends",
      });
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;

    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast({
        title: "Authentication required",
        description: "Please login to comment",
      });
      return;
    }

    const newComment = {
      id: crypto.randomUUID(),
      content: comment,
      author: session.session.user.email!,
      createdAt: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('content')
      .update({
        comments: [...comments, newComment],
      })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
      });
      return;
    }

    setComments([...comments, newComment]);
    setComment("");
    toast({
      title: "Success",
      description: "Comment added successfully",
    });
  };

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 p-6">
            <SidebarTrigger />
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-4">
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (!content) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <ArtworkContent content={content} />
              <MusicContent content={content} />
              <StoryContent content={content} />

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold">{content.title}</CardTitle>
                  <span className="text-sm text-rwandan-terracotta">{content.category}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ContentHeader content={content} onShare={handleShare} />
                <CommentsSection
                  comments={comments}
                  comment={comment}
                  onCommentChange={setComment}
                  onCommentSubmit={handleComment}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ArtworkView;