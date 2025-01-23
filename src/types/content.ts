export type BaseContent = {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  inspiration?: string;
  comments?: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
};

export type Artwork = BaseContent & {
  type: 'artwork';
  image: string;
};

export type Music = BaseContent & {
  type: 'music';
  lyrics: string;
  mediaUrl?: string;
  isDance: boolean;
  image?: string; // Added image as optional for music
};

export type Story = BaseContent & {
  type: 'story';
  content: string;
  lesson: string;
  image?: string;
};

export type ContentType = Artwork | Music | Story;