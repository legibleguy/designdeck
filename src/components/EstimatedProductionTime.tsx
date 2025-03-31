import React, { useState } from 'react';

interface EstimatedProductionTimeProps {
  tags: string[];
}

export function EstimatedProductionTime({ tags }: EstimatedProductionTimeProps) {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleAskLLM = async () => {
    if (tags.length === 0) {
      setResponse('No tags available to generate a suggestion.');
      return;
    }

    setLoading(true);
    setResponse(''); // Clear previous response

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
                  text: `Suggest a name based on these tags: ${tags.join(', ')}`,
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
      setResponse(data.choices[0]?.message?.content || 'No response received.');
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 p-4 bg-white border rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Estimated Production Time</h3>
      <button
        onClick={handleAskLLM}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        disabled={loading}
      >
        {loading ? 'Asking LLM...' : 'Generate Time Estimate'}
      </button>
      <div className="mt-4">
        <textarea
          readOnly
          value={response}
          placeholder="Estimates will appear here..."
          className="w-full p-2 border rounded text-sm text-gray-700"
          rows={4}
        />
      </div>
    </div>
  );
}
