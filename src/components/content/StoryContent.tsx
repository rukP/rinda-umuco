import { ContentType } from "@/types/content";

interface StoryContentProps {
  content: ContentType;
}

export const StoryContent = ({ content }: StoryContentProps) => {
  if (content.type !== 'story') return null;

  return (
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
  );
};