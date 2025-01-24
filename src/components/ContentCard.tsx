import { Share2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import type { ContentType } from "@/types/content";
import { useState } from "react";

interface ContentCardProps {
  content: ContentType;
}

export function ContentCard({ content }: ContentCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: content.title,
        text: content.description,
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

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg animate-fadeIn">
      {((content.type === 'artwork' && content.image) || 
        (content.type === 'story' && content.image)) && !imageError && (
        <Link to={`/artwork/${content.id}`} className="block">
          <div className="relative h-48 overflow-hidden">
            <img
              src={content.image}
              alt={content.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform hover:scale-105"
              onError={handleImageError}
            />
          </div>
        </Link>
      )}
      
      {content.type === 'music' && content.mediaUrl && (
        <div className="p-4">
          {content.mediaUrl.includes('youtube') ? (
            <iframe
              width="100%"
              height="200"
              src={content.mediaUrl}
              title="Music preview"
              allowFullScreen
              className="rounded-lg"
            />
          ) : (
            <audio controls className="w-full">
              <source src={content.mediaUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      )}

      <CardHeader>
        <div className="flex items-center justify-between">
          <Link to={`/artwork/${content.id}`}>
            <CardTitle className="text-xl font-semibold hover:text-rwandan-terracotta transition-colors">
              {content.title}
            </CardTitle>
          </Link>
          <span className="text-sm text-rwandan-terracotta">
            {content.category}
            {content.type === 'music' && content.isDance && ' (Dance)'}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">{content.description}</p>
        <Link 
          to={`/profile/${content.author}`} 
          className="mt-2 text-sm text-rwandan-brown hover:text-rwandan-terracotta transition-colors flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          {content.author}
        </Link>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}