// Script to seed mock data into MongoDB for development
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'perfume_shop';

const products = [
  {
    id: "rose-elegance",
    name: 'Rose Elegance',
    description: 'A floral fragrance with notes of rose and jasmine.',
    price: 59.99,
    sizes: ['30ml', '50ml', '100ml'],
    images: ['/rose1.jpg', '/rose2.jpg'],
  },
  {
    id: "citrus-fresh",
    name: 'Citrus Fresh',
    description: 'A refreshing citrus blend for daily wear.',
    price: 49.99,
    sizes: ['30ml', '50ml'],
    images: ['/citrus1.jpg', '/citrus2.jpg'],
  },
  {
    id: "mystic-oud",
    name: 'Mystic Oud',
    description: 'A deep, woody scent with oud and amber.',
    price: 89.99,
    sizes: ['50ml', '100ml'],
    images: ['/oud1.jpg', '/oud2.jpg'],
  },
  {
    id: "vanilla-dream",
    name: 'Vanilla Dream',
    description: 'Sweet vanilla with a touch of musk.',
    price: 39.99,
    sizes: ['30ml', '100ml'],
    images: ['/vanilla1.jpg', '/vanilla2.jpg'],
  },
  {
    id: "amber-nights",
    name: 'Amber Nights',
    description: 'Warm amber and spice for evening wear.',
    price: 69.99,
    sizes: ['50ml', '100ml'],
    images: ['/amber1.jpg', '/amber2.jpg'],
  },
  {
    id: "ocean-breeze",
    name: 'Ocean Breeze',
    description: 'Fresh aquatic notes with a hint of mint.',
    price: 54.99,
    sizes: ['30ml', '50ml', '100ml'],
    images: ['/ocean1.jpg', '/ocean2.jpg'],
  },
  {
    id: "jasmine-bliss",
    name: 'Jasmine Bliss',
    description: 'Pure jasmine with subtle green undertones.',
    price: 44.99,
    sizes: ['30ml', '50ml'],
    images: ['/jasmine1.jpg', '/jasmine2.jpg'],
  },
  {
    id: "sandalwood-spirit",
    name: 'Sandalwood Spirit',
    description: 'Classic sandalwood with creamy musk.',
    price: 79.99,
    sizes: ['50ml', '100ml'],
    images: ['/sandalwood1.jpg', '/sandalwood2.jpg'],
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  await db.collection('products').deleteMany({});
  await db.collection('products').insertMany(products);
  await client.close();
  res.status(201).json({ message: 'Seeded products!' });
}
