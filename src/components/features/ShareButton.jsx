'use client';
import { useState } from 'react';

export default function ShareButton({ username }) {
  const [shared, setShared] = useState(false);
  
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/analyze/${username}`
    : '';
    
  const shareText = `I just analyzed my Building in Public score! Check out my results:`;
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Building in Public Score',
        text: shareText,
        url: shareUrl,
      }).then(() => {
        setShared(true);
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      try {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        setShared(true);
      } catch (err) {
        console.error('Error opening share window:', err);
      }
    }
  };
  
  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center px-6 py-3 
                ${shared ? 'bg-green-600' : 'bg-blue-600'} 
                text-white rounded-md hover:bg-blue-700 
                transition-colors duration-300 shadow-md`}
    >
      <svg 
        className="w-5 h-5 mr-2" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
      </svg>
      {shared ? 'Shared!' : 'Share on X'}
    </button>
  );
}
