import { NextResponse } from 'next/server';
import { createTwitterClient, fetchUserProfile, fetchUserTweets } from '@/lib/twitter';

// Fetch user profile data
export async function fetchUserProfile(client, username) {
  try {
    const user = await client.v2.userByUsername(username, {
      'user.fields': 'description,profile_image_url,public_metrics',
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
      max_results: 10,
      'tweet.fields': 'created_at,public_metrics,text',
      exclude: 'retweets,replies',
    });

    return tweets.data.data || [];
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error;
  }
}

// Main API handler
export async function POST(request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Create Twitter client
    const client = createTwitterClient();
    const appOnlyClient = await client.appLogin(); // Authenticate with app-only token

    // Fetch user profile and tweets
    const profile = await fetchUserProfile(appOnlyClient, username);
    const tweets = await fetchUserTweets(appOnlyClient, profile.id);

    // Analyze building in public metrics (mock implementation for now)
    const analysis = {
      scores: { consistency: 70, transparency: 60, engagement: 50, impact: 40, frequency: 80 },
      overallScore: 60,
      category: 'ENGAGED_BUILDER',
      categoryInfo: { name: 'Engaged Builder', description: 'You build and engage actively with the community.' },
      buildingTweetCount: tweets.length,
      totalTweetCount: tweets.length,
      buildingPercentage: ((tweets.length / tweets.length) * 100).toFixed(1),
    };

    // Generate recommendations (mock implementation for now)
    const recommendations = [
      "Share your building journey at least once a week",
      "Include visuals in your building updates",
      "Talk about challenges you've overcome",
      "Ask for feedback on specific aspects",
      "Engage with other builders regularly",
    ];

    return NextResponse.json({ username, profile, analysis, recommendations });
  } catch (error) {
    console.error('Error analyzing Twitter profile:', error);
    return NextResponse.json({ error: error.message || 'Failed to analyze profile' }, { status: 500 });
  }
}
