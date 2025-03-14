import ResultsCard from '@/components/features/ResultsCard';
import Recommendations from '@/components/features/Recommendations';
import ShareButton from '@/components/features/ShareButton';

export async function generateMetadata({ params }) {
  const { username } = await params;
  return {
    title: `${username}'s Building in Public Analysis`,
    description: `Check out ${username}'s Building in Public analysis and score.`
  };
}

async function getAnalysisData(username) {
  try {
    // Fetch data from your API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch analysis');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting analysis:', error);
    // Return mock data as fallback if API call fails
    return {
      profile: { 
        name: username, 
        username: username,
        profile_image_url: "https://via.placeholder.com/150" 
      },
      analysis: {
        scores: { 
          consistency: 70, 
          transparency: 60, 
          engagement: 50, 
          impact: 40, 
          frequency: 80 
        },
        overallScore: 60,
        category: 'ENGAGED_BUILDER',
        categoryInfo: {
          name: 'Engaged Builder',
          description: 'You build and engage actively with the community.'
        },
        buildingTweetCount: 8,
        totalTweetCount: 20,
        buildingPercentage: "40.0"
      },
      recommendations: [
        "Share your building journey at least once a week",
        "Include visuals in your building updates",
        "Talk about challenges you&apos;ve overcome",
        "Ask for feedback on specific aspects",
        "Engage with other builders regularly"
      ]
    };
  }
}

export default async function AnalysisPage({ params }) {
  const { username } = await params;
  const data = await getAnalysisData(username);
  
  // Ensure all required objects and properties exist
  const profile = data?.profile || {};
  const analysis = data?.analysis || {};
  const categoryInfo = analysis?.categoryInfo || { 
    name: 'Builder', 
    description: 'Building in public' 
  };
  // Removed the unused scores variable
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
