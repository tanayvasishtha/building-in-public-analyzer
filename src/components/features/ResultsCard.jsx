'use client';
import { motion } from 'framer-motion';

export default function ResultsCard({ analysis = {}, profile = {} }) {
  // Ensure all required objects and properties exist
  const scores = analysis?.scores || {};
  const buildingRatio = analysis?.buildingRatio || '0.00';
  const builderType = analysis?.builderType || 'Builder';
  const overallScore = analysis?.overallScore || 0;
  const twitterPosts = analysis?.twitterPosts || 0;
  const githubContributions = analysis?.githubContributions || 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-4 w-full h-full"
    >
      <div className="flex items-center mb-3">
        <img 
          src={profile.profile_image_url || "https://via.placeholder.com/150"}
          alt={profile.name || profile.username || 'User'} 
          className="w-12 h-12 rounded-full mr-3 border-2 border-gray-200"
        />
        <div>
          <h2 className="text-xl font-bold">{profile.name || profile.username || 'User'}</h2>
          <p className="text-gray-600 text-sm">@{profile.username || 'username'}</p>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">Building in Public Analysis</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <div className="text-xs text-gray-600 mb-1">Twitter Posts</div>
          <div className="text-xl font-bold text-blue-700">{twitterPosts.toLocaleString()}</div>
        </div>
        
        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
          <div className="text-xs text-gray-600 mb-1">GitHub Contributions</div>
          <div className="text-xl font-bold text-indigo-700">{githubContributions.toLocaleString()}</div>
        </div>
      </div>
      
      <div className="mb-3 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-100">
        <div className="text-xs text-gray-600 mb-1">Building Ratio (Twitter:GitHub)</div>
        <div className="text-xl font-bold text-purple-700">{buildingRatio}</div>
        <div className="text-xs text-gray-600 mt-1">{builderType}</div>
      </div>
      
      <div className="text-center mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <span className="text-3xl font-bold text-blue-600">{Math.min(100, Math.round(overallScore))}</span>
        <span className="text-lg ml-1 text-blue-600">/ 100</span>
        <p className="text-xs text-gray-600 mt-1">Overall Building Score</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(scores).map(([key, value], index) => (
          <div 
            key={key} 
            className="bg-gray-50 p-2 rounded-md border border-gray-100"
          >
            <div className="text-gray-700 capitalize text-xs font-medium mb-1">{key}</div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, Math.round(value || 0))}%` }}
                />
              </div>
              <span className="text-xs font-semibold">{Math.min(100, Math.round(value || 0))}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}




// 'use client';
// import { motion } from 'framer-motion';

// export default function ResultsCard({ analysis = {}, profile = {} }) {
//   // Ensure all required objects and properties exist
//   const scores = analysis?.scores || {};
//   const buildingTweetCount = analysis?.buildingTweetCount || 0;
//   const totalTweetCount = analysis?.totalTweetCount || 0;
//   const buildingPercentage = analysis?.buildingPercentage || '0.0';
//   const overallScore = analysis?.overallScore || 0;
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full"
//     >
//       <div className="flex items-center mb-6">
//         <img 
//           src={profile.profile_image_url || "https://via.placeholder.com/150"}
//           alt={profile.name || profile.username || 'User'} 
//           className="w-16 h-16 rounded-full mr-4 border-2 border-gray-200"
//         />
//         <div>
//           <h2 className="text-2xl font-bold">{profile.name || profile.username || 'User'}</h2>
//           <p className="text-gray-600">@{profile.username || 'username'}</p>
//         </div>
//       </div>
      
//       <div className="mb-6">
//         <h3 className="text-xl font-semibold mb-3">Building in Public Analysis</h3>
//         <p className="mb-4">
//           Based on your last {totalTweetCount} tweets, 
//           <span className="font-semibold"> {buildingTweetCount} ({buildingPercentage}%)</span> were about building in public.
//         </p>
        
//         <div className="text-center mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
//           <span className="text-5xl font-bold text-blue-600">{Math.round(overallScore)}</span>
//           <span className="text-xl ml-1 text-blue-600">/ 100</span>
//           <p className="text-gray-600 mt-1">Overall Building Score</p>
//         </div>
        
//         <div className="mt-6 grid grid-cols-2 gap-4">
//           {Object.entries(scores).map(([key, value], index) => (
//             <div 
//               key={key} 
//               className="bg-gray-50 p-4 rounded-md border border-gray-100"
//             >
//               <div className="text-gray-700 capitalize text-sm font-medium mb-2">{key}</div>
//               <div className="flex items-center">
//                 <div className="w-full bg-gray-200 rounded-full h-3 mr-2 overflow-hidden">
//                   <div
//                     className="bg-blue-600 h-3 rounded-full"
//                     style={{ width: `${value || 0}%` }}
//                   />
//                 </div>
//                 <span className="text-sm font-semibold">{Math.round(value || 0)}</span>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Comparison Percentile Feature */}
//         <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
//           <h4 className="font-medium text-indigo-800 mb-2">How You Compare</h4>
//           <div className="flex items-center justify-between">
//             <span className="text-gray-700">Builder Percentile:</span>
//             <span className="font-bold text-indigo-700">Top {100 - Math.round((overallScore || 0)/1.2)}%</span>
//           </div>
//           <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
//             <div 
//               className="h-full bg-indigo-600 rounded-full" 
//               style={{ width: `${100 - Math.round((overallScore || 0)/1.2)}%` }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
