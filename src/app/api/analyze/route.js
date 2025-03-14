import { NextResponse } from 'next/server';

// Mock implementation to ensure API works
export async function POST(request) {
  try {
    // Parse the request
    const body = await request.json();
    const { username } = body;
    
    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }
    
    // Return mock data
    return NextResponse.json({
      username,
      profile: { 
        name: username, 
        username: username,
        profile_image_url: "https://via.placeholder.com/150" 
      },
      analysis: {
        scores: { 
          consistency: 70, 
          transparency: 60, 
          engagement: 50, 
          impact: 40, 
          frequency: 80 
        },
        overallScore: 60,
        category: 'ENGAGED_BUILDER',
        categoryInfo: {
          name: 'Engaged Builder',
          description: 'You build and engage actively with the community.'
        },
        buildingTweetCount: 8,
        totalTweetCount: 20,
        buildingPercentage: "40.0"
      },
      recommendations: [
        "Share your building journey at least once a week",
        "Include visuals in your building updates",
        "Talk about challenges you've overcome",
        "Ask for feedback on specific aspects",
        "Engage with other builders regularly"
      ]
    });
    
  } catch (error) {
    console.error('Error analyzing profile:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to analyze profile' },
      { status: 500 }
    );
  }
}
