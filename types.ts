// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Image metafield structure
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Social links nested object on profile
export interface ProfileSocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

// Profile object type
export interface Profile extends CosmicObject {
  type: 'profiles';
  metadata: {
    full_name?: string;
    job_title?: string;
    company?: string;
    bio?: string;
    profile_photo?: CosmicImage;
    cover_image?: CosmicImage;
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    brand_color?: string;
    social_links?: ProfileSocialLinks;
    active?: boolean;
  };
}

// Social Link object type
export interface SocialLink extends CosmicObject {
  type: 'social-links';
  metadata: {
    label?: string;
    url?: string;
    platform?: string;
    display_order?: number;
  };
}

// Service object type
export interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    title?: string;
    description?: string;
    image?: CosmicImage;
    profile?: Profile;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isProfile(obj: CosmicObject): obj is Profile {
  return obj.type === 'profiles';
}

export function isSocialLink(obj: CosmicObject): obj is SocialLink {
  return obj.type === 'social-links';
}

export function isService(obj: CosmicObject): obj is Service {
  return obj.type === 'services';
}