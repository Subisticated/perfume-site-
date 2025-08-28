// Next.js API route for products
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Mock data for perfumes
    const products = [
      {
        id: '1',
        name: 'Rose Elegance',
        description: 'A floral fragrance with notes of rose and jasmine.',
        price: 59.99,
        sizes: ['30ml', '50ml', '100ml'],
        images: ['/rose1.jpg', '/rose2.jpg', '/rose3.jpg', '/rose4.jpg'],
      },
      {
        id: '2',
        name: 'Citrus Fresh',
        description: 'A refreshing citrus blend for daily wear.',
        price: 49.99,
        sizes: ['30ml', '50ml'],
        images: ['/citrus1.jpg', '/citrus2.jpg', '/citrus3.jpg', '/citrus4.jpg'],
      },
      {
        id: '3',
        name: 'Mystic Oud',
        description: 'A deep, woody scent with oud and amber.',
        price: 89.99,
        sizes: ['50ml', '100ml'],
        images: ['/oud1.jpg', '/oud2.jpg', '/oud3.jpg', '/oud4.jpg'],
      },
      {
        id: '4',
        name: 'Vanilla Dream',
        description: 'Sweet vanilla with a touch of musk.',
        price: 39.99,
        sizes: ['30ml', '100ml'],
        images: ['/vanilla1.jpg', '/vanilla2.jpg', '/vanilla3.jpg', '/vanilla4.jpg'],
      },
    ];
    res.status(200).json(products);
    return;
  }
  res.status(405).json({ error: 'Method not allowed' });
}
