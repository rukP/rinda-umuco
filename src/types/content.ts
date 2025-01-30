export type ContentType = {
  id: string;
  title: string;
  description: string;
  type: "artwork" | "music" | "story" | "poetry";
  image?: string;
  mediaUrl?: string;
  category?: string;
  author?: string;
  isDance?: boolean;
  inspiration?: string;
  lyrics?: string;
  verses?: string;
  content?: string;
  lesson?: string;
  created_at?: string;
  updated_at?: string;
  views?: number;
  likes?: number;
  comments: Comment[];
  user_id: string;
};

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}