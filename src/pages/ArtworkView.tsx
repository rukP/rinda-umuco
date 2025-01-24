import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Share2, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import type { ContentType, Comment } from "@/types/content";

const ArtworkView = () => {
  const { id } = useParams();
  const { t } = useTranslation();
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
              {content.type === 'artwork' && (
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}

              {content.type === 'music' && (
                <div className="p-6">
                  {content.mediaUrl && (
                    <div className="mb-6">
                      {content.mediaUrl.includes('youtube') ? (
                        <iframe
                          width="100%"
                          height="315"
                          src={content.mediaUrl}
                          title="Music video"
                          allowFullScreen
                          className="rounded-lg"
                        />
                      ) : (
                        <audio controls className="w-full">
                          <source src={content.mediaUrl} />
                        </audio>
                      )}
                    </div>
                  )}
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-2">Lyrics</h3>
                    <pre className="whitespace-pre-wrap">{content.lyrics}</pre>
                  </div>
                </div>
              )}

              {content.type === 'story' && (
                <div className="p-6">
                  {content.image && (
                    <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                      <img
                        src={content.image}
                        alt={content.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="prose max-w-none">
                    <div className="mb-6">{content.content}</div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Lesson</h3>
                      <p>{content.lesson}</p>
                    </div>
                  </div>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold">{content.title}</CardTitle>
                  <span className="text-sm text-rwandan-terracotta">{content.category}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{content.description}</p>
                
                {content.inspiration && (
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Inspiration</h3>
                    <p className="text-sm">{content.inspiration}</p>
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{content.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{content.author}</p>
                    <p className="text-sm text-muted-foreground">{t("content.creator")}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Comments
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1"
                      />
                      <Button onClick={handleComment}>Post</Button>
                    </div>

                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">{comment.author}</p>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
