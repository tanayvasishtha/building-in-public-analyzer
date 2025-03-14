'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AnalysisForm() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Sending request to:', '/api/analyze');
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      
      // Get raw text first instead of directly parsing JSON
      const responseText = await response.text();
      console.log('Raw API response:', responseText);
      
      // Now try to parse it
      try {
        const data = JSON.parse(responseText);
        // If we get here, JSON parsing worked
        console.log('Parsed data:', data);
        router.push(`/analyze/${username}`);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        setError(`API returned invalid JSON: ${responseText.substring(0, 100)}...`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          X (Twitter) Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username without @"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <button 
        type="submit" 
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : 'Analyze Building in Public Score'}
      </button>
      
      <p className="mt-4 text-sm text-gray-500 text-center">
        We'll analyze this X (Twitter) profile's building in public habits.
      </p>
    </form>
  );
}
