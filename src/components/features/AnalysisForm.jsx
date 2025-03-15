'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AnalysisForm() {
  const [username, setUsername] = useState('');
  const [twitterPosts, setTwitterPosts] = useState('');
  const [githubContributions, setGithubContributions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Store the input values in localStorage before navigation
      localStorage.setItem('bipAnalyzerData', JSON.stringify({
        username,
        twitterPosts: parseInt(twitterPosts) || 0,
        githubContributions: parseInt(githubContributions) || 0
      }));
      
      // Navigate to analysis page
      router.push(`/analyze/${username}`);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Building in Public Score Calculator</h2>
      
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
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Total X (Twitter) Posts
        </label>
        <input
          type="number"
          value={twitterPosts}
          onChange={(e) => setTwitterPosts(e.target.value)}
          placeholder="Number of tweets from your profile"
          required
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Find this on your X profile page
        </p>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Total GitHub Contributions
        </label>
        <input
          type="number"
          value={githubContributions}
          onChange={(e) => setGithubContributions(e.target.value)}
          placeholder="Contributions from your GitHub profile"
          required
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Find this on your GitHub profile contributions graph
        </p>
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
        We&apos;ll analyze your building in public habits across platforms.
      </p>
    </form>
  );
}




















// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AnalysisForm() {
//   const [username, setUsername] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!username) return;
    
//     setIsLoading(true);
//     setError('');
    
//     try {
//       console.log('Sending request to:', '/api/analyze');
      
//       const response = await fetch('/api/analyze', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username })
//       });
      
//       // Get raw text first instead of directly parsing JSON
//       const responseText = await response.text();
//       console.log('Raw API response:', responseText);
      
//       // Now try to parse it
//       try {
//         const data = JSON.parse(responseText);
//         // If we get here, JSON parsing worked
//         console.log('Parsed data:', data);
//         router.push(`/analyze/${username}`);
//       } catch (parseError) {
//         console.error('JSON parse error:', parseError);
//         setError(`API returned invalid JSON: ${responseText.substring(0, 100)}...`);
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <form onSubmit={handleSubmit} className="w-full">
//       <div className="mb-6">
//         <label className="block text-sm font-medium mb-2 text-gray-700">
//           X (Twitter) Username
//         </label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter username without @"
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
      
//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//           {error}
//         </div>
//       )}
      
//       <button 
//         type="submit" 
//         className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <div className="flex justify-center items-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//           </div>
//         ) : 'Analyze Building in Public Score'}
//       </button>
      
//       <p className="mt-4 text-sm text-gray-500 text-center">
//         We'll analyze this X (Twitter) profile's building in public habits.
//       </p>
//     </form>
//   );
// }
