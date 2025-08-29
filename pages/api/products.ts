// Next.js API route for products
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Connect to MongoDB and fetch products
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      res.status(500).json({ error: 'MONGODB_URI not set' });
      return;
    }
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db('perfume_shop');
      const products = await db.collection('products').find({}).toArray();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: 'Database error', details: String(err) });
    } finally {
      await client.close();
    }
    return;
  }
  res.status(405).json({ error: 'Method not allowed' });
}
