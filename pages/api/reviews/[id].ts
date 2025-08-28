// Next.js API route for product reviews
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'perfume_shop';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const reviewsCollection = db.collection('reviews');
  const { id } = req.query;

  if (req.method === 'GET') {
    const reviews = await reviewsCollection.find({ productId: id }).toArray();
    res.status(200).json(reviews);
  } else if (req.method === 'POST') {
    const { username, rating, comment } = req.body;
    if (!username || !rating || !comment) {
      res.status(400).json({ error: 'Missing fields' });
    } else {
      const review = { productId: id, username, rating, comment, createdAt: new Date() };
      await reviewsCollection.insertOne(review);
      res.status(201).json(review);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  await client.close();
}
