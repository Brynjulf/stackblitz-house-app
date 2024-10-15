import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Here you would typically hash the password and store the user in your database
    // For this example, we'll just return a success message
    console.log(`Registering user with email: ${email}`);

    // Simulate a delay to mimic database operation
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({ message: 'User registered successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}