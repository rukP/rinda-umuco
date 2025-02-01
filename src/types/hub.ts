export type HubType = 'art_gallery' | 'dance_group' | 'music_group' | 'cultural_organization' | 'other';

export interface Hub {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description?: string;
  type: HubType;
  logo_url?: string;
  banner_url?: string;
  website?: string;
  social_links?: Record<string, string>;
  location?: string;
  admin_id: string;
}