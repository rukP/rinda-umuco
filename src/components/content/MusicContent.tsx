import { ContentType } from "@/types/content";

interface MusicContentProps {
  content: ContentType;
}

export const MusicContent = ({ content }: MusicContentProps) => {
  if (content.type !== 'music' && content.type !== 'poetry') return null;

  return (
    <div className="p-6">
      {content.type === 'music' && content.mediaUrl && (
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
        {content.type === 'music' && content.lyrics && (
          <>
            <h3 className="text-lg font-semibold mb-2">Lyrics</h3>
            <pre className="whitespace-pre-wrap">{content.lyrics}</pre>
          </>
        )}
        {content.type === 'poetry' && content.verses && (
          <>
            <h3 className="text-lg font-semibold mb-2">Verses</h3>
            <pre className="whitespace-pre-wrap">{content.verses}</pre>
          </>
        )}
      </div>
    </div>
  );
};