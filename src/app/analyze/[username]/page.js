'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ResultsCard from '@/components/features/ResultsCard';
import ShareButton from '@/components/features/ShareButton';
import { motion } from 'framer-motion';

export default function AnalysisPage() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const storedData = JSON.parse(localStorage.getItem('bipAnalyzerData')) || {};
        
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            twitterPosts: storedData.twitterPosts || 0,
            githubContributions: storedData.githubContributions || 0
          })
        });
        
        if (!response.ok) throw new Error('Analysis failed');
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAnalysis();
  }, [username]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-100 text-red-700 p-3 rounded-lg max-w-md text-center">
          <h2 className="text-lg font-bold mb-1">Error</h2>
          <p>Failed to analyze profile for @{username}. Please try again.</p>
        </div>
      </div>
    );
  }
  
  const profile = data?.profile || {};
  const analysis = data?.analysis || {};
  const categoryInfo = analysis?.categoryInfo || { 
    name: 'Builder', 
    description: 'Building in public' 
  };
  const recommendations = data?.recommendations || [];
  
  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-black">
            @{username}&apos;s Analysis
          </h1>
          <ShareButton username={username} />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="w-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg">
              <div className="text-white font-bold text-lg mb-1">Building in Public</div>
              <div className="text-2xl font-bold mb-2 text-white">{categoryInfo.name}</div>
              <div className="relative mb-2">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <div className="text-6xl font-bold text-white">{Math.min(100, Math.round(analysis.overallScore || 0))}</div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="text-sm mb-2 text-white/90">Builder Score</div>
              <p className="text-sm text-white/90 bg-white/10 p-2 rounded-lg">{categoryInfo.description}</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <ResultsCard analysis={analysis} profile={profile} />
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100"
        >
          <h3 className="font-bold text-xl text-black mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
            </svg>
            Build Recommendations
          </h3>
          <ul className="space-y-3">
            {recommendations.map((rec, index) => (
              <motion.li 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                className="text-black flex items-start p-3 bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border border-gray-100 rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
                  <span className="text-xs font-semibold">{index + 1}</span>
                </div>
                {rec}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-gray-800">
            If you found this useful, please 
            <a href="https://github.com/tanayvasishtha/building-in-public-analyzer" 
               target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 hover:underline ml-1">star our GitHub repository</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}






// import ResultsCard from '@/components/features/ResultsCard';
// import Recommendations from '@/components/features/Recommendations';
// import ShareButton from '@/components/features/ShareButton';

// export async function generateMetadata({ params }) {
//   const { username } = await params;
//   return {
//     title: `${username}'s Building in Public Analysis`,
//     description: `Check out ${username}'s Building in Public analysis and score.`,
//   };
// }

// async function getAnalysisData(username) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username }),
//       cache: 'no-store',
//     });

//     if (!response.ok) throw new Error('Failed to fetch analysis');
    
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching analysis data:', error);
    
//     return null; // Return null if there's an error
//   }
// }

// export default async function AnalysisPage({ params }) {
//   const { username } = await params;
//   const data = await getAnalysisData(username);

//   if (!data) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-8">
//         <div className="bg-red-100 text-red-700 p-6 rounded-lg max-w-md text-center shadow-lg">
//           <h2 className="text-xl font-bold mb-2">Error</h2>
//           <p>We couldn&apos;t analyze the profile for @{username}. Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-b from-white to-blue-50">
//       <div className="max-w-4xl w-full">
//         <h1 className="text-3xl font-bold text-center mb-3 text-gray-800">
//           @{username}&apos;s Building in Public Analysis
//         </h1>
//         <p className="text-center text-gray-600 mb-8">Analyzed on {new Date().toLocaleDateString()}</p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           <ResultsCard analysis={data.analysis} profile={data.profile} />
//         </div>

//         <Recommendations recommendations={data.recommendations} />

//         <div className="flex justify-center mt-8">
//           <ShareButton username={username} />
//         </div>
//       </div>
//     </div>
//   );
// }
