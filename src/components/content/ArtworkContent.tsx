import { ContentType } from "@/types/content";

interface ArtworkContentProps {
  content: ContentType;
}

export const ArtworkContent = ({ content }: ArtworkContentProps) => {
  if (content.type !== 'artwork') return null;
  
  return (
    <div className="relative h-96 overflow-hidden">
      <img
        src={content.image}
        alt={content.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
};