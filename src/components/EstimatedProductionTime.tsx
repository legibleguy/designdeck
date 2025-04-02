import React, { useState, useEffect } from 'react';

interface EstimatedProductionTimeProps {
  tags: string[];
  gameDesignText: string;
  mechanicsData: {
    title: string;
    minTimeToImplement: number;
    maxTimeToImplement: number;
    timeToImplementExplained: string;
  }[];
}

interface Mechanic {
  title: string;
  minTimeToImplement: number;
  maxTimeToImplement: number;
  timeToImplementExplained: string;
}

interface LLMResponse {
  title: string;
  minTime: number;
  maxTime: number;
  explanation: string;
}

export function EstimatedProductionTime({
  tags,
  gameDesignText,
}: EstimatedProductionTimeProps) {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [mechanicsData, setMechanicsData] = useState<Mechanic[]>([]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [detailedResponse, setDetailedResponse] = useState<LLMResponse[]>([]);

  useEffect(() => {
    async function fetchMechanics() {
      try {
        const res = await fetch('/api/mechanics');
        if (!res.ok) {
          throw new Error('Failed to fetch mechanics data.');
        }
        const data = await res.json();
        setMechanicsData(data);
      } catch (error) {
        console.error('Error fetching mechanics data:', error);
      }
    }

    fetchMechanics();
  }, []);

  const handleAskLLM = async () => {
    if (tags.length === 0) {
      setResponse('No tags available to generate a time estimate.');
      return;
    }

    setLoading(true);
    setResponse(''); // Clear previous response

    // Collect relevant mechanics data based on tags
    const relevantMechanics = mechanicsData.filter((mechanic) =>
      tags.includes(mechanic.title)
    );

    const mechanicsInfo = relevantMechanics.map((mechanic) => ({
      title: mechanic.title,
      minTime: mechanic.minTimeToImplement,
      maxTime: mechanic.maxTimeToImplement,
      explanation: mechanic.timeToImplementExplained,
    }));

    if (mechanicsInfo.length === 0) {
      setResponse('No relevant mechanics found for the selected tags.');
      setLoading(false);
      return;
    }

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
                  text: `Based on the following game design document and mechanics, provide a JSON response with detailed time estimates for each mechanic. Each entry in the JSON array should include the following fields:
- "title" (string): The name of the mechanic.
- "minTime" (number): The minimum time to implement the mechanic in hours.
- "maxTime" (number): The maximum time to implement the mechanic in hours.
- "explanation" (string): A detailed explanation of why it would take that long.

The response should only include the JSON array, without any additional text or formatting. Here is the input:

Game Design Document:
${gameDesignText}

Mechanics:
${JSON.stringify(mechanicsInfo, null, 2)}`,
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
      let rawContent = data.choices[0]?.message?.content || '[]';

      // Strip backticks and code block markers
      rawContent = rawContent.replace(/```json|```/g, '').trim();

      const llmResponse: LLMResponse[] = JSON.parse(rawContent);

      setDetailedResponse(llmResponse);

      // Calculate total min and max time
      const totalMinTime = llmResponse.reduce((sum, item) => sum + item.minTime, 0);
      const totalMaxTime = llmResponse.reduce((sum, item) => sum + item.maxTime, 0);

      setResponse(`Estimated Time: ${totalMinTime} to ${totalMaxTime}`);
    } catch (error) {
      console.error('Error parsing LLM response:', error);
      setResponse(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 p-4" style={{
      paddingTop: '80px',
    }}>
      <button
        onClick={handleAskLLM}
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:bg-gray-300"
        disabled={loading}
      >
        {loading ? 'Calculating...' : 'Give me a time estimate'}
      </button>
      {response && (
        <p
          className="mt-4 text-gray-800 font-medium cursor-pointer underline"
          onClick={() => setPopupVisible(true)} // Show popup on click
        >
          {response}
        </p>
      )}
      {popupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto relative">
            <h3 className="text-lg font-semibold mb-4">Detailed Time Estimates</h3>
            <ul className="space-y-2">
              {detailedResponse.map((item, index) => (
                <li key={index} className="border-b pb-2">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-700">
                    Min Time: {item.minTime} hours, Max Time: {item.maxTime} hours
                  </p>
                  <p className="text-sm text-gray-600">{item.explanation}</p>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setPopupVisible(false)} // Close popup
              className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
