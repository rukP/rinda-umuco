import type { ContentType } from "@/types/content";
import type { Hub } from "@/types/hub";

export const mockContent: ContentType[] = [
  {
    id: "1",
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
  },
  {
    id: "2",
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
  },
];

export const mockHubs: Hub[] = [
  {
    id: "1",
    name: "Rwanda Dance Academy",
    description: "Preserving traditional dance",
    type: "dance_group",
    admin_id: "1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    location: "Kigali, Rwanda",
  },
  {
    id: "2",
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
