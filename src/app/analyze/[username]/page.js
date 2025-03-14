import ResultsCard from '@/components/features/ResultsCard';
import Recommendations from '@/components/features/Recommendations';
import ShareButton from '@/components/features/ShareButton';

export async function generateMetadata({ params }) {
  const { username } = await params;
  return {
    title: `${username}'s Building in Public Analysis`,
    description: `Check out ${username}'s Building in Public analysis and score.`,
  };
}

async function getAnalysisData(username) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Failed to fetch analysis');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching analysis data:', error);
    
    return null; // Return null if there's an error
  }
}

export default async function AnalysisPage({ params }) {
  const { username } = await params;
  const data = await getAnalysisData(username);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg max-w-md text-center shadow-lg">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>We couldn't analyze the profile for @{username}. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center mb-3 text-gray-800">
          @{username}&apos;s Building in Public Analysis
        </h1>
        <p className="text-center text-gray-600 mb-8">Analyzed on {new Date().toLocaleDateString()}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <ResultsCard analysis={data.analysis} profile={data.profile} />
        </div>

        <Recommendations recommendations={data.recommendations} />

        <div className="flex justify-center mt-8">
          <ShareButton username={username} />
        </div>
      </div>
    </div>
  );
}
