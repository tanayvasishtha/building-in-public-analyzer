import { TwitterApi } from 'twitter-api-v2';

// Create a Twitter API client
export function createTwitterClient() {
  try {
    return new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });
  } catch (error) {
    console.error('Error creating Twitter client:', error);
    throw new Error('Failed to initialize Twitter API client');
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
    // Limited to 10 tweets to conserve API usage
    const tweets = await client.v2.userTimeline(userId, {
      max_results: 10,
      'tweet.fields': 'created_at,public_metrics,text',
      exclude: 'retweets,replies'
    });
    
    return tweets.data.data || [];
  } catch (error) {
    console.error('Error fetching user tweets:', error);
    throw error;
  }
}
