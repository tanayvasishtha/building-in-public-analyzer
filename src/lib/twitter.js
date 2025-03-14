import { TwitterApi } from 'twitter-api-v2';

// Create Twitter API client with improved error handling
export async function createTwitterClient() {
  try {
    // Debug logging to help troubleshoot
    console.log("Initializing Twitter client with OAuth 2.0");
    console.log("Client ID available:", !!process.env.CLIENT_ID);
    console.log("Client Secret available:", !!process.env.CLIENT_SECRET);
    
    // Validate credentials exist
    if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
      throw new Error("Twitter API credentials are missing");
    }
    
    // Create the client with your credentials
    const client = new TwitterApi({
      appKey: process.env.CLIENT_ID,
      appSecret: process.env.CLIENT_SECRET,
    });
    
    // Get app-only client for read-only operations with explicit error handling
    try {
      const appOnlyClient = await client.appLogin();
      console.log("Successfully authenticated with Twitter API");
      return appOnlyClient;
    } catch (authError) {
      console.error("Authentication error:", authError);
      throw new Error(`Twitter API authentication failed: ${authError.message}`);
    }
  } catch (error) {
    console.error('Error in createTwitterClient:', error.message);
    throw new Error(`Failed to initialize Twitter API client: ${error.message}`);
  }
}

// Fetch user profile data
export async function fetchUserProfile(client, username) {
  try {
    const user = await client.v2.userByUsername(username, {
      'user.fields': 'description,profile_image_url,public_metrics'
    });
    
    if (!user.data) {
      throw new Error('User not found');
    }
    
    return user.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

// Fetch user's recent tweets
export async function fetchUserTweets(client, userId) {
  try {
    const tweets = await client.v2.userTimeline(userId, {
      max_results: 10, // Limited to 10 tweets for API quota reasons
      'tweet.fields': 'created_at,public_metrics,text',
      exclude: 'retweets,replies'
    });
    
    return tweets.data.data || [];
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error;
  }
}

// Keywords related to building in public
export const BIP_KEYWORDS = [
  'building in public', 'buildinpublic', '#buildinpublic', 'wip', 'work in progress',
  'launched', 'launching', 'shipped', 'shipping', 'released', 'built', 'created',
  'making', 'coded', 'developed', 'implemented', 'milestone', 'progress', 'update'
];

// Analyze tweets for building in public content
export function analyzeBuildingInPublic(tweets, profile) {
  // Count building-related tweets
  const buildingTweets = tweets.filter(tweet => 
    BIP_KEYWORDS.some(keyword => 
      tweet.text?.toLowerCase().includes(keyword)
    )
  );
  
  // Calculate scores
  const scores = {
    consistency: calculateConsistencyScore(buildingTweets),
    transparency: calculateTransparencyScore(buildingTweets),
    engagement: calculateEngagementScore(buildingTweets),
    impact: calculateImpactScore(profile),
    frequency: calculateFrequencyScore(buildingTweets.length, tweets.length),
  };
  
  // Calculate overall score
  const overallScore = Math.round(
    (scores.consistency * 0.25) + 
    (scores.transparency * 0.2) + 
    (scores.engagement * 0.2) + 
    (scores.impact * 0.15) + 
    (scores.frequency * 0.2)
  );
  
  // Determine category
  const category = determineCategory(overallScore);
  
  return {
    scores,
    overallScore,
    category,
    categoryInfo: BUILDER_CATEGORIES[category],
    buildingTweetCount: buildingTweets.length,
    totalTweetCount: tweets.length,
    buildingPercentage: (buildingTweets.length / (tweets.length || 1) * 100).toFixed(1)
  };
}

// Helper functions for score calculations
function calculateFrequencyScore(buildingCount, totalCount) {
  if (totalCount === 0) return 0;
  const percentage = (buildingCount / totalCount) * 100;
  
  if (percentage >= 40) return 100;
  if (percentage >= 30) return 80;
  if (percentage >= 20) return 60;
  if (percentage >= 10) return 40;
  return 20;
}

function calculateConsistencyScore(tweets) {
  if (tweets.length < 2) return 20;
  // This is a simplified implementation
  if (tweets.length >= 5) return 80;
  if (tweets.length >= 3) return 60;
  return 40;
}

function calculateTransparencyScore(tweets) {
  if (tweets.length === 0) return 0;
  // Simplified implementation based on content analysis
  return Math.min(70, tweets.length * 10);
}

function calculateEngagementScore(tweets) {
  if (tweets.length === 0) return 0;
  
  let totalEngagement = 0;
  tweets.forEach(tweet => {
    if (tweet.public_metrics) {
      const { reply_count = 0, like_count = 0, retweet_count = 0 } = tweet.public_metrics;
      totalEngagement += reply_count + like_count + retweet_count;
    }
  });
  
  const avgEngagement = totalEngagement / tweets.length;
  
  if (avgEngagement >= 20) return 100;
  if (avgEngagement >= 10) return 80;
  if (avgEngagement >= 5) return 60;
  if (avgEngagement >= 2) return 40;
  return 20;
}

function calculateImpactScore(profile) {
  const followerCount = profile.public_metrics?.followers_count || 0;
  
  if (followerCount >= 5000) return 100;
  if (followerCount >= 1000) return 80;
  if (followerCount >= 500) return 60;
  if (followerCount >= 100) return 40;
  return 20;
}

function determineCategory(overallScore) {
  if (overallScore >= 85) return 'BIP_CONQUEROR';
  if (overallScore >= 70) return 'INFLUENTIAL_BUILDER';
  if (overallScore >= 55) return 'ENGAGED_BUILDER';
  if (overallScore >= 40) return 'CONSISTENT_BUILDER';
  if (overallScore >= 25) return 'EMERGING_BUILDER';
  return 'STEALTH_BUILDER';
}

// Builder categories
export const BUILDER_CATEGORIES = {
  STEALTH_BUILDER: {
    name: 'Stealth Builder',
    description: 'You build quietly but consistently. Time to share more!'
  },
  EMERGING_BUILDER: {
    name: 'Emerging Builder',
    description: 'You\'re starting to build in public. Keep the momentum going!'
  },
  CONSISTENT_BUILDER: {
    name: 'Consistent Builder',
    description: 'You regularly share your building journey. You\'re on the right track!'
  },
  ENGAGED_BUILDER: {
    name: 'Engaged Builder',
    description: 'You build and engage actively with the community.'
  },
  INFLUENTIAL_BUILDER: {
    name: 'Influential Builder',
    description: 'Your building journey inspires others in the community.'
  },
  BIP_CONQUEROR: {
    name: 'Building in Public Conqueror',
    description: 'You\'re a master of building in public. Others look up to you!'
  }
};

// Generate personalized recommendations
export function generateRecommendations(scores) {
  // Get lowest two scores
  const sortedScores = Object.entries(scores).sort((a, b) => a[1] - b[1]);
  const recommendations = [];
  
  // Add recommendations based on lowest score
  if (sortedScores[0][0] === 'consistency') {
    recommendations.push(
      "Create a regular schedule for sharing your building updates",
      "Set reminders to post about your progress, even for small tasks"
    );
  } else if (sortedScores[0][0] === 'transparency') {
    recommendations.push(
      "Share specific metrics and numbers about your product",
      "Be open about challenges you've faced and how you overcame them"
    );
  } else if (sortedScores[0][0] === 'engagement') {
    recommendations.push(
      "Respond to comments on your building posts",
      "Ask specific questions to encourage more interaction"
    );
  } else if (sortedScores[0][0] === 'impact') {
    recommendations.push(
      "Include visuals in your building updates for higher engagement",
      "Craft stories around your building journey to make it more relatable"
    );
  } else if (sortedScores[0][0] === 'frequency') {
    recommendations.push(
      "Increase how often you share building updates",
      "Create bite-sized updates that are quick to share"
    );
  }
  
  // Add some general recommendations
  recommendations.push(
    "Share your building journey at least once a week for optimal visibility",
    "Engage with other builders to create a supportive community",
    "Celebrate your wins publicly to inspire others"
  );
  
  return recommendations.slice(0, 5); // Return top 5 recommendations
}

