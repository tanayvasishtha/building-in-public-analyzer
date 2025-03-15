import ResultsCard from '@/components/features/ResultsCard';
import Recommendations from '@/components/features/Recommendations';
import ShareButton from '@/components/features/ShareButton';

export async function generateMetadata({ params }) {
  const { username } = await params;
  return {
    title: `${username}&apos;s Building in Public Analysis`,
    description: `Check out ${username}&apos;s Building in Public analysis and score.`
  };
}

async function getAnalysisData(username) {
  try {
    // Fetch analysis data from session storage in client-side
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username,
        // Note: These values will be replaced by the actual form input when submitted
        twitterPosts: 500,
        githubContributions: 700
      }),
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch analysis');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting analysis:', error);
    // Return null to handle error in component
    return null;
  }
}

export default async function AnalysisPage({ params }) {
  const { username } = await params;
  const data = await getAnalysisData(username);
  
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>Failed to analyze profile for @{username}. Please try again.</p>
        </div>
      </div>
    );
  }
  
  // Ensure all required objects and properties exist
  const profile = data?.profile || {};
  const analysis = data?.analysis || {};
  const categoryInfo = analysis?.categoryInfo || { 
    name: 'Builder', 
    description: 'Building in public' 
  };
  const recommendations = data?.recommendations || [];
  
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center mb-3 text-gray-800">
          @{username}&apos;s Building in Public Analysis
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Analyzed on {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-1 flex justify-center">
            <div className="relative w-72 h-80 bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-500 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg">
              <div className="text-white font-bold text-xl mb-2">Building in Public</div>
              <div className="text-3xl font-bold mb-4 text-white">{categoryInfo.name}</div>
              <div className="text-6xl font-bold mb-2 text-white">{Math.round(analysis.overallScore || 0)}</div>
              <div className="text-sm mb-4 text-white opacity-90">Builder Score</div>
              <p className="text-sm text-white opacity-90">{categoryInfo.description}</p>
              <div className="absolute bottom-4 text-xs text-white opacity-75">@{username}</div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <ResultsCard analysis={analysis} profile={profile} />
          </div>
        </div>
        
        <div className="mb-8">
          <Recommendations recommendations={recommendations} />
        </div>
        
        <div className="flex justify-center">
          <ShareButton username={username} />
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
