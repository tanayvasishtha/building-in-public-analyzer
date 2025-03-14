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
