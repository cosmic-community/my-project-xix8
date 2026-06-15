# Digital Business Card

![App Preview](https://imgix.cosmicjs.com/1bc74540-68f0-11f1-b935-81f5e6b7f94e-autopilot-photo-1497366216548-37526070297c-1781551589258.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern digital business card application built with Next.js and powered by [Cosmic](https://www.cosmicjs.com). Showcase your professional profile, services, and social links with a sleek public-facing card and a user-friendly admin dashboard for managing all your content.

## Features

- 🪪 **Digital Business Card** — Elegant, responsive profile card with photo, cover image, bio, and contact details
- 🛠️ **Services Showcase** — Display the services you offer with descriptions and images
- 🔗 **Social Links** — Quick-access social media links with platform icons
- 📊 **Admin Dashboard** — User-friendly management panel to view and update profile, services, and links
- 🎨 **Brand Customization** — Profile brand color applied throughout the card
- 📱 **Fully Responsive** — Looks great on every device
- ⚡ **Server-Side Rendered** — Fast, SEO-friendly pages powered by Next.js App Router

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a3051a083cef1847ffe304d&clone_repository=6a3052a883cef1847ffe3082)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: یک کارت ویزیت درست کن که بخش مدیریت و داشبورد کاربر پسند داشته باشد"

### Code Generation Prompt

> Build a Next.js application for a website called "My Project". Create a beautiful, modern, responsive design with a homepage and pages for each content type. یک کارت ویزیت درست کن که بخش مدیریت و داشبورد کاربر پسند داشته باشد

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) — React framework with App Router
- [React 19](https://react.dev) — UI library
- [TypeScript](https://www.typescriptlang.org) — Type safety
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `profiles`, `social-links`, and `services` object types

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd digital-business-card

# Install dependencies
bun install

# Set up environment variables (see below)

# Run the development server
bun run dev
```

Set the following environment variables:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch the active profile with depth for connected objects
const { object: profile } = await cosmic.objects
  .findOne({ type: 'profiles' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch all services
const { objects: services } = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Update a profile (only include changed fields)
await cosmic.objects.updateOne(profileId, {
  metadata: { bio: 'Updated bio text' }
})
```

## Cosmic CMS Integration

This application uses three object types from your Cosmic bucket:

- **Profiles** — The main business card data: name, job title, company, bio, photos, contact info, brand color, and active status
- **Social Links** — Social media links with labels, URLs, platforms, and display order
- **Services** — Services offered, each connected to a profile

Read more in the [Cosmic documentation](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import into [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add environment variables and deploy
<!-- README_END -->