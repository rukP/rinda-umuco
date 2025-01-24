import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ContentType } from "@/types/content";

interface ContentHeaderProps {
  content: ContentType;
  onShare: () => void;
}

export const ContentHeader = ({ content, onShare }: ContentHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
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
        <Button variant="outline" size="sm" onClick={onShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};