'use client';
import { motion } from 'framer-motion';

export default function ResultsCard({ analysis = {}, profile = {} }) {
  const scores = analysis?.scores || {};
  const buildingRatio = analysis?.buildingRatio || '0.00';
  const builderType = analysis?.builderType || 'Builder';
  const twitterPosts = analysis?.twitterPosts || 0;
  const githubContributions = analysis?.githubContributions || 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-4 w-full h-full border border-gray-100"
    >
      <div className="flex items-center mb-3">
        <div className="relative">
          <img 
            src={profile.profile_image_url || "https://via.placeholder.com/150"}
            alt={profile.name || profile.username || 'User'} 
            className="w-12 h-12 rounded-full mr-3 border-2 border-white shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-black">{profile.name || profile.username || 'User'}</h2>
          <p className="text-black text-xs">@{profile.username || 'username'}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-3 rounded-xl border border-blue-100">
          <div className="text-xs font-medium text-blue-800 mb-1">Twitter Posts</div>
          <div className="text-lg font-bold text-blue-700">{twitterPosts.toLocaleString()}</div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 p-3 rounded-xl border border-indigo-100">
          <div className="text-xs font-medium text-indigo-800 mb-1">GitHub Contributions</div>
          <div className="text-lg font-bold text-indigo-700">{githubContributions.toLocaleString()}</div>
        </div>
      </div>
      
      <div className="mb-3 bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-xl border border-purple-200">
        <div className="text-xs font-medium text-purple-800 mb-1">Building Ratio (Twitter:GitHub)</div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-purple-700">{buildingRatio}</div>
          <div className="text-xs bg-white px-2.5 py-1 rounded-full font-medium text-purple-700 border border-purple-200 shadow-sm">
            {builderType}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
        {Object.entries(scores).map(([key, value], index) => (
          <motion.div 
            key={key} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
            className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
          >
            <div className="text-black capitalize text-xs font-medium mb-1.5 flex items-center">
              <svg className="w-3 h-3 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              {key}
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, Math.round(value || 0))}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-black">{Math.min(100, Math.round(value || 0))}</span>
            </div>
          </motion.div>
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
