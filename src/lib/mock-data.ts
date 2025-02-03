import type { ContentType } from "@/types/content";
import type { Hub } from "@/types/hub";

export const mockContent: ContentType[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    title: "Traditional Dance",
    description: "A beautiful traditional dance performance",
    type: "artwork",
    category: "Dance",
    author: "Jean Mugisha",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "1",
    image: "https://images.unsplash.com/photo-1545959570-a94084071b5d",
    views: 100,
    likes: 50,
    comments: [],
    hub_id: "223e4567-e89b-12d3-a456-426614174000"
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    title: "Folk Tale: The Wise Lion",
    description: "A story about wisdom and courage",
    type: "story",
    category: "Folk Tales",
    author: "Marie Uwase",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "2",
    content: "Once upon a time in Rwanda...",
    lesson: "Wisdom comes to those who listen",
    views: 150,
    likes: 75,
    comments: [],
    hub_id: "223e4567-e89b-12d3-a456-426614174000"
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    title: "Intore Dance Music",
    description: "Traditional Rwandan dance music",
    type: "music",
    category: "Traditional",
    author: "Bernard Karemera",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "3",
    mediaUrl: "https://example.com/music.mp3",
    isDance: true,
    views: 200,
    likes: 120,
    comments: [],
    hub_id: "223e4567-e89b-12d3-a456-426614174000"
  }
];

export const mockHubs: Hub[] = [
  {
    id: "223e4567-e89b-12d3-a456-426614174000",
    name: "Rwanda Dance Academy",
    description: "Preserving traditional dance",
    type: "dance_group",
    admin_id: "1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    location: "Kigali, Rwanda",
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174000",
    name: "Storytellers Guild",
    description: "Sharing our cultural heritage",
    type: "cultural_organization",
    admin_id: "2",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    location: "Butare, Rwanda",
  },
];

export const mockProfile = {
  id: "1",
  full_name: "Jean Mugisha",
  avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  bio: "Traditional artist and dancer",
  location: "Kigali, Rwanda",
  website: "https://example.com",
  social_links: {
    twitter: "@jeanmugisha",
    instagram: "@jean.art",
  },
};

export const mockSession = {
  user: {
    id: "1",
    email: "jean@example.com",
  },
};
