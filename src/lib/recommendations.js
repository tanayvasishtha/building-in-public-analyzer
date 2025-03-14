export function generateRecommendations(scores) {
    const recommendations = [];
    
    // Add recommendations based on lowest scores
    const sortedScores = Object.entries(scores)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 2); // Get the two lowest scores
    
    sortedScores.forEach(([category, score]) => {
      const recs = getRecommendationsByCategory(category, score);
      recommendations.push(...recs);
    });
    
    // Add some general recommendations
    recommendations.push(
      "Share your building journey at least once a week for optimal visibility",
      "Ask specific questions to get more valuable feedback from your audience"
    );
    
    return recommendations.slice(0, 5); // Return top 5 recommendations
  }
  
  function getRecommendationsByCategory(category, score) {
    switch (category) {
      case 'consistency':
        return [
          "Create a regular schedule for sharing building updates",
          "Use a content calendar to plan your building-related posts",
          "Set reminders to share progress even on small tasks"
        ];
        
      case 'transparency':
        return [
          "Share specific metrics about your product or service",
          "Talk openly about challenges and how you overcame them",
          "Document your learnings, even from mistakes"
        ];
        
      case 'engagement':
        return [
          "Respond to all comments on your building posts",
          "Ask for specific feedback on what you're building",
          "Engage with other builders to create a supportive community"
        ];
        
      case 'impact':
        return [
          "Include visuals in your building updates for higher engagement",
          "Craft your building story to make it relatable and interesting",
          "Share milestone achievements to inspire others"
        ];
        
      case 'frequency':
        return [
          "Increase how often you share building updates",
          "Create bite-sized updates that are quick to share",
          "Set a minimum target of building-related posts per week"
        ];
        
      default:
        return [
          "Focus on sharing more about your building journey",
          "Be consistent with your building updates"
        ];
    }
  }
  