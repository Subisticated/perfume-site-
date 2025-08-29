import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'perfume_shop';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const branding = await db.collection('branding').findOne({});
  await client.close();
  if (!branding || !branding.logoBase64) {
    res.status(404).json({ error: 'Logo not found' });
    return;
  }
  res.status(200).json({ logoBase64: branding.logoBase64 });
}
