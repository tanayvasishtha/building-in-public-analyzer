import AnalysisForm from '@/components/features/AnalysisForm';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-3">Building in Public Analyzer</h1>
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
