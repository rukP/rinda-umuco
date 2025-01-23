import { Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface ContentCardProps {
  id?: string;
  title: string;
  category: string;
  image?: string;
  description: string;
  author: string;
}

export function ContentCard({ id, title, category, image, description, author }: ContentCardProps) {
  const handleShare = async () => {
    try {
      await navigator.share({
        title,
        text: description,
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

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg animate-fadeIn">
      {image && (
        <Link to={`/artwork/${id}`} className="block">
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <Link to={`/artwork/${id}`}>
            <CardTitle className="text-xl font-semibold hover:text-rwandan-terracotta transition-colors">
              {title}
            </CardTitle>
          </Link>
          <span className="text-sm text-rwandan-terracotta">{category}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
        <p className="mt-2 text-sm text-rwandan-brown">By {author}</p>
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