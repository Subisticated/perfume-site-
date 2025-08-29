This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Functionality Overview

- **Product Listing:** Displays a grid of perfumes fetched from MongoDB, including images, names, descriptions, and prices.
- **Product Details:** Clicking a product shows detailed information, multiple images, and user reviews. All product data and images are loaded from the database.
- **Add Reviews:** Users can submit reviews for each product, which are stored in MongoDB and displayed on the product detail page.
- **Dynamic Images:** Product images and the website logo are stored as base64 in MongoDB and fetched dynamically by the frontend. No local image files are required at runtime.
- **Responsive Navbar:** The navigation bar displays the logo (fetched from the database) and a Home link, adapting for mobile and desktop.
- **Seeding Demo Data:** A seed script (`pages/api/seed.ts`) allows you to populate the database with demo products and a logo for development or demo purposes.
- **API Routes:** All data is served via Next.js API routes, enabling full SSR and client-side fetching.
- **Git Hygiene:** Mock data and images are excluded from git to keep the repository clean and production-ready.

## Seeding Demo Data and Images

To populate your MongoDB database with demo products and a logo (including images as base64), use the `pages/api/seed.ts` script. This script:

- Reads product and logo images from `public/images/`.
- Converts images to base64 and stores them in MongoDB as part of the product and branding collections.
- Populates the `products` collection with demo products and the `branding` collection with the logo.

**How to use:**

1. Place your product images and `logo.png` in the `public/images/` directory.
2. Start your Next.js development server:
   ```bash
   npm run dev
   ```
3. Seed the database by making a POST request to the seed API route:
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```
   Or, in PowerShell:
   ```powershell
   Invoke-WebRequest -Uri http://localhost:3000/api/seed -Method POST
   ```

**Note:**
- The seed script and images are excluded from git via `.gitignore` for security and repo cleanliness.
- The app will fetch product images and the logo directly from MongoDB after seeding.