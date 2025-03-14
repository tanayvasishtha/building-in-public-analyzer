import { NextResponse } from 'next/server';
import { 
  createTwitterClient, 
  fetchUserProfile, 
  fetchUserTweets,
  analyzeBuildingInPublic,
  generateRecommendations
} from '@/lib/twitter';

// Main API handler
export async function POST(request) {
  try {
    const { username } = await request.json();
    
    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }
    
    console.log(`Analyzing Twitter user: ${username}`);
    
    // Create Twitter client with OAuth 2.0
    const client = await createTwitterClient();
    
    // Fetch user profile
    const profile = await fetchUserProfile(client, username);
    console.log(`Fetched profile for ${username} (ID: ${profile.id})`);
    
    // Fetch user tweets
    const tweets = await fetchUserTweets(client, profile.id);
    console.log(`Fetched ${tweets.length} tweets for analysis`);
    
    // Analyze building in public metrics
    const analysis = analyzeBuildingInPublic(tweets, profile);
    
    // Generate recommendations based on the analysis
    const recommendations = generateRecommendations(analysis.scores);
    
    // Return the complete analysis results
    return NextResponse.json({
      username,
      profile,
      analysis,
      recommendations
    });
    
  } catch (error) {
    console.error('Error analyzing Twitter profile:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to analyze profile' },
      { status: 500 }
    );
  }
}
