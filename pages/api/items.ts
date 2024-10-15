import type { NextApiRequest, NextApiResponse } from 'next';

let items = [
  { id: '1', name: 'Sofa', roomId: '1' },
  { id: '2', name: 'TV', roomId: '1' },
  { id: '3', name: 'Bed', roomId: '2' },
  { id: '4', name: 'Wardrobe', roomId: '2' },
  { id: '5', name: 'Refrigerator', roomId: '3' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(items);
  } else if (req.method === 'POST') {
    const { name, roomId } = req.body;
    const newItem = { id: Date.now().toString(), name, roomId };
    items.push(newItem);
    res.status(201).json(newItem);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}