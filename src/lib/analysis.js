import { BUILDER_CATEGORIES } from './categories';

// Keywords related to building in public
const BIP_KEYWORDS = [
  'building in public', 'buildinpublic', '#buildinpublic', 'wip', 'work in progress',
  'launched', 'launching', 'shipped', 'shipping', 'released', 'built', 'created',
  'making', 'coded', 'developed', 'implemented', 'milestone', 'progress', 'update'
];

export async function analyzeBuildingInPublic(tweets, profile) {
  // Initialize scores
  const scores = {
    consistency: 0,    // How regularly they share updates
    transparency: 0,   // How openly they share details/metrics
    engagement: 0,     // How much they engage with feedback
    impact: 0,         // The reach of their building content
    frequency: 0,      // How often they post about building
  };
  
  // Count building-related tweets
  const buildingTweets = tweets.filter(tweet => 
    BIP_KEYWORDS.some(keyword => 
      tweet.text.toLowerCase().includes(keyword)
    )
  );
  
  // Calculate scores based on analysis
  scores.frequency = calculateFrequencyScore(buildingTweets.length, tweets.length);
  scores.consistency = calculateConsistencyScore(buildingTweets);
  scores.transparency = calculateTransparencyScore(buildingTweets);
  scores.engagement = calculateEngagementScore(buildingTweets);
  scores.impact = calculateImpactScore(buildingTweets, profile);
  
  // Calculate overall score
  const overallScore = calculateOverallScore(scores);
  
  // Determine category
  const category = determineCategory(overallScore);
  
  return {
    scores,
    overallScore,
    category,
    categoryInfo: BUILDER_CATEGORIES[category],
    buildingTweetCount: buildingTweets.length,
    totalTweetCount: tweets.length,
    buildingPercentage: (buildingTweets.length / tweets.length * 100).toFixed(1)
  };
}

// Helper functions for score calculation
function calculateFrequencyScore(buildingTweetCount, totalTweetCount) {
  if (totalTweetCount === 0) return 0;
  const percentage = (buildingTweetCount / totalTweetCount) * 100;
  
  if (percentage >= 40) return 100;
  if (percentage >= 30) return 80;
  if (percentage >= 20) return 60;
  if (percentage >= 10) return 40;
  if (percentage >= 5) return 20;
  return 10;
}

function calculateConsistencyScore(buildingTweets) {
  if (buildingTweets.length < 3) return 10;
  
  // Sort tweets by date
  const sortedTweets = [...buildingTweets].sort((a, b) => 
    new Date(a.created_at) - new Date(b.created_at)
  );
  
  let totalGapDays = 0;
  
  for (let i = 1; i < sortedTweets.length; i++) {
    const prevDate = new Date(sortedTweets[i-1].created_at);
    const currDate = new Date(sortedTweets[i].created_at);
    const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));
    totalGapDays += diffDays;
  }
  
  const avgGapDays = totalGapDays / (sortedTweets.length - 1);
  
  if (avgGapDays <= 3) return 100;
  if (avgGapDays <= 7) return 80;
  if (avgGapDays <= 14) return 60;
  if (avgGapDays <= 30) return 40;
  return 20;
}

function calculateTransparencyScore(buildingTweets) {
  if (buildingTweets.length === 0) return 0;
  
  // Keywords indicating transparency
  const transparencyKeywords = [
    'numbers', 'stats', 'metrics', 'revenue', 'earnings', 'profit', 'loss',
    'users', 'customers', 'subscribers', 'lessons learned', 'mistake', 'failed',
    'challenges', 'obstacle', 'difficulty', 'learned that', 'realized'
  ];
  
  let transparencyCount = 0;
  
  buildingTweets.forEach(tweet => {
    if (transparencyKeywords.some(keyword => 
      tweet.text.toLowerCase().includes(keyword)
    )) {
      transparencyCount++;
    }
  });
  
  const percentage = (transparencyCount / buildingTweets.length) * 100;
  
  if (percentage >= 40) return 100;
  if (percentage >= 30) return 80;
  if (percentage >= 20) return 60;
  if (percentage >= 10) return 40;
  return 20;
}

function calculateEngagementScore(buildingTweets) {
  if (buildingTweets.length === 0) return 0;
  
  let totalEngagement = 0;
  
  buildingTweets.forEach(tweet => {
    if (tweet.public_metrics) {
      const { reply_count = 0, like_count = 0, retweet_count = 0 } = tweet.public_metrics;
      totalEngagement += reply_count + like_count + retweet_count;
    }
  });
  
  const avgEngagement = totalEngagement / buildingTweets.length;
  
  if (avgEngagement >= 50) return 100;
  if (avgEngagement >= 20) return 80;
  if (avgEngagement >= 10) return 60;
  if (avgEngagement >= 5) return 40;
  return 20;
}

function calculateImpactScore(buildingTweets, profile) {
  // A simple formula based on follower count and engagement
  const followerCount = profile.public_metrics?.followers_count || 0;
  
  if (followerCount >= 10000) return 100;
  if (followerCount >= 5000) return 80;
  if (followerCount >= 1000) return 60;
  if (followerCount >= 500) return 40;
  if (followerCount >= 100) return 20;
  return 10;
}

function calculateOverallScore(scores) {
  const weights = {
    consistency: 0.25,
    transparency: 0.2,
    engagement: 0.2,
    impact: 0.15,
    frequency: 0.2
  };
  
  return Object.keys(scores).reduce((total, key) => {
    return total + (scores[key] * weights[key]);
  }, 0);
}

function determineCategory(score) {
  if (score >= 85) return 'BIP_CONQUEROR';
  if (score >= 70) return 'INFLUENTIAL_BUILDER';
  if (score >= 55) return 'ENGAGED_BUILDER';
  if (score >= 40) return 'CONSISTENT_BUILDER';
  if (score >= 25) return 'EMERGING_BUILDER';
  return 'STEALTH_BUILDER';
}
