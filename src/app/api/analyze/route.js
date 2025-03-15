import { NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';

// Minimal Twitter API call to get profile picture
async function getProfilePicture(username) {
  try {
    // Check if API keys exist
    if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET) {
      return {
        username,
        name: username,
        profile_image_url: `https://unavatar.io/twitter/${username}`
      };
    }
    
    // Create Twitter client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
    });
    
    // Get app-only client for read-only operations
    const appOnlyClient = await client.appLogin();
    
    // Fetch just the user profile data
    const user = await appOnlyClient.v2.userByUsername(username, {
      'user.fields': 'profile_image_url,name'
    });
    
    if (!user.data) {
      throw new Error('User not found');
    }
    
    return {
      username: user.data.username || username,
      name: user.data.name || username,
      profile_image_url: user.data.profile_image_url
    };
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    // Fallback to a default profile image service
    return {
      username,
      name: username,
      profile_image_url: `https://unavatar.io/twitter/${username}`
    };
  }
}

// Calculate building score based on manual inputs
function calculateScore(twitterPosts, githubContributions) {
  return Math.round((twitterPosts * 0.4) + (githubContributions * 0.6));
}

// Calculate ratio for categorization
function calculateRatio(twitterPosts, githubContributions) {
  if (githubContributions === 0) return twitterPosts > 0 ? Infinity : 0;
  return twitterPosts / githubContributions;
}

// Determine builder category based on score
function determineCategory(score) {
  if (score >= 2000) return 'BIP_CONQUEROR';
  if (score >= 1000) return 'INFLUENTIAL_BUILDER';
  if (score >= 500) return 'ENGAGED_BUILDER';
  if (score >= 200) return 'CONSISTENT_BUILDER';
  if (score >= 50) return 'EMERGING_BUILDER';
  return 'STEALTH_BUILDER';
}

// Get builder categories information
function getBuilderCategories() {
  return {
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
}

// Determine builder type based on ratio
function determineBuilderType(ratio) {
  if (ratio > 3) return 'Community-focused builder';
  if (ratio < 0.5) return 'Code-focused builder';
  return 'Balanced builder';
}

// Generate recommendations based on scores
function generateRecommendations(twitterPosts, githubContributions, ratio) {
  const recommendations = [];
  
  // Add recommendations based on the ratio
  if (ratio > 3) {
    recommendations.push(
      "Consider contributing more to open source projects on GitHub",
      "Balance your social presence with more code contributions"
    );
  } else if (ratio < 0.5) {
    recommendations.push(
      "Share your GitHub work more frequently on Twitter",
      "Tell stories about your building process to engage your audience"
    );
  } else {
    recommendations.push(
      "Your balanced approach is working well - keep it up!",
      "Consider documenting your building process in greater detail"
    );
  }
  
  // Based on absolute numbers
  if (twitterPosts < 100) {
    recommendations.push("Increase your posting frequency to gain more visibility");
  }
  
  if (githubContributions < 100) {
    recommendations.push("Make more regular contributions to GitHub projects");
  }
  
  // Add some general recommendations
  recommendations.push(
    "Share your building journey at least once a week",
    "Include visuals in your building updates",
    "Talk about challenges you've overcome",
    "Engage with other builders regularly"
  );
  
  return recommendations.slice(0, 5); // Return top 5 recommendations
}

export async function POST(request) {
  try {
    const { username, twitterPosts, githubContributions } = await request.json();
    
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }
    
    // Calculate building score
    const overallScore = calculateScore(twitterPosts, githubContributions);
    
    // Calculate ratio for builder type
    const ratio = calculateRatio(twitterPosts, githubContributions);
    const builderType = determineBuilderType(ratio);
    
    // Determine builder category
    const category = determineCategory(overallScore);
    
    // Generate sub-scores for display
    const scores = {
      twitter: Math.min(100, (twitterPosts / 1000) * 100),
      github: Math.min(100, (githubContributions / 1000) * 100),
      consistency: Math.min(100, (twitterPosts / 500) * 100),
      transparency: Math.min(100, 50 + (githubContributions / 1000) * 50),
      engagement: Math.min(100, 60 + (twitterPosts / Math.max(1, githubContributions)) * 40),
    };
    
    // Create analysis object
    const analysis = {
      scores,
      overallScore,
      category,
      categoryInfo: getBuilderCategories()[category],
      twitterPosts,
      githubContributions,
      buildingRatio: ratio.toFixed(2),
      builderType
    };
    
    // Generate recommendations
    const recommendations = generateRecommendations(twitterPosts, githubContributions, ratio);
    
    // Get profile data from Twitter (minimal API call)
    const profile = await getProfilePicture(username);
    
    // Return complete analysis results
    return NextResponse.json({
      username,
      profile,
      analysis,
      recommendations
    });
    
  } catch (error) {
    console.error('Error analyzing profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}








// import { NextResponse } from 'next/server';
// import { 
//   createTwitterClient, 
//   fetchUserProfile, 
//   fetchUserTweets,
//   analyzeBuildingInPublic,
//   generateRecommendations
// } from '@/lib/twitter';

// // Main API handler
// export async function POST(request) {
//   try {
//     const { username } = await request.json();
    
//     if (!username) {
//       return NextResponse.json(
//         { error: 'Username is required' },
//         { status: 400 }
//       );
//     }
    
//     console.log(`Analyzing Twitter user: ${username}`);
    
//     // Create Twitter client with OAuth 2.0
//     const client = await createTwitterClient();
    
//     // Fetch user profile using the imported function
//     const profile = await fetchUserProfile(client, username);
//     console.log(`Fetched profile for ${username} (ID: ${profile.id})`);
    
//     // Fetch user tweets
//     const tweets = await fetchUserTweets(client, profile.id);
//     console.log(`Fetched ${tweets.length} tweets for analysis`);
    
//     // Analyze building in public metrics
//     const analysis = analyzeBuildingInPublic(tweets, profile);
    
//     // Generate recommendations based on the analysis
//     const recommendations = generateRecommendations(analysis.scores);
    
//     // Return the complete analysis results
//     return NextResponse.json({
//       username,
//       profile,
//       analysis,
//       recommendations
//     });
    
//   } catch (error) {
//     console.error('Error analyzing Twitter profile:', error);
    
//     return NextResponse.json(
//       { error: error.message || 'Failed to analyze profile' },
//       { status: 500 }
//     );
//   }
// }
