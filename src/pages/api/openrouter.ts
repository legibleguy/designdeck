import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenRouter API key is not configured' });
  }

  try {
    console.log('Request body sent to OpenRouter:', JSON.stringify(req.body, null, 2)); // Log full request body

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error from OpenRouter API:', error);
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    console.log('Response from OpenRouter API:', JSON.stringify(data, null, 2)); // Log full response body

    res.status(200).json(data);
  } catch (error) {
    console.error('Error communicating with OpenRouter API:', error);
    res.status(500).json({ error: 'Failed to fetch response from OpenRouter AI' });
  }
}
