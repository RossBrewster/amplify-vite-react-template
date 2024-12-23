import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import Spinner from "./Spinner";

const client = generateClient<Schema>();

export function FourOMini() {
  const [fourOMiniResponse, setFourOMiniResponse] = useState("");
  const [promptValue, setPromptValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!promptValue.trim()) {
      setError("Please enter a prompt before submitting.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await client.queries.fourOMini({ prompt: promptValue });
      setFourOMiniResponse(response.data ?? "");
    } catch (err) {
      console.error("Error calling fourOMini:", err);
      setError("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto mt-8 p-4 space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">4o-mini Playground</h2>
        <p className="mt-2 text-sm text-gray-600">Enter your prompt below to test the 4o-mini model.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter your prompt..."
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Send Prompt'}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
      </form>

      <div className="min-h-[200px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : fourOMiniResponse && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Response:</h3>
            <pre className="whitespace-pre-wrap break-words bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto max-h-96 text-sm">
              {fourOMiniResponse}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}