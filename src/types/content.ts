export type ContentType = {
  id: string;
  title: string;
  description: string;
  type: "artwork" | "music" | "story";
  image?: string;
  mediaUrl?: string;
  category?: string;
  author?: string;
  isDance?: boolean;
  inspiration?: string;
  lyrics?: string;
  content?: string;
  lesson?: string;
  image_url?: string;
  created_at?: string;
  popularity?: number;
};

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}