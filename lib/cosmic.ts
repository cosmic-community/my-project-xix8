import { createBucketClient } from '@cosmicjs/sdk'
import { Profile, SocialLink, Service } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render metafield values that might be objects
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Fetch the primary (active) profile
export async function getProfile(): Promise<Profile | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'profiles' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    const profiles = response.objects as Profile[]
    if (!profiles || profiles.length === 0) return null

    // Prefer active profile, otherwise the first one
    const active = profiles.find((p) => p.metadata?.active === true)
    return active || profiles[0] || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch profile')
  }
}

// Fetch all profiles
export async function getAllProfiles(): Promise<Profile[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'profiles' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Profile[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch profiles')
  }
}

// Fetch a single profile by slug
export async function getProfileBySlug(slug: string): Promise<Profile | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'profiles', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.object as Profile
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch profile')
  }
}

// Fetch all social links sorted by display order
export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'social-links' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    const links = response.objects as SocialLink[]
    return links.sort((a, b) => {
      const orderA = a.metadata?.display_order ?? 999
      const orderB = b.metadata?.display_order ?? 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch social links')
  }
}

// Fetch all services
export async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Service[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch services')
  }
}

// Fetch a single service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'services', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.object as Service
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch service')
  }
}