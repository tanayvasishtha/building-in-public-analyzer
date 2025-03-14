import { TwitterApi } from 'twitter-api-v2';

export function createTwitterClient() {
  try {
    return new TwitterApi({
      clientId: process.env.CLIENT_ID, // Use Client ID from environment variables
      clientSecret: process.env.CLIENT_SECRET, // Use Client Secret from environment variables
    });
  } catch (error) {
    console.error('Error creating Twitter client:', error);
    throw new Error('Failed to initialize Twitter API client');
  }
}
