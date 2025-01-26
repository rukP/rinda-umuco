export type ContentType = {
  id: string;
  title: string;
  description: string;
  type: "artwork" | "music" | "story";
  image_url?: string;
  created_at: string;
  popularity?: number;
};