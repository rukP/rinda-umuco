import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { Comment } from "@/types/content";

interface CommentsSectionProps {
  comments: Comment[];
  comment: string;
  onCommentChange: (value: string) => void;
  onCommentSubmit: () => void;
}

export const CommentsSection = ({
  comments,
  comment,
  onCommentChange,
  onCommentSubmit,
}: CommentsSectionProps) => {
  return (
    <div className="border-t pt-6">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        Comments
      </h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Textarea
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1"
          />
          <Button onClick={onCommentSubmit}>Post</Button>
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
  );
};