import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import type { ContentType, Comment } from "@/types/content";
import { ArtworkContent } from "@/components/content/ArtworkContent";
import { MusicContent } from "@/components/content/MusicContent";
import { StoryContent } from "@/components/content/StoryContent";
import { CommentsSection } from "@/components/content/CommentsSection";
import { ContentHeader } from "@/components/content/ContentHeader";

const ArtworkView = () => {
  const { id } = useParams();
  const [content, setContent] = useState<ContentType | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!id) {
          setError("No content ID provided");
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('content')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) {
          console.error('Error fetching content:', fetchError);
          setError("Failed to load content. Please try again later.");
          toast({
            title: "Error",
            description: "Failed to load content",
            variant: "destructive",
          });
          return;
        }

        if (!data) {
          setError("Content not found");
          return;
        }

        setContent(data);
        setComments(data.comments || []);
      } catch (err) {
        console.error('Error:', err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [id]);

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
                <div className="h-96 bg-gray-200 rounded-lg"></div>
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (error) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 p-6">
            <SidebarTrigger />
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {error}
              </h2>
              <p className="text-gray-600">
                Please try again later or contact support if the problem persists.
              </p>
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