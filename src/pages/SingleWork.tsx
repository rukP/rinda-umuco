import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import { ErrorMessage } from "@/components/ui/error-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArtworkContent } from "@/components/content/ArtworkContent";
import { MusicContent } from "@/components/content/MusicContent";
import { StoryContent } from "@/components/content/StoryContent";
import { ContentHeader } from "@/components/content/ContentHeader";
import { CommentsSection } from "@/components/content/CommentsSection";
import { useContentQuery } from "@/hooks/use-content-query";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import type { Comment } from "@/types/content";

const SingleWork = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { data: work, isLoading, error, refetch } = useContentQuery(id || "");

  const handleShare = async () => {
    try {
      await navigator.share({
        title: work?.title,
        text: work?.description,
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
    if (!comment.trim() || !work) return;

    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast({
        title: "Authentication required",
        description: "Please login to comment",
      });
      return;
    }

    const newComment: Comment = {
      id: crypto.randomUUID(),
      content: comment,
      author: session.session.user.email!,
      createdAt: new Date().toISOString(),
    };

    const currentComments = work.comments || [];
    const updatedComments = [...currentComments, newComment];

    const { error: updateError } = await supabase
      .from('content')
      .update({
        comments: updatedComments,
      })
      .eq('id', work.id);

    if (updateError) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
      return;
    }

    setComment("");
    refetch();
    toast({
      title: "Success",
      description: "Comment added successfully",
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-96 bg-muted rounded-lg" />
          <div className="h-8 w-3/4 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded" />
        </div>
      </MainLayout>
    );
  }

  if (error || !work) {
    return (
      <MainLayout>
        <ErrorMessage 
          title="Content not found" 
          message="The requested content could not be found or has been removed." 
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
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
            comments={work.comments || []}
            comment={comment}
            onCommentChange={setComment}
            onCommentSubmit={handleComment}
          />
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default SingleWork;