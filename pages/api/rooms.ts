import type { NextApiRequest, NextApiResponse } from 'next';

let rooms = [
  { id: '1', name: 'Living Room' },
  { id: '2', name: 'Bedroom' },
  { id: '3', name: 'Kitchen' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(rooms);
  } else if (req.method === 'POST') {
    const { name } = req.body;
    const newRoom = { id: Date.now().toString(), name };
    rooms.push(newRoom);
    res.status(201).json(newRoom);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}