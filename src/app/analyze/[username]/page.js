'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ResultsCard from '@/components/features/ResultsCard';
import Recommendations from '@/components/features/Recommendations';
import ShareButton from '@/components/features/ShareButton';

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
    <div className="min-h-screen flex flex-col items-center py-3 px-3 bg-gradient-to-b from-white to-blue-50">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            @{username}&apos;s Analysis
          </h1>
          <ShareButton username={username} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1">
            <div className="w-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-500 rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-lg">
              <div className="text-white font-bold text-base mb-0.5">Building in Public</div>
              <div className="text-xl font-bold mb-1 text-white">{categoryInfo.name}</div>
              <div className="text-5xl font-bold mb-0.5 text-white">{Math.min(100, Math.round(analysis.overallScore || 0))}</div>
              <div className="text-xs mb-1 text-white opacity-90">Builder Score</div>
              <p className="text-xs text-white opacity-90">{categoryInfo.description}</p>
            </div>
            
            <div className="mt-3 p-3 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-2">Build Recommendations</h3>
              <ul className="space-y-1.5">
                {recommendations.slice(0, 3).map((rec, index) => (
                  <li key={index} className="text-xs text-gray-700 flex">
                    <svg className="w-4 h-4 mr-1 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <ResultsCard analysis={analysis} profile={profile} />
          </div>
        </div>
        
        <div className="text-center mt-3">
          <p className="text-xs text-gray-600">
            If you found this useful, please 
            <a href="https://github.com/tanayvasishtha/building-in-public-analyzer" 
               target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 hover:underline ml-1">star our GitHub repository</a>
          </p>
        </div>
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
