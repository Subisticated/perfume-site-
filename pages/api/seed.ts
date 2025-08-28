// Script to seed mock data into MongoDB for development
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'perfume_shop';

const products = [
  {
    name: 'Rose Elegance',
    description: 'A floral fragrance with notes of rose and jasmine.',
    price: 59.99,
    sizes: ['30ml', '50ml', '100ml'],
    images: ['/rose1.jpg', '/rose2.jpg'],
  },
  {
    name: 'Citrus Fresh',
    description: 'A refreshing citrus blend for daily wear.',
    price: 49.99,
    sizes: ['30ml', '50ml'],
    images: ['/citrus1.jpg', '/citrus2.jpg'],
  },
  {
    name: 'Mystic Oud',
    description: 'A deep, woody scent with oud and amber.',
    price: 89.99,
    sizes: ['50ml', '100ml'],
    images: ['/oud1.jpg', '/oud2.jpg'],
  },
  {
    name: 'Vanilla Dream',
    description: 'Sweet vanilla with a touch of musk.',
    price: 39.99,
    sizes: ['30ml', '100ml'],
    images: ['/vanilla1.jpg', '/vanilla2.jpg'],
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
