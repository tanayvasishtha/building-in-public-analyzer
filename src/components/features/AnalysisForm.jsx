'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AnalysisForm({ includeHeader = true }) {
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
      localStorage.setItem('bipAnalyzerData', JSON.stringify({
        username,
        twitterPosts: parseInt(twitterPosts) || 0,
        githubContributions: parseInt(githubContributions) || 0
      }));
      
      router.push(`/analyze/${username}`);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center py-10 px-4">
      {includeHeader && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl mx-auto text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Building in Public Analyzer
          </h1>
          <p className="text-gray-800 text-lg max-w-xl mx-auto">
            Discover your Building in Public style and get personalized recommendations to boost your online presence.
          </p>
        </motion.div>
      )}
      
      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl p-6 mb-12 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
          Calculate Your Builder Score
        </h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-800">
            X (Twitter) Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username without @"
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:bg-white"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-800">
            Total X (Twitter) Posts
          </label>
          <input
            type="number"
            value={twitterPosts}
            onChange={(e) => setTwitterPosts(e.target.value)}
            placeholder="Number of tweets from your profile"
            required
            min="0"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:bg-white"
          />
          <p className="text-xs text-gray-700 mt-2">
            Find this on your X profile page
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-800">
            Total GitHub Contributions
          </label>
          <input
            type="number"
            value={githubContributions}
            onChange={(e) => setGithubContributions(e.target.value)}
            placeholder="Contributions from your GitHub profile"
            required
            min="0"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:bg-white"
          />
          <p className="text-xs text-gray-700 mt-2">
            Find this on your GitHub profile contributions graph
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : 'Analyze Building in Public Score'}
        </button>
      </motion.form>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-3xl"
      >
        <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-md">1</div>
            <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">Enter Your Username</h3>
            <p className="text-gray-800 text-center">Provide your X username and activity metrics</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-md">2</div>
            <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">Analysis</h3>
            <p className="text-gray-800 text-center">We analyze your GitHub and Twitter building patterns</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-md">3</div>
            <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">Get Your Badge</h3>
            <p className="text-gray-800 text-center">Receive personalized recommendations and your builder score</p>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-800">
          Created by <a href="https://x.com/TanayVasishtha" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@TanayVasishtha</a>
        </p>
        <p className="text-sm text-gray-800 mt-1">
          If you find this useful, please <a href="https://github.com/tanayvasishtha/building-in-public-analyzer" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">star the GitHub repo</a>
        </p>
      </div>
    </div>
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
