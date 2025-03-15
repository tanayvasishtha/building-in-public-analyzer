'use client';
import { useState } from 'react';

export default function ShareButton({ username }) {
  const [shared, setShared] = useState(false);
  
  const handleShare = () => {
    try {
      const shareText = `I just analyzed my Building in Public score! Check out my results:`;
      const shareUrl = `${window.location.origin}/analyze/${username}`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, '_blank');
      setShared(true);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm
                ${shared ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} 
                text-white hover:shadow hover:scale-105 transform active:scale-95`}
    >
      <svg 
        className="w-4 h-4 mr-1.5" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
      </svg>
      {shared ? 'Shared!' : 'Share on X'}
    </button>
  );
}
