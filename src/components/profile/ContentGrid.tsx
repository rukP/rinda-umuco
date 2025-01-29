import { ContentCard } from "@/components/ContentCard";
import type { ContentType } from "@/types/content";

interface ContentGridProps {
  content?: ContentType[];
}

export function ContentGrid({ content }: ContentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {content?.map((item) => (
        <ContentCard key={item.id} content={item} />
      ))}
    </div>
  );
}