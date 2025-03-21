import AnalysisForm from '@/components/features/AnalysisForm';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-2xl mx-auto text-center mb-4">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Building in Public Analyzer</h1>
          <p className="text-gray-600">
            Discover your Building in Public style and get personalized recommendations to boost
            your online presence.
          </p>
        </div>
        
        {/* Only render the form component without its own heading */}
        <AnalysisForm includeHeader={false} />
      </div>
    </main>
  );
}
