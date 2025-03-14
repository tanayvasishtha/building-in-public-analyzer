import AnalysisForm from '@/components/features/AnalysisForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-4 bg-white text-gray-800">
      <div className="text-center mb-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Building in Public Analyzer</h1>
        <p className="text-xl text-gray-600">
          Discover your Building in Public style and get personalized recommendations 
          to boost your online presence.
        </p>
      </div>
      
      <div className="w-full max-w-md mb-16 bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <AnalysisForm />
      </div>
      
      <div className="max-w-4xl w-full mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">1</div>
            <h3 className="font-semibold text-lg mb-2">Enter Your Username</h3>
            <p className="text-gray-600">Provide your X (Twitter) username for analysis</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">2</div>
            <h3 className="font-semibold text-lg mb-2">Analysis</h3>
            <p className="text-gray-600">We analyze your public tweets to identify your building style</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">3</div>
            <h3 className="font-semibold text-lg mb-2">Get Your Badge</h3>
            <p className="text-gray-600">Receive your personalized badge and recommendations</p>
          </div>
        </div>
      </div>
    </main>
  );
}
