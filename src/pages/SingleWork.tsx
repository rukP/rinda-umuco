import { useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArtworkContent } from "@/components/content/ArtworkContent";
import { MusicContent } from "@/components/content/MusicContent";
import { StoryContent } from "@/components/content/StoryContent";
import { ContentHeader } from "@/components/content/ContentHeader";
import { CommentsSection } from "@/components/content/CommentsSection";
import { useContent } from "@/hooks/use-content";

const SingleWork = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { data: work, isLoading, error } = useContent(id || "");

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 p-6">
            <SidebarTrigger />
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <p>Loading...</p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (error || !work) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 p-6">
            <SidebarTrigger />
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <p>Work not found</p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: work.title,
        text: work.description,
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

  const handleComment = () => {
    if (!comment.trim()) return;
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully",
    });
    
    setComment("");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              {work.type === "artwork" && <ArtworkContent content={work} />}
              {work.type === "music" && <MusicContent content={work} />}
              {work.type === "story" && <StoryContent content={work} />}

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold">{work.title}</CardTitle>
                  <span className="text-sm text-rwandan-terracotta">{work.category}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ContentHeader content={work} onShare={handleShare} />
                <CommentsSection
                  comments={work.comments}
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

export default SingleWork;