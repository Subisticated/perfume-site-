import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Connect to MongoDB and fetch product by id
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      res.status(500).json({ error: 'MONGODB_URI not set' });
      return;
    }
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db('perfume_shop');
      const { id } = req.query;
      // Try to find by 'id' field first (string)
      let product = await db.collection('products').findOne({ id: id });
      // If not found, try by MongoDB ObjectId (for legacy data)
      if (!product) {
        try {
          product = await db.collection('products').findOne({ _id: new ObjectId(id as string) });
        } catch {}
      }
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: 'Database error', details: String(err) });
    } finally {
      await client.close();
    }
    return;
  }
  res.status(405).json({ error: 'Method not allowed' });
}
