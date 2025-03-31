import React, { useState } from 'react';

interface EstimatedProductionTimeProps {
  tags: string[];
}

export function EstimatedProductionTime({ tags }: EstimatedProductionTimeProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [estimate, setEstimate] = useState<string>('Generate Time Estimate');

  const handleAskLLM = async () => {
    if (tags.length === 0) {
      setEstimate('No tags available');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/openrouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'google/gemini-2.5-pro-exp-03-25:free',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Estimate production time based on these tags: ${tags.join(', ')}`,
                },
              ],
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response from OpenRouter API.');
      }

      const data = await res.json();
      setEstimate(data.choices[0]?.message?.content || 'No response received.');
    } catch (error) {
      setEstimate('Error fetching estimate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAskLLM}
      className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow hover:opacity-90 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? 'Calculating...' : estimate}
    </button>
  );
}
