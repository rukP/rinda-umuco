import { useParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Share2, MessageCircle, Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

// Dummy data
const works = {
  "1": {
    id: "1",
    title: "Digital Landscape",
    type: "artwork",
    description: "A futuristic landscape created using digital techniques",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    inspiration: "Inspired by cyberpunk aesthetics and modern city landscapes",
    category: "Digital Art",
    comments: []
  },
  "2": {
    id: "2",
    title: "Urban Symphony",
    type: "music",
    description: "A musical piece that captures the essence of city life",
    author: "Jane Smith",
    mediaUrl: "https://example.com/music.mp3",
    lyrics: "City lights shine bright tonight\nPeople rushing by...",
    inspiration: "The rhythmic sounds of urban life",
    category: "Electronic",
    comments: []
  },
  "3": {
    id: "3",
    title: "The Last Journey",
    type: "story",
    description: "A short story about self-discovery",
    author: "Alex Johnson",
    content: "It was a dark and stormy night when the journey began...",
    lesson: "Sometimes the most important discoveries are within ourselves",
    inspiration: "Personal experiences and classic literature",
    category: "Short Story",
    comments: []
  }
};

const SingleWork = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const work = works[id as keyof typeof works];

  if (!work) {
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
              {work.type === "artwork" && (
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}

              {work.type === "music" && (
                <div className="p-6">
                  <audio controls className="w-full mb-6">
                    <source src={work.mediaUrl} />
                  </audio>
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-2">Lyrics</h3>
                    <pre className="whitespace-pre-wrap">{work.lyrics}</pre>
                  </div>
                </div>
              )}

              {work.type === "story" && (
                <div className="p-6">
                  <div className="prose max-w-none">
                    <div className="mb-6">{work.content}</div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Lesson</h3>
                      <p>{work.lesson}</p>
                    </div>
                  </div>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold">{work.title}</CardTitle>
                  <span className="text-sm text-rwandan-terracotta">{work.category}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{work.description}</p>
                
                {work.inspiration && (
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Inspiration
                    </h3>
                    <p className="text-sm">{work.inspiration}</p>
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{work.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{work.author}</p>
                    <p className="text-sm text-muted-foreground">Creator</p>
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

                    {work.comments.map((comment: any) => (
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
};

export default SingleWork;