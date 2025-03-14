'use client';
import { useRef } from 'react';
import { toPng } from 'html-to-image';

export default function Badge({ username, category, categoryInfo, score }) {
  const badgeRef = useRef(null);
  
  // Dynamic color mapping based on category
  const colorMap = {
    'STEALTH_BUILDER': 'from-gray-400 to-gray-600 border-gray-500',
    'EMERGING_BUILDER': 'from-green-400 to-green-600 border-green-500',
    'CONSISTENT_BUILDER': 'from-blue-400 to-blue-600 border-blue-500',
    'ENGAGED_BUILDER': 'from-purple-400 to-purple-600 border-purple-500',
    'INFLUENTIAL_BUILDER': 'from-orange-400 to-orange-600 border-orange-500',
    'BIP_CONQUEROR': 'from-red-400 to-red-600 border-red-500'
  };
  
  const colors = colorMap[category] || 'from-blue-400 to-blue-600 border-blue-500';
  
  const downloadBadge = () => {
    if (badgeRef.current) {
      toPng(badgeRef.current)
        .then(dataUrl => {
          const link = document.createElement('a');
          link.download = `${username}-builder-badge.png`;
          link.href = dataUrl;
          link.click();
        });
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div 
        ref={badgeRef}
        className={`relative w-72 h-80 bg-gradient-to-br ${colors} rounded-lg p-6 
                    flex flex-col items-center justify-center text-center shadow-lg 
                    border-2 transform transition-transform hover:scale-105 duration-300`}
      >
        <div className="text-white font-bold text-xl mb-2 opacity-90">
          Building in Public
        </div>
        
        <div className="text-3xl font-bold mb-4 text-white">{categoryInfo.name}</div>
        
        <div className="text-6xl font-bold mb-2 text-white">{Math.round(score)}</div>
        <div className="text-sm mb-4 text-white opacity-90">Builder Score</div>
        
        <p className="text-sm text-white opacity-90">{categoryInfo.description}</p>
        
        <div className="absolute bottom-4 text-xs text-white opacity-75">@{username}</div>
      </div>
      
      <button 
        onClick={downloadBadge}
        className="mt-4 px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 
                  rounded-md shadow transition-colors flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L11 6.414V14a1 1 0 11-2 0V6.414L7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3z" />
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
        <span>Download Badge</span>
      </button>
    </div>
  );
}
